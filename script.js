// =============================================
//  TELEGRAM MINI APP - Vòng quay xu Shopee
// =============================================

const apiUrl = "https://script.google.com/macros/s/AKfycbyobr7LWkEQjy0Kvu-_eRoTgTG-aWEPC8Lk81l6pIYar85KIz1BoZfYijcp3zjghvYhPA/exec";

// --- Khởi tạo Telegram Web App ---
const tg = window.Telegram.WebApp;
tg.ready();                    // Báo Telegram app đã sẵn sàng
tg.expand();                   // Mở full màn hình
tg.disableVerticalSwipes();    // Tắt swipe-down để tránh đóng app nhầm

// Áp dụng màu theme từ Telegram (dark/light mode)
applyTelegramTheme();

// --- Áp dụng màu theo theme Telegram ---
function applyTelegramTheme() {
  const theme = tg.themeParams;
  const root = document.documentElement;

  if (theme.bg_color) root.style.setProperty('--tg-bg', theme.bg_color);
  if (theme.text_color) root.style.setProperty('--tg-text', theme.text_color);
  if (theme.hint_color) root.style.setProperty('--tg-hint', theme.hint_color);
  if (theme.secondary_bg_color) root.style.setProperty('--tg-secondary', theme.secondary_bg_color);
  if (theme.button_color) root.style.setProperty('--tg-btn', theme.button_color);
  if (theme.button_text_color) root.style.setProperty('--tg-btn-text', theme.button_text_color);
}

// --- Mở link an toàn trong Telegram ---
function openLink(url) {
  if (!url) return;
  // Dùng Telegram API để mở link — tránh bị chặn bởi trình duyệt trong app
  tg.openLink(url);
}

// =============================================
//  LOGIC CHÍNH: Fetch + Render + Countdown
// =============================================

const dataList = document.getElementById("data-list");
let items = [];
let countdownInterval = null;

// --- Format thời gian đếm ngược ---
function formatCountdown(timeDifference) {
  if (timeDifference <= 0) return "🔴 Đã bắt đầu";

  const seconds = Math.floor((timeDifference / 1000) % 60);
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const parts = [];
  if (days > 0) parts.push(`${days} ngày`);
  if (hours > 0) parts.push(`${hours} giờ`);
  if (minutes > 0) parts.push(`${minutes} phút`);
  parts.push(`${seconds} giây`);

  return "⏳ " + parts.join(" ");
}

// --- Lấy dữ liệu từ API ---
async function fetchData() {
  const loadingEl = document.getElementById("loading");
  const errorEl = document.getElementById("error-msg");

  try {
    loadingEl.style.display = "flex";
    errorEl.style.display = "none";

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    data.sort((a, b) => a.startTime - b.startTime);

    renderCards(data);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    // Chỉ hiển thị lỗi nếu danh sách đang trống
    if (items.length === 0) {
      errorEl.style.display = "block";
    }
  } finally {
    loadingEl.style.display = "none";
  }
}

// --- Render danh sách card ---
function renderCards(data) {
  dataList.innerHTML = "";
  items = data.map((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Tạo nút "Vào ngay" an toàn (không dùng onclick inline với window.location)
    card.innerHTML = `
      <div class="top-row">
        <div class="shop-name">${escapeHtml(item.userName)}</div>
        <div class="coin-section">${item.maxcoin} xu</div>
        <div class="button-section">
          <button class="enter-btn" data-shop-url="${escapeHtml(item.shopId)}">Vào ngay</button>
        </div>
      </div>
      <div class="card-footer">
        <!-- <div class="viewer-count">👁 ${item.viewer_count}</div> -->
        <div class="countdown" data-start-time="${item.startTime}"></div>
      </div>
    `;

    // Gán sự kiện click cho nút "Vào ngay" → mở link qua Telegram API
    card.querySelector(".enter-btn").addEventListener("click", () => {
      openLink(item.shopId);
    });

    dataList.appendChild(card);
    return {
      element: card.querySelector(".countdown"),
      startTime: item.startTime,
      row: card
    };
  });

  updateCountdowns();
}

// --- Cập nhật countdown mỗi giây ---
function updateCountdowns() {
  const currentTime = Date.now();
  items = items.filter(item => {
    const timeDifference = item.startTime - currentTime;
    if (timeDifference > 0) {
      item.element.textContent = formatCountdown(timeDifference);
      return true;
    } else {
      item.element.textContent = "🔴 Đã bắt đầu";
      return true; // Giữ lại card, không xóa ngay
    }
  });
}

// --- Thoát an toàn (escape HTML để tránh XSS) ---
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// --- Retry khi lỗi ---
function retryFetch() {
  fetchData();
}


// =============================================
//  ANIMATION HOA RƠI
// =============================================

function createPetal() {
  const container = document.getElementById("petalContainer");
  if (!container) return;

  const petal = document.createElement("div");
  petal.classList.add("petal");
  petal.textContent = ["🌸", "🌺", "🌷", "🌼"][Math.floor(Math.random() * 4)];
  petal.style.left = Math.random() * window.innerWidth + "px";
  petal.style.animationDuration = (Math.random() * 3 + 2) + "s";
  petal.style.fontSize = (Math.random() * 14 + 8) + "px";
  petal.style.opacity = Math.random() * 0.6 + 0.3;
  container.appendChild(petal);
  setTimeout(() => petal.remove(), 5000);
}

setInterval(createPetal, 600);


// =============================================
//  KHỞI ĐỘNG
// =============================================

// Lần đầu load
fetchData().then(() => {
  countdownInterval = setInterval(updateCountdowns, 1000);
});

// Tự động làm mới dữ liệu mỗi 10 giây
setInterval(fetchData, 10000);
