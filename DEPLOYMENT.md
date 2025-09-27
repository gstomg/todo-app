# Инструкция по развертыванию

## Структура веток

- **main** - содержит исходный код приложения
- **build** - содержит собранные файлы для развертывания

## Автоматическая сборка и деплой

### Windows (PowerShell)
```powershell
.\build-and-deploy.ps1
```

### Linux/Mac (Bash)
```bash
chmod +x build-and-deploy.sh
./build-and-deploy.sh
```

## Ручная сборка

1. Переключитесь на ветку main:
   ```bash
   git checkout main
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Соберите проект:
   ```bash
   npm run build
   ```

4. Переключитесь на ветку build:
   ```bash
   git checkout build
   ```

5. Скопируйте собранные файлы:
   ```bash
   # Windows
   copy dist\* .
   
   # Linux/Mac
   cp -r dist/* .
   ```

6. Зафиксируйте изменения:
   ```bash
   git add .
   git commit -m "Update build files"
   git push origin build
   ```

## Развертывание

Для развертывания используйте файлы из ветки **build**:
- `index.html` - главная страница
- `assets/` - папка со стилями и скриптами
- `*.svg` - иконки

## Важные замечания

- Никогда не коммитьте собранные файлы в ветку main
- Всегда используйте скрипты для обновления ветки build
- Проверяйте .gitignore перед коммитом в main
