// Ambil semua kartu promo
const promoCards = document.querySelectorAll(".promo-card");

// Elemen utama detail promo
const promoBanner = document.getElementById("promoBanner");
const promoValid = document.getElementById("promoValid");
const promoLabel = document.getElementById("promoLabel");
const promoTitle = document.getElementById("promoTitle");
const promoDesc = document.getElementById("promoDesc");
const promoTermsList = document.getElementById("promoTermsList");

// Elemen di hero
const heroSection = document.getElementById("heroSection");
const heroBadge = document.getElementById("heroBadge");
const heroTitle = document.getElementById("heroTitle");
const heroSubtitle = document.getElementById("heroSubtitle");

// === Fungsi utama untuk ganti konten promo + hero ===
function applyPromo(card) {
  const img = card.dataset.img;
  const heroimg = card.dataset.heroimg || img; // fallback ke img jika heroimg kosong
  const label = card.dataset.label;
  const title = card.dataset.title;
  const herotitle = card.dataset.herotitle;
  const herosub = card.dataset.herosub;
  const desc = card.dataset.desc;
  const valid = card.dataset.valid;
  const terms = card.dataset.terms;

  // Ganti banner promo utama
  if (img) {
    promoBanner.src = img;
  }

  // Ganti label
  if (label) {
    promoLabel.textContent = label;
    heroBadge.textContent = label;
  }

  // Ganti judul section detail
  if (title) {
    promoTitle.textContent = title;
  }

  // Ganti deskripsi detail
  if (desc) {
    promoDesc.textContent = desc;
  }

  // Ganti valid until
  if (valid) {
    promoValid.textContent = valid;
  }

  // ==== Update HERO ====
  // Ganti background hero (gambar atas) via CSS variable
  if (heroimg) {
    heroSection.style.setProperty("--hero-bg-image", `url('${heroimg}')`);
  }

  // Ganti teks judul hero
  if (herotitle) {
    heroTitle.textContent = herotitle;
  } else if (title) {
    heroTitle.textContent = title;
  }

  // Ganti subtitle hero
  if (herosub) {
    heroSubtitle.textContent = herosub;
  }

  // ==== Update Terms and Conditions ====
  if (terms) {
    const items = terms.split("|");
    promoTermsList.innerHTML = "";
    items.forEach((text) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const li = document.createElement("li");
      li.textContent = trimmed;
      promoTermsList.appendChild(li);
    });
  }
}

// === Event klik untuk tiap kartu promo ===
promoCards.forEach((card) => {
  card.addEventListener("click", () => {
    applyPromo(card);

    // Scroll halus ke bagian atas hero
    heroSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// === Inisialisasi awal saat halaman baru dibuka ===
document.addEventListener("DOMContentLoaded", () => {
  // Cari card yang ditandai default, kalau nggak ada pakai card pertama
  const defaultCard = document.querySelector(".promo-card[data-default='true']") || promoCards[0];

  if (defaultCard) {
    applyPromo(defaultCard);
  }
});
