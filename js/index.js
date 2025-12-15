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