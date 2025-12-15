let currentImageIndex = 0;
window.images = [];

// Ouvre la modale avec un tableau d'images et une description
function openModalFromData(imagesArray, description) {
  if (!Array.isArray(imagesArray)) imagesArray = [imagesArray];
  window.images = imagesArray;
  currentImageIndex = 0;
  document.getElementById('modal-img').src = window.images[currentImageIndex];
  document.getElementById('modal-description').innerText = description || '';
  document.getElementById('modal').style.display = 'block';
}

// next/prev
function nextImage(e) {
  if (e) e.stopPropagation();
  if (currentImageIndex < window.images.length - 1) {
    currentImageIndex++;
    document.getElementById('modal-img').src = window.images[currentImageIndex];
  }
}
function prevImage(e) {
  if (e) e.stopPropagation();
  if (currentImageIndex > 0) {
    currentImageIndex--;
    document.getElementById('modal-img').src = window.images[currentImageIndex];
  }
}
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

/* --- Attacher listeners aux cards et aux boutons --- */
document.addEventListener('DOMContentLoaded', function() {
  // toutes les cards
  const cards = document.querySelectorAll('.image-card');
  cards.forEach(card => {
    // lecture des données
    let imgs = [];
    try {
      imgs = JSON.parse(card.getAttribute('data-images') || '[]');
    } catch (err) {
      imgs = [];
      console.warn('data-images JSON invalide', err, card);
    }
    const desc = card.getAttribute('data-desc') || '';

    // clic sur la card (ouvre modal)
    card.addEventListener('click', function(e) {

  // 🔒 Si la card contient un lien vers un site → PAS de modal
  if (card.querySelector('a.image-link') || card.querySelector('a.card-btn')) {
    return;
  }

  // 🔓 Sinon (vraie card projet) → modal
  if (imgs.length > 0 || desc) {
    openModalFromData(imgs, desc);
  }
});

// empêcher les liens d'ouvrir la modale
const links = card.querySelectorAll('a');
links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});

    // clic sur le bouton interne (empêche la propagation sur la card)
    const btn = card.querySelector('.card-btn');
    if (btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        openModalFromData(imgs, desc);
      });
    }
  });

  // navigation prev/next dans la modale (si boutons existent)
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  if (prev) prev.addEventListener('click', prevImage);
  if (next) next.addEventListener('click', nextImage);

  // fermer modale en cliquant sur fond
  const modal = document.getElementById('modal');
  if (modal) {
    modal.addEventListener('click', function() { closeModal(); });
    const img = document.getElementById('modal-img');
    if (img) img.addEventListener('click', function(e){ e.stopPropagation(); });
  }

  // fermer par Échap / fleches
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
});























// Ouvrir la pop-up avec effet fluide
document.getElementById('about-me-btn').addEventListener('click', function() {
  const popup = document.getElementById('about-me-popup');
  popup.style.display = 'block';
  
  // Ajout d'un petit délai pour permettre l'effet d'apparition
  setTimeout(() => {
    popup.classList.add('active');
  }, 10);
});

// Fermer la pop-up
document.getElementById('close-btn').addEventListener('click', function() {
  const popup = document.getElementById('about-me-popup');
  popup.classList.remove('active');

  // Attendre la fin de l'animation avant de cacher la pop-up
  setTimeout(() => {
    popup.style.display = 'none';
  }, 500);
});