# Скрипт для сборки и деплоя
# Использование: .\build-and-deploy.ps1

Write-Host "Starting build and deploy process..." -ForegroundColor Green

# Переключаемся на ветку main
Write-Host "Switching to main branch..." -ForegroundColor Yellow
git checkout main

# Устанавливаем зависимости
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

# Собираем проект
Write-Host "Building project..." -ForegroundColor Yellow
npm run build

# Переключаемся на ветку build
Write-Host "Switching to build branch..." -ForegroundColor Yellow
git checkout build

# Удаляем старые файлы сборки
Write-Host "Cleaning old build files..." -ForegroundColor Yellow
if (Test-Path "assets") { Remove-Item -Recurse -Force "assets" }
if (Test-Path "index.html") { Remove-Item "index.html" }
if (Test-Path "delete-icon.svg") { Remove-Item "delete-icon.svg" }
if (Test-Path "vite.svg") { Remove-Item "vite.svg" }

# Копируем новые файлы сборки
Write-Host "Copying new build files..." -ForegroundColor Yellow
Copy-Item "dist\*" . -Recurse

# Добавляем файлы в git
Write-Host "Adding files to git..." -ForegroundColor Yellow
git add .

# Коммитим изменения
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Update build files - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

# Пушим изменения
Write-Host "Pushing to remote..." -ForegroundColor Yellow
git push origin build

Write-Host "Build and deploy completed successfully!" -ForegroundColor Green
Write-Host "You can now deploy from the build branch." -ForegroundColor Cyan
