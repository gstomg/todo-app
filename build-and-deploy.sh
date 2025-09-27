#!/bin/bash

# Скрипт для сборки и деплоя
# Использование: ./build-and-deploy.sh

echo "Starting build and deploy process..."

# Переключаемся на ветку main
echo "Switching to main branch..."
git checkout main

# Устанавливаем зависимости
echo "Installing dependencies..."
npm install

# Собираем проект
echo "Building project..."
npm run build

# Переключаемся на ветку build
echo "Switching to build branch..."
git checkout build

# Удаляем старые файлы сборки
echo "Cleaning old build files..."
rm -rf assets index.html delete-icon.svg vite.svg

# Копируем новые файлы сборки
echo "Copying new build files..."
cp -r dist/* .

# Добавляем файлы в git
echo "Adding files to git..."
git add .

# Коммитим изменения
echo "Committing changes..."
git commit -m "Update build files - $(date '+%Y-%m-%d %H:%M:%S')"

# Пушим изменения
echo "Pushing to remote..."
git push origin build

echo "Build and deploy completed successfully!"
echo "You can now deploy from the build branch."
