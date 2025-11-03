import os
import requests
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models
from sklearn.model_selection import train_test_split
from io import BytesIO
from PIL import Image

# Import dataset URL
from data.ring import urls as ring_urls
from data.necklace import urls as necklace_urls
from data.bracelet import urls as bracelet_urls
from data.earring import urls as earring_urls

dataset = {
    "ring": ring_urls,
    "necklace": necklace_urls,
    "bracelet": bracelet_urls,
    "earring": earring_urls,
}

IMG_SIZE = (224, 224)

# =========================
# 1. Load images from URLs -> X, y
# =========================
def load_images_from_urls(dataset):
    X, y = [], []
    headers = {"User-Agent": "Mozilla/5.0"}  # thêm User-Agent để giả lập trình duyệt
    for label, urls in dataset.items():
        for url in urls:
            try:
                response = requests.get(url, headers=headers, timeout=10)
                response.raise_for_status()  # báo lỗi nếu status_code != 200
                img = Image.open(BytesIO(response.content)).convert("RGB")
                img = img.resize(IMG_SIZE)
                X.append(np.array(img) / 255.0)
                y.append(label)
            except Exception as e:
                print("❌ Lỗi tải ảnh:", e, "URL:", url)
    return np.array(X), np.array(y)

X, y = load_images_from_urls(dataset)

# Encode labels
class_names = list(dataset.keys())
label2id = {name: i for i, name in enumerate(class_names)}
y_encoded = np.array([label2id[label] for label in y])

# Train / val split
X_train, X_val, y_train, y_val = train_test_split(X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded)

# =========================
# 2. Build model (Transfer Learning MobileNetV2)
# =========================
base_model = tf.keras.applications.MobileNetV2(input_shape=IMG_SIZE + (3,),
                                               include_top=False,
                                               weights='imagenet')
base_model.trainable = False

model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dropout(0.2),
    layers.Dense(len(class_names), activation="softmax")
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# =========================
# 3. Train model
# =========================
history = model.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=5, batch_size=16)



# =========================
# 4b. Build thêm embeddings cho dataset
# =========================
feature_extractor = tf.keras.Sequential([
    base_model,
    layers.GlobalAveragePooling2D()
])

def get_embedding(img_array):
    return feature_extractor.predict(img_array, verbose=0)[0]

def build_dataset_embeddings(dataset):
    db_embeddings, db_labels, db_urls = [], [], []
    headers = {"User-Agent": "Mozilla/5.0"}
    for label, urls in dataset.items():
        for url in urls:
            try:
                response = requests.get(url, headers=headers, timeout=10)
                response.raise_for_status()
                img = Image.open(BytesIO(response.content)).convert("RGB")
                img = img.resize(IMG_SIZE)
                arr = np.expand_dims(np.array(img) / 255.0, axis=0)
                emb = get_embedding(arr)

                db_embeddings.append(emb)
                db_labels.append(label)
                db_urls.append(url)
            except:
                continue
    return np.array(db_embeddings), np.array(db_labels), np.array(db_urls)

print("Đang tạo embedding dataset...")
db_embeddings, db_labels, db_urls = build_dataset_embeddings(dataset)


from sklearn.metrics.pairwise import cosine_similarity

def predict_and_recommend(url, top_k=5, threshold=0.6):
    try:
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        img = Image.open(BytesIO(response.content)).convert("RGB")
        img = img.resize(IMG_SIZE)
        arr = np.expand_dims(np.array(img) / 255.0, axis=0)

        # Predict category
        predictions = model.predict(arr, verbose=0)
        confidence = np.max(predictions)
        predicted_class = class_names[np.argmax(predictions)]

        # Embedding query
        query_emb = get_embedding(arr)

        # Similarity trong cùng category
        mask = (db_labels == predicted_class)
        sims = cosine_similarity([query_emb], db_embeddings[mask])[0]
        idxs = sims.argsort()[::-1][:top_k]
        similar_urls = db_urls[mask][idxs]

        return {
            "predicted_class": predicted_class ,
            "confidence": float(confidence),
            "recommended": similar_urls.tolist()
        }
    except Exception as e:
        print("❌ Error:", e)
        return None



# # =========================
# # 4. Predict from URL
# # =========================
# def predict_from_url(url, threshold=0.7):
#     try:
#         response = requests.get(url, timeout=10)
#         img = Image.open(BytesIO(response.content)).convert("RGB")
#         img = img.resize(IMG_SIZE)
#         img_array = np.expand_dims(np.array(img) / 255.0, axis=0)

#         predictions = model.predict(img_array)
#         confidence = np.max(predictions)
#         predicted_class = class_names[np.argmax(predictions)]

#         if confidence >= threshold:
#             return dataset[predicted_class]
#         else:
#             return None
#     except Exception as e:
#         print("Error loading image:", e)
#         return None

# =========================
# 5. Test thử
# =========================

# test_url = "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
# print("Output:", predict_from_url(test_url))

test_url =        "https://helios.vn/cdn/shop/files/khao-yai-sunflower-helios-black-silver_1_745826f9-62e7-4d7c-a154-2a61100cad63_1080x.jpg?v=1754845304"

print("Kết quả:", predict_and_recommend(test_url, top_k=5))

