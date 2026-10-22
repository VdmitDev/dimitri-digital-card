#!/bin/sh
# Порядок запуска важен: таблицы должны существовать до заполнения, а seed-скрипт
# должен завершиться до того, как API начнёт принимать запросы. `set -e` останавливает
# контейнер при любой ошибке, поэтому API не будет работать с пустой или сломанной базой.
set -eu

echo "Applying database migrations..."
node_modules/.bin/prisma migrate deploy

echo "Seeding profile data..."
node_modules/.bin/tsx prisma/seed.ts

echo "Starting NestJS..."
# exec запускает Node.js как PID 1, чтобы он напрямую получал сигнал остановки от Docker.
exec node dist/main.js
