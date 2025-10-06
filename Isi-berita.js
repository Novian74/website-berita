// 1. Interaktivitas Menu Navigasi (Hamburger Menu)
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

// 2. Slider / Carousel (kalau nanti kamu tambahkan bagian slide)
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');

if (slides.length > 0) {
  setInterval(() => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
  }, 5000);
}

// 3. Bagian Komentar (Write Comment)
const textarea = document.querySelector('.comment-form textarea');
const postBtn = document.querySelector('.comment-form button');
const commentsSection = document.querySelector('.comments');

if (textarea && postBtn && commentsSection) {
  postBtn.addEventListener('click', () => {
    const text = textarea.value.trim();
    if (text !== '') {
      const newComment = document.createElement('div');
      newComment.classList.add('comment');
      newComment.innerHTML = `
        <div class="avatar">👤</div>
        <div class="comment-body">
          <div class="comment-header">
            <span class="name">You</span>
            <span class="stars">★★★★★</span>
          </div>
          <p class="comment-text">${text}</p>
        </div>
      `;
      commentsSection.appendChild(newComment);
      textarea.value = '';
    }
  });
}

// 4. Tombol "View More" (Find More simulasi AJAX)
const findMoreLinks = document.querySelectorAll('.find-more a');

findMoreLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    fetch(link.href)
      .then(res => res.text())
      .then(data => {
        const article = document.querySelector('.content');
        if (article) article.innerHTML = data;
      })
      .catch(err => console.error('Gagal memuat artikel:', err));
  });
});

// 5. Mode Gelap / Terang (Dark Mode Toggle)
const toggle = document.getElementById('theme-toggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
}

// 6. Animasi Scroll dan Lazy Loading
window.addEventListener('scroll', () => {
  document.querySelectorAll('.fade-in').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 50) {
      el.classList.add('visible');
    }
  });
});
