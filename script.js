
  // ---------- МОДАЛКИ ----------
  // ---------- МОДАЛКИ ----------
document.querySelectorAll('.open-modal').forEach(button => {
  button.addEventListener('click', () => {
    const modalId = button.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    }
  });
});

document.querySelectorAll('.modal .close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    const modal = closeBtn.closest('.modal');
    if (modal) {
      modal.style.display = 'none';
    }
  });
});

window.addEventListener('click', (event) => {
  document.querySelectorAll('.modal').forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});

// ---------- СЛАЙДЕР ----------
let slideIndex = 0;
const slidesContainer = document.querySelector('.slides');
const slides = document.querySelectorAll('.slides img');
const dots = document.querySelectorAll('.dot');
const totalSlides = Math.min(slides.length, 5); // максимум 5 слайдов

function showSlide(index) {
  if (index >= totalSlides) slideIndex = 0;
  else if (index < 0) slideIndex = totalSlides - 1;
  else slideIndex = index;

  const slideWidth = document.querySelector('.slider').clientWidth;
  const offset = -slideIndex * slideWidth;
  slidesContainer.style.transform = `translateX(${offset}px)`;

  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[slideIndex]) dots[slideIndex].classList.add('active');
}

document.querySelector('.prev').addEventListener('click', () => showSlide(slideIndex - 1));
document.querySelector('.next').addEventListener('click', () => showSlide(slideIndex + 1));

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => showSlide(i));
});

window.addEventListener('resize', () => {
  // при изменении ширины пересчитать позицию
  showSlide(slideIndex);
});

showSlide(slideIndex);
setInterval(() => showSlide(slideIndex + 1), 6000);

  document.getElementById("enter-site-btn").addEventListener("click", function () {
    document.getElementById("splash-screen").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("splash-screen").style.display = "none";
    }, 1000); // Совпадает с CSS transition
  });

