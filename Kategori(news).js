// ==============================
// Kategori(news).js
// ==============================

// 1️⃣  Ubah tanggal otomatis di header
const headerTop = document.querySelector(".header-top");
const bulan = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];
const now = new Date();
headerTop.textContent = `${bulan[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

  // ====== MENU POPUP ======
  const menuBtn = document.querySelector(".menu-btn");
  const dropdown = document.querySelector(".dropdown-menu");

  menuBtn.addEventListener("click", () => {
    dropdown.classList.toggle("show");
  });

  // Klik di luar menu untuk menutupnya
  document.addEventListener("click", (e) => {
    if (!menuBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  });

// 3️⃣  Klik ikon user → arahkan ke Login
const userIcon = document.querySelector(".right span:first-child");
userIcon.style.cursor = "pointer";
userIcon.addEventListener("click", () => {
  alert("Mengalihkan ke halaman Login...");
  window.location.href = "Login.html";
});

// 4️⃣  Scroll lembut ke bagian tertentu saat klik menu
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute("href");

    if (targetId && targetId.startsWith("#")) {
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

// 5️⃣  Tambahan efek kecil: animasi muncul saat scroll
window.addEventListener("scroll", () => {
  const articles = document.querySelectorAll(".news-item");
  const triggerBottom = window.innerHeight * 0.85;

  articles.forEach(article => {
    const top = article.getBoundingClientRect().top;
    if (top < triggerBottom) {
      article.classList.add("show");
    }
  });
});
