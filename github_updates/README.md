## Подготовка:
- Открываем @BotFather, создаем нового бота, копируем его telegram_token
- Далее пишем в личку в бота. /start и какое нибудь сообщение
- Из терминала или дергаем в браузере:
https://api.telegram.org/bot<telegram_token>/getUpdates
- Из поля chat: {id: <YOUT_CHAT_ID>} копируем YOUT_CHAT_ID
- Находим интересующую нас репу, например https://github.com/nexus-xyz/network-api
nexus-xyz – owner
network-api – repo

## Создание конфига
Делаем конфигурацию config.json
```
touch config.json
nano config.json
```
Вставляем конфигурацию
```JSON
{
  "telegram_token": "API tocken",
  "chat_id": "11111111111",
  "owner": "nexus-xyz",
  "repo": "network-api"
}
```

## Запуск скрипта
Создаем скрипт python из tmux (screen), чтобы удобно логи читать
```shell
tmux new -s git_updates
```
```
touch get_updates.py
nano get_updates.py
```
Вставляем туда содержимое файла 
get_updates.py
```
python3 ./get_updates.py
```
Выходим из tmux (screen)
Ctrl + B, затем D

Можно переделать на список репозиториев, но пока лень. Или вообще cli набросать, чтобы не редачить через nano. Посмотрим, если будет актуально
