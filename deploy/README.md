# Деплой AK Systems на VPS

План рассчитан на **Ubuntu 22.04 / 24.04** на любом VPS (Timeweb, Selectel, Beget, REG.ru, Yandex Cloud, Hetzner).
На том же сервере стоит **Next.js-сайт** и **Telegram-бот** (@aksystems_sales_bot) — разными процессами под одним pm2.

---

## 0. До подключения к серверу

1. **DNS.** У регистратора домена `aksystems.pro` добавьте A-запись:
   - `@` → IP сервера
   - `www` → IP сервера (или CNAME → `@`)

   Проверка (через 5–30 минут): `dig aksystems.pro +short` должен вернуть IP сервера.

2. **Репо.** Запушьте проект в GitHub/GitLab. Настройте SSH-ключ между сервером и git-хостингом, либо деплой через HTTPS с PAT.

3. **Бот.** В [@BotFather](https://t.me/BotFather):
   - Если бот уже создан — возьмите токен (`/token`).
   - Если нет — `/newbot` → `aksystems_sales_bot` → сохраните токен.
   - `/setcommands` — команды бота.
   - Создайте **админ-чат** (группа из вас + бот) — нужен для уведомлений о лидах.
   - Узнайте `chat_id` админ-чата: добавьте бота `@username_to_id_bot` или временно в коде — `console.log` обновлений.

4. **Битрикс24 — входящий вебхук для приёма лидов.**
   - В портале: CRM → Настройки → Разработчикам → Другое → Входящий вебхук.
   - Права: `crm` (минимум).
   - Скопировать URL вида `https://<portal>.bitrix24.ru/rest/<userId>/<token>/`.
   - Сохранить в `BITRIX_WEBHOOK_URL`.
   - Опционально: узнать ID ответственного сотрудника (`/rest/<portal>/<token>/user.current.json` → поле ID) и положить в `BITRIX_ASSIGNED_BY_ID`.

---

## 1. Первая настройка сервера (один раз)

Подключение по SSH:
```bash
ssh root@<IP>
```

Создать deploy-пользователя (не деплоим под root):
```bash
adduser deploy
usermod -aG sudo deploy
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy
su - deploy
```

Базовые пакеты:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y build-essential git curl ca-certificates ufw nginx certbot python3-certbot-nginx
```

Node.js 20 + pnpm:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pnpm pm2
```

Фаервол:
```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
```

Pm2 в автозагрузку:
```bash
pm2 startup systemd -u deploy --hp /home/deploy
# выполнить команду, которую выплюнет pm2
pm2 save
```

---

## 2. Клонирование репо

```bash
sudo mkdir -p /var/www/aksystems
sudo chown -R deploy:deploy /var/www/aksystems
cd /var/www
git clone git@github.com:<you>/ak-systems.git aksystems/web
# ↑ либо https://github.com/...  если без SSH

# место для бота
git clone git@github.com:<you>/aksystems-bot.git aksystems/bot
```

Структура:
```
/var/www/aksystems/
├── web/          ← Next.js
└── bot/          ← Telegram-бот
```

---

## 3. Переменные окружения

Создать `/var/www/aksystems/web/.env.local`:
```bash
cd /var/www/aksystems/web
cp .env.example .env.local
nano .env.local
```

Содержимое (см. `.env.example` в корне репо):
```
# Битрикс24 — входящий вебхук для приёма лидов
BITRIX_WEBHOOK_URL=https://<portal>.bitrix24.ru/rest/<userId>/<token>/
BITRIX_ASSIGNED_BY_ID=1

# Telegram — уведомления в админ-чат (тот же токен, что использует бот-ассистент)
TELEGRAM_BOT_TOKEN=1234567890:AAAA-bbbbbbbb
TELEGRAM_CHAT_ID=-1001234567890

# Яндекс.Метрика
NEXT_PUBLIC_YM_ID=12345678
```

Для бота — своё `/var/www/aksystems/bot/.env` с тем же `TELEGRAM_BOT_TOKEN` и его логикой. Бот **ассистент квалифицирует клиента** (задаёт вопросы → создаёт лид в Битрикс24 через тот же webhook или через собственный REST-доступ → передаёт диалог оператору через «Открытые линии»).

---

## 4. Сборка Next.js

```bash
cd /var/www/aksystems/web
pnpm install --frozen-lockfile
pnpm run build
```

Если pnpm-lock нет — замените на `npm ci && npm run build`.

---

## 5. Pm2 — запуск сайта и бота

Конфиг уже лежит в репо: `deploy/ecosystem.config.js`. Скопируйте его в корень проекта либо запустите прямо из `deploy/`:

```bash
cd /var/www/aksystems
pm2 start web/deploy/ecosystem.config.js
pm2 save
pm2 status
```

Логи:
```bash
pm2 logs aksystems-web
pm2 logs aksystems-bot
```

---

## 6. Nginx + SSL

Шаблон лежит в `deploy/nginx.conf`. Положите как site-config:

```bash
sudo cp /var/www/aksystems/web/deploy/nginx.conf /etc/nginx/sites-available/aksystems.pro
sudo ln -s /etc/nginx/sites-available/aksystems.pro /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

Проверьте `http://aksystems.pro` — должен отдаваться сайт (без HTTPS пока).

Выпуск SSL:
```bash
sudo certbot --nginx -d aksystems.pro -d www.aksystems.pro
```

Certbot сам допишет 443-блок и редирект. Авторенью — systemd-таймер `certbot.timer`, уже включён.

---

## 7. Проверка после деплоя

- `https://aksystems.pro` — открывается
- `https://aksystems.pro/sitemap.xml` — 23 URL
- `https://aksystems.pro/robots.txt` — указывает на новый sitemap
- `https://aksystems.pro/opengraph-image` — PNG 1200×630
- Форма в блоке Контакты — заявка доходит до Telegram-админчата и в почту

Проверить структурированные данные:
- [search.google.com/test/rich-results](https://search.google.com/test/rich-results) — вставьте URL главной
- [validator.schema.org](https://validator.schema.org)

---

## 8. Обновление проекта

Ручная выкатка:
```bash
cd /var/www/aksystems/web
./deploy/deploy.sh
```

Скрипт делает `git pull → pnpm install → pnpm build → pm2 reload aksystems-web`.

---

## 9. CI/CD через GitHub Actions (опционально)

Положите `deploy/github-workflow-deploy.yml` в `.github/workflows/deploy.yml`.
Нужны секреты репо:
- `SSH_HOST` — IP сервера
- `SSH_USER` — `deploy`
- `SSH_KEY` — приватный ключ (сгенерируйте пару специально для CI)

На пуш в `main` — GitHub сам пойдёт по SSH и выполнит `deploy.sh`.

---

## Коллизии между сайтом и ботом

Сайт и бот **делят один BOT_TOKEN**, но не конфликтуют:
- **Бот** получает обновления от пользователей (long-poll или webhook).
- **Сайт** только вызывает `sendMessage` — stateless, не конкурирует с polling.

Если бот использует webhook — Telegram шлёт обновления на его публичный URL.
Если long-poll — бот сам дёргает `getUpdates`.
В обоих случаях `sendMessage` из сайта работает независимо.

**Важно:** если бот на long-poll — не запускайте вторую его копию, будет ошибка `409 Conflict`.

---

## Диагностика

| Симптом | Где смотреть |
|---|---|
| 502 Bad Gateway | `pm2 logs aksystems-web`, `pm2 status` |
| Форма не доходит | `pm2 logs aksystems-web` — ищите тело запроса и код ответа Telegram API |
| Бот не отвечает | `pm2 logs aksystems-bot` |
| SSL не выпустился | `sudo certbot --nginx --dry-run` + проверьте A-запись DNS |
| Низкая Lighthouse | Проверьте, что nginx отдаёт gzip/brotli (в шаблоне включено) |

---

## Что сделать до первой публикации в поиск

1. Зарегистрировать в [Яндекс.Вебмастере](https://webmaster.yandex.ru) и [Google Search Console](https://search.google.com/search-console), добавить коды верификации в `metadata.other` в `src/app/layout.tsx`.
2. Отправить `sitemap.xml` в оба вебмастера.
3. Запросить индексацию главной.
4. Создать профили в Яндекс.Бизнес, 2ГИС, каталоге 1c-bitrix.ru (партнёры).
