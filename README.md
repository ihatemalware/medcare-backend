# MedCare+ Backend

> Backend API cho ứng dụng MedCare+ – quản lý sức khỏe cá nhân và gia đình.

Built with **NestJS** · **Prisma** · **PostgreSQL** · Deployed on **Railway**

---

## Tech Stack

| Layer | Công nghệ |
|---|---|
| Framework | NestJS (Node.js) |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | JWT + OTP |
| API Docs | Swagger (OpenAPI) |
| Deploy | Railway |

---

## Yêu cầu

- Node.js >= 18
- PostgreSQL (local hoặc cloud)
- npm hoặc yarn

---

## Cài đặt & Chạy local

```bash
# 1. Clone repo
git clone https://github.com/[username]/medcare-backend.git
cd medcare-backend

# 2. Cài dependencies
npm install

# 3. Tạo file .env
cp .env.example .env
```

Mở `.env` và điền:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/medcare"
JWT_SECRET="your_jwt_secret_here"
```

```bash
# 4. Chạy migration
npx prisma migrate dev

# 5. (Tuỳ chọn) Seed dữ liệu mẫu
npx prisma db seed

# 6. Khởi động server
npm run start:dev
```

Server chạy tại: `http://localhost:3000`

---

## API Documentation

Swagger UI: `http://localhost:3000/api/docs`

Production: `https://medcare-backend-production.up.railway.app/api/docs`

---

## Cấu trúc thư mục

```
src/
├── auth/               # Xác thực OTP, JWT
├── user/               # Hồ sơ cá nhân, thẻ khẩn cấp
├── family/             # Quản lý thành viên gia đình
├── reminder/           # Hệ thống nhắc nhở
├── medicine/           # Tủ thuốc gia đình
├── emergency-card/     # Tra cứu thẻ khẩn cấp qua QR
├── prisma/             # Prisma service
└── main.ts
prisma/
├── schema.prisma       # Database schema
└── migrations/
```

---

## Các API chính

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| POST | `/api/auth/send-otp` | Gửi OTP về số điện thoại | Không |
| POST | `/api/auth/verify-otp` | Xác thực OTP, trả JWT | Không |
| GET | `/api/user/profile` | Lấy hồ sơ cá nhân | JWT |
| PUT | `/api/user/profile` | Cập nhật hồ sơ | JWT |
| GET | `/api/user/emergency-card` | Lấy thẻ khẩn cấp | JWT |
| PUT | `/api/user/emergency-card` | Cập nhật thẻ khẩn cấp | JWT |
| GET | `/api/emergency-card/:qrCode` | Tra cứu thẻ qua QR | Không |
| GET | `/api/family` | Danh sách thành viên gia đình | JWT |
| POST | `/api/family` | Thêm thành viên | JWT |
| PUT | `/api/family/:id` | Sửa thành viên | JWT |
| DELETE | `/api/family/:id` | Xoá thành viên | JWT |
| GET | `/api/reminder` | Danh sách nhắc nhở | JWT |
| POST | `/api/reminder` | Tạo nhắc nhở | JWT |
| PUT | `/api/reminder/:id` | Sửa nhắc nhở | JWT |
| DELETE | `/api/reminder/:id` | Xoá nhắc nhở | JWT |
| GET | `/api/medicine` | Danh sách thuốc | JWT |
| POST | `/api/medicine` | Thêm thuốc | JWT |
| PUT | `/api/medicine/:id` | Sửa thuốc | JWT |
| DELETE | `/api/medicine/:id` | Xoá thuốc | JWT |

---

## Scripts

```bash
npm run start:dev     # Chạy development (hot reload)
npm run start:prod    # Chạy production
npm run build         # Build TypeScript
npx prisma studio     # Mở Prisma Studio (GUI database)
npx prisma migrate dev # Chạy migration mới
```

---

## Deploy (Railway)

1. Push code lên GitHub
2. Tạo project mới trên [Railway](https://railway.app)
3. Connect GitHub repo
4. Thêm PostgreSQL service
5. Set environment variables: `DATABASE_URL`, `JWT_SECRET`
6. Railway tự động build và deploy

---

## Liên hệ

## From BKISC wit luv