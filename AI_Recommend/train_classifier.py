import tensorflow as tf
import numpy as np
from sklearn.model_selection import train_test_split
from PIL import Image
from io import BytesIO
import requests

from db_connect import load_products_from_db

IMG_SIZE = (224,224)

# Hàm load ảnh từ DB
def load_images_from_products(products):
    X, y = [], []
    headers = {"User-Agent": "Mozilla/5.0"}
    for p in products:
        try:
            response = requests.get(p["image"], headers=headers, timeout=10)
            response.raise_for_status()
            img = Image.open(BytesIO(response.content)).convert("RGB")
            img = img.resize(IMG_SIZE)
            X.append(np.array(img)/255.0)
            y.append(p["category"])  # "ring","bracelet","necklace","earring"
        except Exception as e:
            print(f"❌ Lỗi load ảnh {p['id']}: {e}")
    return np.array(X), np.array(y)

if __name__ == "__main__":
    # 1. Load data
    products = load_products_from_db()
    X, y_text = load_images_from_products(products)

    # Encode label
    class_names = ["ring","bracelet","necklace","earring"]
    label2id = {c:i for i,c in enumerate(class_names)}
    y = np.array([label2id[label] for label in y_text])

    # Train/val split
    X_train, X_val, y_train, y_val = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # 2. Build classifier
    base_model = tf.keras.applications.MobileNetV2(
        input_shape=(224,224,3),
        include_top=False,
        weights="imagenet"
    )
    base_model.trainable = False

    model = tf.keras.Sequential([
        base_model,
        tf.keras.layers.GlobalAveragePooling2D(),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(4, activation="softmax")  # 4 classes
    ])

    model.compile(optimizer="adam",
                  loss="sparse_categorical_crossentropy",
                  metrics=["accuracy"])

    # 3. Train
    history = model.fit(
        X_train, y_train,
        validation_data=(X_val,y_val),
        epochs=10,
        batch_size=16
    )

    # 4. Save model
    model.save("classifier.h5")
    print("✅ Saved classifier to classifier.h5")
