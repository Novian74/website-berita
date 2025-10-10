/* Isi-berita.js
   Siap-tempel: menambahkan fitur menu (☰), comment system, rating, pagination.
   Pastikan <script src="Isi-berita.js" defer></script> ada di HTML.
*/

document.addEventListener("DOMContentLoaded", () => {
  /* ------------------ MENU (TOMBOL ☰) ------------------ */
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const leftArea = document.querySelector(".left");

  function isMobileWidth() {
    return window.innerWidth <= 900; // breakpoint disesuaikan
  }

  function openNavMobile() {
    if (!navLinks) return;
    navLinks.style.display = "flex";
    navLinks.style.flexDirection = isMobileWidth() ? "column" : "row";
    navLinks.classList.add("show");
  }
  function closeNavMobile() {
    if (!navLinks) return;
    // sembunyikan hanya untuk tampilan mobile, untuk desktop biarkan flex
    if (isMobileWidth()) {
      navLinks.style.display = "";
      navLinks.classList.remove("show");
    }
  }

  if (menuBtn && navLinks) {
    // inisiasi state: jika mobile sembunyikan nav default
    if (isMobileWidth()) navLinks.style.display = "none";

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!navLinks) return;
      if (navLinks.classList.contains("show")) {
        closeNavMobile();
      } else {
        openNavMobile();
      }
    });

    // tutup ketika klik di luar area tombol + nav
    document.addEventListener("click", (e) => {
      if (!leftArea || !navLinks) return;
      if (!leftArea.contains(e.target) && !navLinks.contains(e.target)) {
        closeNavMobile();
      }
    });

    // tutup dengan ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNavMobile();
    });

    // ketika resize, jika melewati breakpoint -> atur ulang style
    window.addEventListener("resize", () => {
      if (!navLinks) return;
      if (isMobileWidth()) {
        // sembunyikan agar user mengetuk ☰ sendiri
        navLinks.style.display = "none";
        navLinks.classList.remove("show");
      } else {
        // desktop: pastikan tampil (kembalikan ke style normal)
        navLinks.style.display = "flex";
        navLinks.style.flexDirection = "row";
        navLinks.classList.remove("show");
      }
    });
  }

  /* ------------------ KOMENTAR DINAMIS ------------------ */

  const commentsSection = document.querySelector(".comments");
  if (!commentsSection) return; // tidak ada section komentar, hentikan bagian komentar

  // Temukan elemen-elemen form
  const commentFormButton = document.querySelector(".comment-form button");
  const commentTextarea = document.querySelector(".comment-form textarea");
  const commentUserNameEl = document.querySelector(".comment-form .user-name");
  const commentStarsBox = document.querySelector(".comment-form .stars");

  // fallback jika tidak ada elemen form
  if (!commentFormButton || !commentTextarea || !commentUserNameEl || !commentStarsBox) {
    console.warn("Element form komentar tidak lengkap. Beberapa fitur komentar dinonaktifkan.");
  }

  // deteksi komentar statis awal (jangan hapus contoh komentar HTML statis)
  const staticComments = Array.from(commentsSection.querySelectorAll(":scope > .comment"));

  // buat container khusus untuk komentar dinamis (agar mudah manage)
  const DYN_CLASS = "dynamic-comments";
  let dynamicContainer = commentsSection.querySelector(`.${DYN_CLASS}`);
  if (!dynamicContainer) {
    dynamicContainer = document.createElement("div");
    dynamicContainer.className = DYN_CLASS;
    // tempatkan sebelum tombol view-more jika ada, jika tidak append di akhir section
    const maybeViewMore = commentsSection.querySelector(".view-more");
    if (maybeViewMore) commentsSection.insertBefore(dynamicContainer, maybeViewMore);
    else commentsSection.appendChild(dynamicContainer);
  }

  // Load comments dari localStorage
  const STORAGE_KEY = "isi_comments";
  localStorage.removeItem("isi_comments");
  let storedComments = [];
  function loadStoredComments() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      storedComments = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(storedComments)) storedComments = [];
    } catch (err) {
      console.error("Gagal parse komentar dari localStorage:", err);
      storedComments = [];
    }
  }
  loadStoredComments();

  // Pagination
  const PAGE_SIZE = 3;
  let currentShown = 0;

  // Update header count "Comments (N)"
  function updateCommentsHeader() {
    const h3 = commentsSection.querySelector("h3");
    if (!h3) return;
    const staticCount = staticComments.length;
    const total = staticCount + storedComments.length;
    h3.textContent = `Comments (${total})`;
  }

  // Render komentar dinamis batch (append)
  function renderDynamicComments(reset = false) {
    if (reset) {
      dynamicContainer.innerHTML = "";
      currentShown = 0;
    }
    const remaining = storedComments.length - currentShown;
    if (remaining <= 0) {
      updateCommentsHeader();
      updateViewMore();
      return;
    }
    const count = Math.min(PAGE_SIZE, remaining);

    // render newest first (storedComments[0] adalah terbaru)
    for (let i = currentShown; i < currentShown + count; i++) {
      const c = storedComments[i];
      const commentDiv = document.createElement("div");
      commentDiv.className = "comment";

      // avatar
      const avatar = document.createElement("div");
      avatar.className = "avatar";
      avatar.textContent = "👤";

      // comment body
      const body = document.createElement("div");
      body.className = "comment-body";

      const header = document.createElement("div");
      header.className = "comment-header";

      const nameSpan = document.createElement("span");
      nameSpan.className = "name";
      nameSpan.textContent = c.name || "Anon";

      const starsSpan = document.createElement("span");
      starsSpan.className = "stars";
      const starCount = Number.isFinite(c.stars) ? Math.max(0, Math.min(5, c.stars)) : 0;
      starsSpan.textContent = "★".repeat(starCount) + "☆".repeat(5 - starCount);

      const timeSpan = document.createElement("span");
      timeSpan.className = "time";
      timeSpan.style.marginLeft = "8px";
      timeSpan.style.fontSize = "12px";
      timeSpan.style.color = "#666";
      timeSpan.textContent = formatDate(c.time);

      header.appendChild(nameSpan);
      header.appendChild(starsSpan);
      header.appendChild(timeSpan);

      const p = document.createElement("p");
      p.className = "comment-text";
      // gunakan textContent (aman terhadap XSS)
      p.textContent = c.text || "";

      body.appendChild(header);
      body.appendChild(p);

      commentDiv.appendChild(avatar);
      commentDiv.appendChild(body);

      dynamicContainer.appendChild(commentDiv);
    }
    currentShown += count;
    updateCommentsHeader();
    updateViewMore();
  }

  // format tanggal tampil user-friendly
  function formatDate(isoString) {
    try {
      const d = new Date(isoString);
      return d.toLocaleString("id-ID", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch {
      return isoString || "";
    }
  }

  // Manage tombol View More
  function updateViewMore() {
    let viewMore = commentsSection.querySelector(".view-more");
    if (storedComments.length === 0) {
      if (viewMore) viewMore.style.display = "none";
      return;
    }

    if (!viewMore) {
      viewMore = document.createElement("a");
      viewMore.href = "#";
      viewMore.className = "view-more";
      viewMore.textContent = "View More";
      commentsSection.appendChild(viewMore);
      viewMore.addEventListener("click", (e) => {
        e.preventDefault();
        renderDynamicComments(false);
      });
    }

    // toggle visibility
    viewMore.style.display = currentShown < storedComments.length ? "block" : "none";
  }

  // Inisialisasi render awal
  renderDynamicComments(true);

  /* ------------------ STAR RATING (WRITE COMMENT) ------------------ */
  let currentStarValue = 5; // default
  function setupStarRating() {
    if (!commentStarsBox) return;
    // kosongkan konten awal dan buat 5 tombol bintang agar keyboard accessible
    commentStarsBox.innerHTML = "";
    commentStarsBox.style.display = "inline-flex";
    commentStarsBox.style.gap = "6px";

    for (let i = 1; i <= 5; i++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "star-btn";
      btn.setAttribute("aria-label", `${i} stars`);
      btn.setAttribute("data-star", String(i));
      btn.style.border = "none";
      btn.style.background = "transparent";
      btn.style.cursor = "pointer";
      btn.style.fontSize = "18px";
      btn.textContent = i <= currentStarValue ? "★" : "☆";

      btn.addEventListener("click", () => {
        setStars(i);
      });
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setStars(i);
        }
      });

      commentStarsBox.appendChild(btn);
    }
  }

  function setStars(n) {
    currentStarValue = Math.max(0, Math.min(5, n));
    if (!commentStarsBox) return;
    const btns = commentStarsBox.querySelectorAll(".star-btn");
    btns.forEach((b, idx) => (b.textContent = idx < currentStarValue ? "★" : "☆"));
  }

  setupStarRating();

  // prefill username dari localStorage jika ada
  try {
    const savedUser = localStorage.getItem("username");
    if (savedUser && commentUserNameEl) commentUserNameEl.textContent = savedUser;
  } catch (e) {
    // ignore
  }

  /* ------------------ POST KOMENTAR ------------------ */
  function saveCommentsToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedComments));
    } catch (err) {
      console.error("Gagal menyimpan komentar ke localStorage:", err);
    }
  }

  if (commentFormButton && commentTextarea) {
    commentFormButton.addEventListener("click", (e) => {
      e.preventDefault();

      const text = (commentTextarea.value || "").trim();
      if (text.length < 2) {
        alert("Komentar terlalu pendek.");
        commentTextarea.focus();
        return;
      }

      const name = (commentUserNameEl && commentUserNameEl.textContent) ? commentUserNameEl.textContent.trim() : "Anon";

      const newComment = {
        id: Date.now(),
        name: name,
        text: text,
        stars: currentStarValue,
        time: new Date().toISOString(),
      };

      // tambahkan di awal array (baru muncul di top)
      storedComments.unshift(newComment);
      saveCommentsToStorage();

      // re-render dari awal
      renderDynamicComments(true);

      // reset form
      commentTextarea.value = "";
      setStars(5);
      commentTextarea.focus();
    });

    // Ctrl/Cmd + Enter -> submit
    commentTextarea.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        commentFormButton.click();
      }
    });
  }

  // initial update header & view-more
  updateCommentsHeader();
  updateViewMore();

  /* ------------------ SAFETY / UTILITIES ------------------ */
  // Jika ingin menghapus semua komentar (developer helper) - tidak diekspose UI
  function clearAllComments_dev() {
    storedComments = [];
    saveCommentsToStorage();
    renderDynamicComments(true);
  }
  // window.clearAllComments_dev = clearAllComments_dev; // uncomment untuk debug di console
});
