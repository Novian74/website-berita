// Rating.js

// Fungsi untuk menampilkan popup otomatis
window.onload = function() {
  const popup = document.getElementById("popup");
  const closeBtn = document.querySelector(".close");
  const sendBtn = document.querySelector(".send-btn");

  // Tampilkan popup 2 detik setelah halaman dimuat
  setTimeout(() => {
    popup.classList.add("show");
  }, 2000);

  // Tutup popup saat tombol X diklik
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.remove("show");
  });

  // Tutup popup saat tombol Send diklik
  sendBtn.addEventListener("click", () => {
    alert("Terima kasih atas rating Anda! ❤️");
    popup.classList.remove("show");
  });
};
