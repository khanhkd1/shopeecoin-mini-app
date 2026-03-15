# 📊 Phân Tích Source Code: getcoin-bot

## 1. Tổng Quan Dự Án

| Thông tin | Chi tiết |
|-----------|----------|
| **Tên dự án** | Vòng quay 🎡 (Getcoin Bot) |
| **Ngôn ngữ** | HTML, CSS, JavaScript (thuần) |
| **Số file** | 3 file |
| **Mục đích** | Theo dõi & điều hướng người dùng tới các phiên quay vòng xu (coin) trên Shopee Live |

---

## 2. Cấu Trúc File

```
getcoin-bot/
├── index.html   # Giao diện chính
├── script.js    # Logic lấy dữ liệu & đếm ngược
└── style.css    # Giao diện & responsive
```

---

## 3. Phân Tích Từng File

### 📄 `index.html` — Giao diện chính

#### Chức năng:
- **Hiển thị giao diện** trang "Vòng quay 🎡"
- **Animation tuyết rơi** bằng `🌸` (snowflake effect) tạo mỹ quan
- **Background** lễ Tết với ảnh gif động (`/img/tetgif.gif`, `/img/tet.png`)
- **Thanh điều hướng mạng xã hội**: Facebook Group, Zalo Group, Telegram Channel
- **Nút điều hướng nội bộ**:
  - `/tui` → Túi quà
  - `/xue` → Xu ế
- Khu vực hiển thị danh sách shop (`#data-list`)
- Trạng thái loading: `"Đợi xíu..."`

#### Thư viện bên ngoài:
- Font Awesome 4.7.0 (icon mạng xã hội)

---

### 📄 `script.js` — Logic nghiệp vụ

#### Chức năng chính:

**1. Kết nối API Google Apps Script**
```
URL: https://script.google.com/macros/s/.../exec
```
- Đây là một Google Sheets / Apps Script đóng vai trò **backend không cần server**
- Cứ **mỗi 10 giây** gọi lại API để cập nhật dữ liệu mới nhất

**2. Hiển thị danh sách shop (card)**

Mỗi card hiển thị:
| Trường | Mô tả |
|--------|-------|
| `item.userName` | Tên shop Shopee |
| `item.maxcoin` | Số xu tối đa có thể nhận |
| `item.shopId` | Link vào shop (deep link Shopee Live) |
| `item.viewer_count` | Số người đang xem |
| `item.startTime` | Thời điểm bắt đầu quay (timestamp ms) |

**3. Đồng hồ đếm ngược (countdown)**
- Tính thời gian còn lại đến `startTime` của mỗi shop
- Hiển thị dạng: `X ngày Y giờ Z phút W giây`
- Cập nhật **mỗi giây**
- Khi hết giờ → **tự xoá card** khỏi danh sách

**4. Sắp xếp dữ liệu**
- Danh sách shop được **sắp xếp tăng dần theo `startTime`** → shop sắp quay sẽ hiện lên đầu

#### Flow xử lý:
```
fetchData() (mỗi 10s)
    ↓
Gọi API Google Apps Script
    ↓
Sort theo startTime
    ↓
Render card HTML
    ↓
updateCountdowns() (mỗi 1s)
    ↓
Xoá card khi hết giờ
```

---

### 📄 `style.css` — Giao diện

#### Chức năng:
- **Responsive layout** tối đa `500px` (tối ưu mobile)
- **Card design** với shadow, bo góc — giao diện dạng danh sách
- **Shop name**: giới hạn 2 dòng, cắt với `...` nếu quá dài
- **Coin section**: màu vàng `#f0a500`, font lớn nổi bật
- **Nút "Vào ngay"**: màu xanh lá, hover effect
- **Social share bar**: hiển thị icon mạng xã hội với màu riêng từng mạng
- Hỗ trợ **CSS nested** (tính năng CSS hiện đại)

---

## 4. Kiến Trúc Tổng Thể

```
┌─────────────────────────────────────────┐
│            NGƯỜI DÙNG (Mobile)          │
└───────────────┬─────────────────────────┘
                │ Mở trình duyệt
                ▼
┌─────────────────────────────────────────┐
│          index.html + style.css         │
│   (Giao diện Web - Static Frontend)     │
└───────────────┬─────────────────────────┘
                │ fetch() mỗi 10 giây
                ▼
┌─────────────────────────────────────────┐
│        Google Apps Script API           │
│  (Backend - Lấy dữ liệu từ Google      │
│   Sheets hoặc nguồn dữ liệu khác)      │
└───────────────┬─────────────────────────┘
                │ JSON response
                ▼
┌─────────────────────────────────────────┐
│            script.js                    │
│  - Parse JSON                           │
│  - Sort theo startTime                  │
│  - Render card                          │
│  - Countdown timer                      │
└─────────────────────────────────────────┘
                │ Click "Vào ngay"
                ▼
┌─────────────────────────────────────────┐
│      Shopee Live (Deep Link)            │
│  (item.shopId → mở app/web Shopee)     │
└─────────────────────────────────────────┘
```

---

## 5. Điểm Mạnh

- ✅ **Không cần backend riêng** — dùng Google Apps Script làm API miễn phí
- ✅ **Tự động cập nhật** — fetch mỗi 10s, countdown mỗi 1s
- ✅ **Tối ưu mobile** — max-width 500px, phù hợp dùng trên điện thoại
- ✅ **Nhẹ & đơn giản** — không dùng framework, load nhanh
- ✅ **UI trực quan** — hiển thị đủ thông tin cần thiết trên 1 card

## 6. Điểm Hạn Chế / Có Thể Cải Thiện

- ⚠️ **Link ảnh background** dùng đường dẫn tuyệt đối (`/img/...`) → chỉ hoạt động khi có server đúng cấu hình
- ⚠️ **Không có xử lý lỗi UI** — khi API lỗi chỉ log console, người dùng không thấy thông báo
- ⚠️ **API URL lộ trong code** — URL Google Apps Script có thể bị người khác dùng
- ⚠️ **Không có cache** — mỗi 10s gọi lại API dù data không thay đổi
- ⚠️ **Link điều hướng nội bộ** (`/tui`, `/xue`) phụ thuộc vào routing server bên ngoài
