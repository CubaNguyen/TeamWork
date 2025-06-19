FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3030
CMD ["sh", "-c", "sleep 20 && npm start"]
