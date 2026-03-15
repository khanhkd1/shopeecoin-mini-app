# 🚀 Hướng Dẫn Tạo Telegram Mini App & Deploy

## Mục lục
1. [Tạo Telegram Bot](#1-tạo-telegram-bot)
2. [Đăng ký Mini App với BotFather](#2-đăng-ký-mini-app-với-botfather)
3. [Các lựa chọn Deploy](#3-các-lựa-chọn-deploy)
   - [A. GitHub Pages (miễn phí, dễ nhất)](#a-github-pages--miễn-phí-dễ-nhất)
   - [B. Vercel (miễn phí, nhanh)](#b-vercel--miễn-phí-nhanh)
   - [C. Netlify (miễn phí)](#c-netlify--miễn-phí)
4. [Kết nối URL vào BotFather](#4-kết-nối-url-vào-botfather)
5. [Kiểm tra & Test](#5-kiểm-tra--test)
6. [Cấu trúc file cần upload](#6-cấu-trúc-file-cần-upload)

---

## 1. Tạo Telegram Bot

> **Yêu cầu:** Có tài khoản Telegram

**Bước 1:** Mở Telegram, tìm kiếm `@BotFather` và nhấn **Start**

**Bước 2:** Gõ lệnh:
```
/newbot
```

**Bước 3:** Nhập tên hiển thị của bot (ví dụ: `Vòng Quay Xu Shopee`)

**Bước 4:** Nhập username của bot — **bắt buộc kết thúc bằng `bot`** (ví dụ: `vonquayxu_bot`)

**Bước 5:** BotFather sẽ trả về **Bot Token** — lưu lại, dạng:
```
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
```

> ⚠️ **Giữ bí mật token này**, không chia sẻ hoặc commit lên GitHub

---

## 2. Đăng ký Mini App với BotFather

Sau khi có bot, tiếp tục chat với `@BotFather`:

**Bước 1:** Gõ lệnh:
```
/newapp
```

**Bước 2:** Chọn bot vừa tạo (gõ username: `@vonquayxu_bot`)

**Bước 3:** Nhập tên app hiển thị (ví dụ: `Vòng Quay Xu`)

**Bước 4:** Nhập mô tả ngắn (ví dụ: `Theo dõi vòng quay xu Shopee Live`)

**Bước 5:** Gửi ảnh đại diện app (640x360px hoặc 1280x720px, PNG/JPG)
- Có thể bỏ qua bằng cách gửi `/empty`

**Bước 6:** Nhập **short name** (không dấu, không cách) — ví dụ: `vonquayxu`
- Đây sẽ là link: `t.me/vonquayxu_bot/vonquayxu`

**Bước 7:** Nhập **URL của app** (URL sau khi deploy) — ví dụ:
```
https://ten-cua-ban.github.io/getcoin-bot/tma/
```

> ✅ Vậy là xong! Mini App đã được đăng ký.

---

## 3. Các lựa chọn Deploy

### A. GitHub Pages — Miễn phí, dễ nhất

**Yêu cầu:** Tài khoản GitHub (miễn phí tại github.com)

**Bước 1:** Tạo repository mới trên GitHub
- Vào https://github.com/new
- Tên repo: `getcoin-bot` (hoặc tùy bạn)
- Chọn **Public**
- Nhấn **Create repository**

**Bước 2:** Upload toàn bộ thư mục `tma/` lên repo
```bash
# Nếu dùng Git CLI:
git init
git add tma/
git commit -m "Add Telegram Mini App"
git branch -M main
git remote add origin https://github.com/TEN_BAN/getcoin-bot.git
git push -u origin main
```
Hoặc kéo thả file trực tiếp trên giao diện GitHub.

**Bước 3:** Bật GitHub Pages
- Vào **Settings** → **Pages**
- Source: **Deploy from a branch**
- Branch: `main` → thư mục: `/ (root)`
- Nhấn **Save**

**Bước 4:** Chờ ~1-2 phút, URL của bạn sẽ là:
```
https://TEN_BAN.github.io/getcoin-bot/tma/
```

---

### B. Vercel — Miễn phí, nhanh

**Yêu cầu:** Tài khoản Vercel (đăng ký tại vercel.com bằng GitHub)

**Bước 1:** Vào https://vercel.com → **Add New Project**

**Bước 2:** Import repository GitHub chứa code

**Bước 3:** Trong phần cấu hình:
- **Root Directory:** `tma`
- Framework Preset: **Other**
- Nhấn **Deploy**

**Bước 4:** URL của bạn sẽ là:
```
https://ten-project.vercel.app
```

> 💡 Vercel tự động deploy lại mỗi khi bạn push code mới lên GitHub

---

### C. Netlify — Miễn phí

**Yêu cầu:** Tài khoản Netlify (netlify.com)

**Cách nhanh nhất (kéo thả):**

**Bước 1:** Vào https://app.netlify.com/drop

**Bước 2:** Kéo thả thư mục `tma/` vào vùng upload

**Bước 3:** Netlify sẽ tạo URL ngẫu nhiên ngay lập tức, ví dụ:
```
https://random-name-12345.netlify.app
```

**Bước 4:** Vào **Site settings** → **Change site name** để đổi tên URL

---

## 4. Kết nối URL vào BotFather

Sau khi có URL deploy, cập nhật lại app trong BotFather:

```
/myapps
```
→ Chọn app → **Edit Web App URL** → Nhập URL mới

**Hoặc** nếu chưa tạo app, dùng lệnh `/newapp` và nhập URL ngay từ đầu.

---

## 5. Kiểm tra & Test

### Test trên Telegram:
1. Mở link: `https://t.me/TEN_BOT/SHORT_NAME`
   - Ví dụ: `https://t.me/vonquayxu_bot/vonquayxu`
2. Nhấn **Open** → Mini App sẽ mở trong Telegram

### Test trên máy tính (trình duyệt):
```
https://ten-cua-ban.github.io/getcoin-bot/tma/
```
> ⚠️ Một số tính năng Telegram (như `tg.openLink`) chỉ hoạt động trong Telegram app

### Thêm nút mở Mini App vào bot:
Gõ với BotFather:
```
/mybots → Chọn bot → Bot Settings → Menu Button → Configure menu button
```
Nhập URL: `https://t.me/TEN_BOT/SHORT_NAME`

---

## 6. Cấu trúc file cần upload

```
tma/
├── index.html    ← Giao diện chính (đã tích hợp Telegram SDK)
├── script.js     ← Logic fetch API + countdown + Telegram integration
└── style.css     ← Giao diện tương thích dark/light mode Telegram
```

> **Lưu ý:** Không cần backend hay server — toàn bộ là static files, deploy ở đâu cũng được!

---

## 7. Tùy chỉnh thêm (tuỳ chọn)

### Thay đổi URL điều hướng "Túi quà" và "Xu ế"
Mở `tma/script.js`, tìm phần:
```javascript
const NAV_URLS = {
  tui: "https://t.me/...",   // ← Thay bằng link thực
  xue: "https://t.me/...",   // ← Thay bằng link thực
};
```

### Thay đổi link mạng xã hội
Mở `tma/index.html`, tìm các `data-url="..."` và thay URL tương ứng.

### Thay đổi tần suất làm mới dữ liệu
Mở `tma/script.js`, tìm dòng cuối:
```javascript
setInterval(fetchData, 10000); // 10000ms = 10 giây
```
Thay `10000` bằng số ms mong muốn (ví dụ `30000` = 30 giây).
