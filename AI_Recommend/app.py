from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from sklearn.metrics.pairwise import cosine_similarity

# Load các file .npy và model classifier
embeddings = np.load("product_embeddings.npy", allow_pickle=True)
ids = np.load("product_ids.npy", allow_pickle=True)
items = np.load("product_items.npy", allow_pickle=True)

classifier = tf.keras.models.load_model("classifier.h5", compile=False)

IMG_SIZE = (224, 224)
base_model = tf.keras.applications.MobileNetV2(
    input_shape=IMG_SIZE + (3,), include_top=False, weights="imagenet"
)
feature_extractor = tf.keras.Sequential([base_model, tf.keras.layers.GlobalAveragePooling2D()])

def get_embedding(img_array):
    return feature_extractor.predict(img_array, verbose=0)[0]

def predict_category(img_array, class_names=["ring","bracelet","necklace","earring"]):
    preds = classifier.predict(img_array, verbose=0)
    return class_names[np.argmax(preds)], float(np.max(preds))

app = FastAPI()

@app.post("/ai/recommend")
async def recommend_api(file: UploadFile = File(...)):
    try:
        img_bytes = await file.read()
        img = Image.open(BytesIO(img_bytes)).convert("RGB")
        img = img.resize(IMG_SIZE)
        arr = np.expand_dims(np.array(img) / 255.0, axis=0)

         # B1: Classify
        predicted_class, confidence = predict_category(arr)
        if confidence < 0.65:
            return JSONResponse(content={
                "predicted_class": "unknown",
                "confidence": confidence,
                "recommended": []
            })

        # B2: Embedding query
        query_emb = get_embedding(arr)

        # B3: Similarity trong cùng category
        mask = np.array([item["category"] == predicted_class for item in items])
        sims = cosine_similarity([query_emb], embeddings[mask])[0]
        idxs = sims.argsort()[::-1]

        if sims.max() < 0.55:   # ví dụ đặt ngưỡng 60%
            return JSONResponse(content={
                "predicted_class": predicted_class,
                "confidence": confidence,
                "recommended_ids": []
            })


        # recommended_ids = ids[mask][idxs].tolist()
        recommended_ids  = []
        for i in idxs:
            if sims[i] < 0.55:
                continue
            pid = ids[mask][i]
            try:
                pid_int = int(pid)   # ép chắc chắn sang int
                recommended_ids.append(pid_int)
            except Exception:
                continue  # nếu không ép được int thì bỏ qua

        return JSONResponse(content={
            "predicted_class": predicted_class,
            "confidence": confidence,
            "recommended_ids": recommended_ids 
        })
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
