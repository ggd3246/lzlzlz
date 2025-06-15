// Открытие модального окн
document.querySelectorAll('.open-modal').forEach(button => {
  button.addEventListener('click', () => {
    const modalId = button.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    }
  });
});

// Закрытие по нажатию на крестик
document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    const modal = closeBtn.closest('.modal');
    modal.style.display = 'none';
  });
});

// Закрытие при клике вне модального окна
window.addEventListener('click', (event) => {
  document.querySelectorAll('.modal').forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});
 
let slideIndex = 0;
const slides = document.querySelectorAll('.slides img');
const dots = document.querySelectorAll('.dot');
const totalSlides = Math.min(slides.length, 5); // максимум 5

function showSlide(index) {
  if (index >= totalSlides) slideIndex = 0;
  else if (index < 0) slideIndex = totalSlides - 1;
  else slideIndex = index;

  const offset = -slideIndex * 600;
  document.querySelector('.slides').style.transform = `translateX(${offset}px)`;

  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[slideIndex]) dots[slideIndex].classList.add('active');
}

document.querySelector('.prev').onclick = () => showSlide(slideIndex - 1);
document.querySelector('.next').onclick = () => showSlide(slideIndex + 1);
dots.forEach((dot, i) => dot.onclick = () => showSlide(i));

showSlide(slideIndex);
setInterval(() => showSlide(slideIndex + 1), 6000);

// Поддержка новой модалки с фото
document.querySelectorAll(".open-modal").forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "block";
        }
    });
});

document.querySelectorAll(".modal .close").forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
        const modal = closeBtn.closest(".modal");
        if (modal) {
            modal.style.display = "none";
        }
    });
});

window.addEventListener("click", event => {
    if (event.target.classList.contains("modal")) {
        event.target.style.display = "none";
    }
});
