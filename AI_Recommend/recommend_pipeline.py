import numpy as np
from PIL import Image
from io import BytesIO
import requests
import tensorflow as tf
from sklearn.metrics.pairwise import cosine_similarity

IMG_SIZE = (224,224)

# Load classifier (model đã train)
classifier = tf.keras.models.load_model("classifier.h5", compile=False)

# Load feature extractor
base_model = tf.keras.applications.MobileNetV2(
    input_shape=IMG_SIZE + (3,), include_top=False, weights="imagenet"
)
feature_extractor = tf.keras.Sequential([
    base_model,
    tf.keras.layers.GlobalAveragePooling2D()
])

def get_embedding(img_array):
    return feature_extractor.predict(img_array, verbose=0)[0]

def predict_category(img_array, class_names=["ring","bracelet","necklace","earring"]):
    preds = classifier.predict(img_array, verbose=0)
    confidence = np.max(preds)
    category = class_names[np.argmax(preds)]
    return category, confidence

def recommend_from_url(url, embeddings, ids, items):
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers, timeout=10)
    response.raise_for_status()
    img = Image.open(BytesIO(response.content)).convert("RGB")
    img = img.resize(IMG_SIZE)
    arr = np.expand_dims(np.array(img) / 255.0, axis=0)

    # B1: Classify
    predicted_class, conf = predict_category(arr)
    if conf < 0.6:
            return {"predicted_class": "unknown", "confidence": float(conf), "recommended": []}

    # B2: Embedding query
    query_emb = get_embedding(arr)

    # B3: Similarity trong cùng category
    mask = np.array([item["category"] == predicted_class for item in items])
    sims = cosine_similarity([query_emb], embeddings[mask])[0]

    idxs = sims.argsort()[::-1]
    recommended_ids = ids[mask][idxs]
    scores = sims[idxs]

    results = []
    for pid, score in zip(recommended_ids, scores):
        prod = next((p for p in items if p["id"] == int(pid)), None)
        if prod:
            results.append({
                "id": int(pid),
                "name": prod["name"],
                "price": float(prod["price"]),
                "image": prod["image"],
                "score": float(score)
            })

    return {
        "predicted_class": predicted_class,
        "confidence": float(conf),
        "recommended": results
    }

if __name__ == "__main__":
    # Load embeddings + items
    embeddings = np.load("product_embeddings.npy", allow_pickle=True)
    ids = np.load("product_ids.npy", allow_pickle=True)
    items = np.load("product_items.npy", allow_pickle=True)

    test_url = "https://helios.vn/cdn/shop/files/cala-chrysaber-helios-black-silver_1_1080x.jpg?v=1745915071"
    result = recommend_from_url(test_url, embeddings, ids, items)
    print("Kết quả recommend:")
    print(result)
