# Касови апарати – React+PHP

## Инсталация

### Backend
1. Копирай папката **backend** в `htdocs/backend-cash-register`
2. Импортирай `backend-cash-register/sql/create_tables.sql` през phpMyAdmin

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Сайтът ще се зареди на `http://localhost:5173`

API адресът е зададен в `src/services/api.js`. Ако пътят ти е различен промени `base`.
