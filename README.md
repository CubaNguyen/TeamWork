# 💍 Jewelry – AI-Powered Product Recommendation System

> Hệ thống web bán trang sức **Helios** được mở rộng với **AI nhận diện và gợi ý sản phẩm tương tự**.  
> Chạy hoàn toàn bằng **Docker Compose**, chỉ cần **1 lệnh duy nhất** là hoạt động.

---

## 🧱 1️⃣ Gồm có 4 phần chính

| Tên                     | Chức năng                                                         |
| ----------------------- | ----------------------------------------------------------------- |
| 💻 **Client**           | Giao diện website ReactJS để người dùng xem và chọn sản phẩm      |
| ⚙️ **API**              | Server NodeJS nhận request từ web, kết nối AI và Database         |
| 🧠 **AI Service**       | FastAPI + TensorFlow, nhận ảnh gửi lên và gợi ý sản phẩm tương tự |
| 🗄️ **Database (MSSQL)** | Lưu toàn bộ dữ liệu sản phẩm và danh mục của Helios               |

---

## ⚙️ 2️⃣ Chuẩn bị máy tính

Yêu cầu:

- Cài **Docker Desktop** (bắt buộc)
- RAM **tối thiểu 8GB** (vì AI dùng TensorFlow)
- Các cổng **chưa bị chiếm**:
  - 3000 (Client)
  - 3030 (API)
  - 8000 (AI)
  - 1433 (Database MSSQL)

---

## 🚀 3️⃣ Cách chạy hệ thống

**Bước 1:** Mở terminal trong thư mục gốc (nơi có `docker-compose.yml`)  
**Bước 2:** Chạy lệnh:

```bash
docker-compose up -d --build


cổng chính http://localhost:3000/
```
