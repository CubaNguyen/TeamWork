import numpy as np
import requests
from io import BytesIO
from PIL import Image
import tensorflow as tf

from db_connect import load_products_from_db

IMG_SIZE = (224, 224)

# Load base model
base_model = tf.keras.applications.MobileNetV2(
    input_shape=IMG_SIZE + (3,), include_top=False, weights="imagenet"
)
feature_extractor = tf.keras.Sequential([
    base_model,
    tf.keras.layers.GlobalAveragePooling2D()
])

def get_embedding(img_array):
    return feature_extractor.predict(img_array, verbose=0)[0]

def build_dataset_embeddings(products):
    db_embeddings, db_ids, db_items = [], [], []
    headers = {"User-Agent": "Mozilla/5.0"}

    for p in products:
        try:
            response = requests.get(p["image"], headers=headers, timeout=10)
            response.raise_for_status()
            img = Image.open(BytesIO(response.content)).convert("RGB")
            img = img.resize(IMG_SIZE)
            arr = np.expand_dims(np.array(img) / 255.0, axis=0)

            emb = get_embedding(arr)

            db_embeddings.append(emb)
            db_ids.append(p["id"])
            db_items.append(p)
        except Exception as e:
            print(f"❌ Lỗi với sản phẩm {p['id']} ({p['name']}):", e)

    return np.array(db_embeddings), np.array(db_ids), np.array(db_items)

if __name__ == "__main__":
    products = load_products_from_db()
    print("Tổng số sản phẩm:", len(products))

    embeddings, ids, items = build_dataset_embeddings(products)
    print("Embedding shape:", embeddings.shape)
    print("Sản phẩm lưu:", len(items))

    np.save("product_embeddings.npy", embeddings)
    np.save("product_ids.npy", ids)
    np.save("product_items.npy", items)
    print("✅ Đã lưu embeddings, ids, items")
