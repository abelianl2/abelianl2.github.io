# 使用官方的 Nginx 镜像作为基础镜像
FROM nginx:alpine

# 复制自定义的 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建后的前端文件到 Nginx 的默认文件夹
COPY dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
