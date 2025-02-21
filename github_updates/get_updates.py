import json
import requests
import time
from datetime import datetime

# Чтение конфигурации из файла config.json
def load_config():
    with open('config.json') as f:
        return json.load(f)

config = load_config()

# Заменяем на данные из конфигурационного файла
TELEGRAM_TOKEN = config['telegram_token']
CHAT_ID = config['chat_id']
OWNER = config['owner']
REPO = config['repo']

# Сохраняем ID последнего релиза
last_release_id = None

# Функция для отправки сообщения в Telegram
def send_telegram_message(message):
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    payload = {
        'chat_id': CHAT_ID,
        'text': message,
        'parse_mode': 'HTML'  # Используем HTML, чтобы избежать курсивного форматирования
    }
    requests.post(url, data=payload)

# Функция для получения последнего релиза с GitHub
def get_latest_release():
    url = f"https://api.github.com/repos/{OWNER}/{REPO}/releases/latest"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return None

# Функция для логирования с эмоджи и временем
def log_message(message, found=True):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    emoji = "✅" if found else "❌"
    print(f"[{timestamp}] {emoji} {message}")

# Основной цикл
while True:
    release = get_latest_release()

    if release:
        release_id = release['id']
        release_name = release['name']
        release_url = release['html_url']

        # Проверяем, есть ли новый релиз
        if release_id != last_release_id:
            last_release_id = release_id

            # Формируем сообщение для Telegram
            message = f"""
🚀 Новый релиз на GitHub!

📦 Название: {release_name}
🔗 Ссылка на релиз: <a href="{release_url}">Перейти к релизу</a>

🎉 Обновление доступно для скачивания!
            """

            # Отправка сообщения в Telegram
            send_telegram_message(message)

            # Логирование в консоль
            log_message(f"Новый релиз найден: {release_name}\nСсылка: {release_url}", found=True)
        else:
            log_message("Обновлений не найдено", found=False)
    else:
        log_message("Ошибка при получении данных с GitHub", found=False)

    # Проверка каждые 5 минут
    time.sleep(300)

