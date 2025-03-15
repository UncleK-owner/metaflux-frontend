#!/bin/bash

# dist 폴더 경로
DIST_DIR="./dist"

# 대상 디렉토리 경로
TARGET_DIR="/var/www/html/app"

# Nginx 사용자 및 그룹
NGINX_USER="www-data"
NGINX_GROUP="www-data"

# 대상 디렉토리 생성 (존재하지 않는 경우)
sudo mkdir -p "$TARGET_DIR"

# dist 폴더 내용 복사
sudo cp -r "$DIST_DIR/." "$TARGET_DIR"

# 권한 변경
sudo chown -R "$NGINX_USER:$NGINX_GROUP" "$TARGET_DIR"
sudo chmod -R 755 "$TARGET_DIR"

echo "dist 폴더를 $TARGET_DIR 로 이동하고, 권한 및 파일 소유자를 변경했습니다."