FROM node:18

WORKDIR /app

# Chỉ copy file package trước để tận dụng cache
COPY package*.json ./

# Cài lại npm modules trong môi trường Linux
RUN npm install && npm cache clean --force

# Copy phần code còn lại
COPY . .

EXPOSE 3030

# Đợi DB và AI sẵn sàng rồi mới chạy
CMD ["sh", "-c", "sleep 30 && npm start"]
