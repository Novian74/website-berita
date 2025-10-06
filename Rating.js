// Rating.js
window.onload = function () {
  // Ambil elemen-elemen dari HTML
  const popup = document.getElementById("popup");
  const closeBtn = document.querySelector(".close");
  const sendBtn = document.querySelector(".send-btn");
  const thankPopup = document.getElementById("thank-popup");

  // Cek apakah semua elemen ada di halaman
  if (!popup || !closeBtn || !sendBtn || !thankPopup) {
    console.error("Elemen popup atau tombol tidak ditemukan. Pastikan ID dan class di HTML sesuai.");
    return;
  }

  // Tampilkan popup 2 detik setelah halaman dimuat
  setTimeout(() => {
    popup.classList.add("show");
  }, 2000);

  // Tombol X untuk menutup popup rating
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.remove("show");
  });

  // Tombol Send untuk menampilkan ucapan terima kasih dan redirect ke halaman login
  sendBtn.addEventListener("click", () => {
    popup.classList.remove("show");
    thankPopup.classList.add("show");

    // Setelah 2 detik, sembunyikan popup ucapan dan alihkan ke halaman login
    setTimeout(() => {
      thankPopup.classList.remove("show");

      // Gunakan path sesuai struktur folder kamu
      window.location.href = "Login.html"; // huruf besar-kecil harus sama persis dengan nama file
    }, 2000);
  });
};
