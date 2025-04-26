# Касови апарати – React+PHP

## Инсталация

### Backend
1. Копирай папката **backend** в `htdocs/cash-register-site/backend`
2. Импортирай `backend/sql/create_tables.sql` през phpMyAdmin
3. Увери се, че базата данни в `db.php` отговаря на твоите креденшъли

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Сайтът ще се зареди на `http://localhost:5173`

API адресът е зададен в `src/services/api.js`. Ако пътят ти е различен промени `base`.
