FROM node:18-alpine
WORKDIR /my-app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
#RUN npm run build
RUN npm start

# FROM nginx:1.22.1-alpine
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from-builder /app/build .
# ENTRYPOINT ["nginx", "-g", "daemon off;"]