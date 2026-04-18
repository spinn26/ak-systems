#!/usr/bin/env bash
# Ручная выкатка сайта: git pull, сборка, reload без простоя.
# Использование (на сервере, под пользователем deploy):
#   cd /var/www/aksystems/web && ./deploy/deploy.sh

set -euo pipefail

APP_NAME="aksystems-web"
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$APP_DIR"

echo "→ git pull"
git fetch --all --quiet
git reset --hard origin/main

if [ -f "pnpm-lock.yaml" ]; then
  echo "→ pnpm install"
  pnpm install --frozen-lockfile --prod=false
  echo "→ pnpm build"
  pnpm run build
else
  echo "→ npm ci"
  npm ci
  echo "→ npm run build"
  npm run build
fi

echo "→ pm2 reload $APP_NAME"
pm2 reload "$APP_NAME" --update-env

echo "✓ done"
pm2 status "$APP_NAME"
