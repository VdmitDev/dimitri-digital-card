# ---- Этап 1: сборка ----
FROM node:20-bookworm-slim AS build
# Механизму запросов Prisma нужен OpenSSL, которого нет в базовом slim-образе.
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

# ---- Этап 2: запуск (образ меньше, зависимости разработки отсутствуют) ----
FROM node:20-bookworm-slim AS runtime
# Устанавливаем OpenSSL и здесь: версия механизма должна соответствовать версии, выбранной при сборке.
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist
# В prisma/ находятся миграции и файлы заполнения данных, используемые при запуске.
COPY --from=build /app/prisma ./prisma
# Сгенерированный клиент Prisma копируется с этапа сборки.
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=build /app/node_modules/prisma ./node_modules/prisma
COPY docker-entrypoint.sh ./docker-entrypoint.sh
# Не запускаем приложение от имени root.
RUN chmod +x ./docker-entrypoint.sh && chown -R node:node /app
USER node
EXPOSE 3000
ENTRYPOINT ["./docker-entrypoint.sh"]
