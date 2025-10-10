// Tampilkan popup otomatis setelah halaman dimuat
window.addEventListener('load', () => {
  const popup = document.getElementById('popup');
  popup.style.display = 'flex';
});

// Tombol close
document.getElementById('closeBtn').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('popup').style.display = 'none';
});

// Tombol kirim rating
document.getElementById('sendBtn').addEventListener('click', () => {
  const rates = document.getElementsByName('rate');
  let selectedRate = 0;

  for (let i = 0; i < rates.length; i++) {
    if (rates[i].checked) {
      selectedRate = 6 - (i + 1); // hitung dari kiri
      break;
    }
  }

  if (selectedRate === 0) {
    alert('Silakan pilih rating dulu ⭐');
  } else {
    alert(`Terima kasih! Kamu memberi ${selectedRate} bintang!`);
    document.getElementById('popup').style.display = 'none';
  }
});
