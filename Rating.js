// Rating.js
window.onload = function () {
  const popup = document.getElementById("popup");
  const closeBtn = document.querySelector(".close");
  const sendBtn = document.getElementById("sendBtn");

  // Buat elemen pesan terima kasih
  const thankMessage = document.createElement("div");
  thankMessage.classList.add("thank-message");
  thankMessage.textContent = "Terima kasih atas rating Anda! 😊";
  popup.appendChild(thankMessage);
  thankMessage.style.display = "none"; // sembunyikan dulu

  // Tampilkan popup setelah 2 detik
  setTimeout(() => {
    popup.style.display = "block";
  }, 2000);

  // Saat tombol Send diklik
  sendBtn.addEventListener("click", () => {
    const selectedRating = document.querySelector('input[name="rate"]:checked');

    if (selectedRating) {
      // Sembunyikan konten rating dan tampilkan pesan terima kasih
      document.querySelector(".popup-content").style.display = "none";
      thankMessage.style.display = "flex";

      // Setelah 2 detik, arahkan ke Login.html
      setTimeout(() => {
        window.location.href = "Login.html";
      }, 2000);
    } else {
      alert("Silakan pilih rating terlebih dahulu!");
    }
  });

  // Saat tombol X diklik
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.style.display = "none";
  });
};
