===== Запуск =====

Требования: Docker Engine и Docker Compose v2.

--- bash ---
docker compose up --build

При запуске контейнер применяет миграции Prisma, заполняет базу начальными данными и запускает API. Дождитесь сообщения журнала о том, что сервер начал прослушивать порт. Затем откройте:

- **Apollo Sandbox в браузере:** http://localhost:3001/graphql
- **GraphQL-эндпоинт (POST):** http://localhost:3001/graphql

Пример запроса:

graphql
query DigitalBusinessCard {
  profile {
    name
    headline
    description
    email
    links { label url }
    skills { name category }
    experience { company position location startDate endDate achievements }
    projects { name description url technologies }
  }
}
