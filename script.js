
// ---------- МОДАЛКИ ----------
document.querySelectorAll('.open-modal').forEach(button => {
  button.addEventListener('click', () => {
    const modalId = button.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'block';
  });
});

document.querySelectorAll('.modal .close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    const modal = closeBtn.closest('.modal');
    if (modal) modal.style.display = 'none';
  });
});

window.addEventListener('click', (event) => {
  document.querySelectorAll('.modal').forEach(modal => {
    if (event.target === modal) modal.style.display = 'none';
  });
});

// ---------- СЛАЙДЕР ----------
let slideIndex = 0;
const slidesContainer = document.querySelector('.slides');
const slides = document.querySelectorAll('.slides img');
const dots = document.querySelectorAll('.dot');
const totalSlides = Math.min(slides.length, 5);

function showSlide(index) {
  if (index >= totalSlides) slideIndex = 0;
  else if (index < 0) slideIndex = totalSlides - 1;
  else slideIndex = index;

  const slideWidth = document.querySelector('.slider').clientWidth;
  slidesContainer.style.transform = `translateX(${-slideIndex * slideWidth}px)`;

  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[slideIndex]) dots[slideIndex].classList.add('active');
}

document.querySelector('.prev').addEventListener('click', () => showSlide(slideIndex - 1));
document.querySelector('.next').addEventListener('click', () => showSlide(slideIndex + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
window.addEventListener('resize', () => showSlide(slideIndex));
showSlide(slideIndex);
setInterval(() => showSlide(slideIndex + 1), 6000);

// ---------- ЗАСТАВКА ----------
document.getElementById("enter-site-btn").addEventListener("click", function () {
  document.getElementById("splash-screen").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("splash-screen").style.display = "none";
    document.getElementById("registration-form").style.display = "flex";
  }, 1000);
});



// ---------- ПРОФИЛЬ ----------
function toggleProfile() {
  const popup = document.getElementById('profile-popup');
  popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}

function saveProfile() {
  const name = document.getElementById('profile-name').value;
  const file = document.getElementById('upload-avatar').files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      document.getElementById('profile-pic').src = reader.result;
      document.getElementById('profile-icon').querySelector('img').src = reader.result;
    };
    reader.readAsDataURL(file);
  }
  alert('Имя обновлено: ' + name);
}

// ---------- НОВЫЙ ЧАТ ----------
document.getElementById('chat-button').addEventListener('click', function () {
  const popup = document.getElementById('chat-popup');
  popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'flex' : 'none';
});

document.getElementById('chat-send').addEventListener('click', function () {
  const msg = document.getElementById('chat-text').value.trim();
  const file = document.getElementById('chat-image').files[0];
  const messages = document.getElementById('chat-messages');

  if (msg) {
    const div = document.createElement('div');
    div.classList.add('chat-message');
    div.innerHTML = `
      ${msg}
      <div class="emoji-reactions">
        <span>👍</span><span>👎</span><span>😊</span>
      </div>
    `;
    messages.appendChild(div);
    document.getElementById('chat-text').value = '';
  }

  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      const img = document.createElement('img');
      img.src = reader.result;
      img.style.maxWidth = '100%';
      img.style.marginTop = '5px';
      messages.appendChild(img);
    };
    reader.readAsDataURL(file);
    document.getElementById('chat-image').value = '';
  }

  // Назначение реакций
  setTimeout(() => {
    document.querySelectorAll('.emoji-reactions span').forEach(span => {
      span.addEventListener('click', function () {
        const container = this.parentElement;
        container.querySelectorAll('span').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }, 50);
});

// ---------- АВТОСБРОС ЧАТА В 20:00 ----------
function checkChatReset() {
  const lastReset = localStorage.getItem('lastChatReset');
  const now = new Date();
  const kyivOffset = 3 * 60; // UTC+3
  const nowMinutes = now.getUTCHours() * 60 + now.getUTCMinutes() + kyivOffset;
  const targetMinutes = 20 * 60;

  if (!lastReset || new Date(lastReset).toDateString() !== now.toDateString()) {
    if (nowMinutes >= targetMinutes) {
      document.getElementById('chat-messages').innerHTML = '';
      localStorage.setItem('lastChatReset', now.toISOString());
    }
  }
}
setInterval(checkChatReset, 60000);

// ---------- СМЕНА ИКОНКИ ЧАТА ----------
document.getElementById('chat-icon-input').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      document.getElementById('chat-button').style.backgroundImage = `url(${event.target.result})`;
    };
    reader.readAsDataURL(file);
  }
});
function showRegistrationIfNeeded() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    document.getElementById("registration-form").style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registration-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const registerBtn = document.getElementById("register-btn");
  const message = document.getElementById("login-message");

  // Показываем форму, если пользователь не вошёл
  if (!localStorage.getItem("currentUser")) {
    form.style.display = "block";
  }

  registerBtn.addEventListener("click", function () {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
      message.textContent = "Введите имя и пароль.";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[username]) {
      if (users[username] === password) {
        // Успешный вход
        localStorage.setItem("currentUser", username);
        message.style.color = "green";
        message.textContent = "Вход выполнен!";
        form.style.display = "none";
      } else {
        // Пароль не совпадает
        message.textContent = "Неверный пароль для этого имени.";
      }
    } else {
      // Новый пользователь
      users[username] = password;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", username);
      message.style.color = "green";
      message.textContent = "Регистрация прошла успешно!";
      form.style.display = "none";
    }
  });
});

// бед варс
const imgModal = document.getElementById('imgModal');
const imgInModal = document.getElementById('imgInModal');
const closeImg = document.getElementById('closeImg');

// Открытие картинки
document.querySelectorAll('.open-image').forEach(img => {
    img.addEventListener('click', () => {
        imgInModal.src = img.src;
        imgModal.style.display = 'block';
    });
});

// Закрытие по крестику
closeImg.onclick = () => {
    imgModal.style.display = 'none';
};

// Закрытие по фону
imgModal.addEventListener('click', (e) => {
    if (e.target === imgModal) {
        imgModal.style.display = 'none';
    }
});

//pvp
// Получаем элементы модального окна
const pvpImgModal = document.getElementById('pvpImgModal');
const pvpImgInModal = document.getElementById('pvpImgInModal');
const pvpCloseImg = document.getElementById('pvpCloseImg');

// Навешиваем обработчики на миниатюры
document.querySelectorAll('.pvp-thumb').forEach(img => {
    img.addEventListener('click', () => {
        pvpImgInModal.src = img.src;
        pvpImgModal.style.display = 'block';
    });
});

// Закрываем модалку при клике на крестик
pvpCloseImg.addEventListener('click', () => {
    pvpImgModal.style.display = 'none';
});

// Также закрытие модалки при клике вне картинки (опционально)
pvpImgModal.addEventListener('click', (e) => {
    if (e.target === pvpImgModal) {
        pvpImgModal.style.display = 'none';
    }
});


//sbaveh
// Открытие modal6 - добавь, если у тебя есть кнопка для открытия modal6, например с data-modal="modal6"
document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        if(modalId === 'modal6') {
            document.getElementById('modal6').style.display = 'block';
        }
    });
});

// Закрытие modal6
document.querySelectorAll('#modal6 .close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        document.getElementById('modal6').style.display = 'none';
    });
});

// Клики по миниатюрам в modal6 — открыть увеличенное фото
document.querySelectorAll('.img6-thumb').forEach(img => {
    img.addEventListener('click', () => {
        const modal = document.getElementById('imgModal6');
        const imgInModal = document.getElementById('imgInModal6');
        imgInModal.src = img.src;
        modal.style.display = 'block';
    });
});

// Закрытие увеличенного фото modal6
document.getElementById('closeImg6').addEventListener('click', () => {
    document.getElementById('imgModal6').style.display = 'none';
});

// Закрытие модалок при клике вне контента
window.addEventListener('click', (event) => {
    const modal6 = document.getElementById('modal6');
    const imgModal6 = document.getElementById('imgModal6');
    if (event.target === modal6) {
        modal6.style.display = 'none';
    }
    if (event.target === imgModal6) {
        imgModal6.style.display = 'none';
    }
});


// Открытие  как зайди на сервер
// Скрипт для показа увеличенного фото в отдельном модальном окне
const imgThumbs8 = document.querySelectorAll('.img8-thumb');
const imgModal8 = document.getElementById('imgModal8');
const imgInModal8 = document.getElementById('imgInModal8');
const closeImg8 = document.getElementById('closeImg8');

imgThumbs8.forEach(img => {
  img.addEventListener('click', () => {
    imgModal8.style.display = 'flex';
    imgInModal8.src = img.src;
  });
});

closeImg8.addEventListener('click', () => {
  imgModal8.style.display = 'none';
});

// Закрытие по клику вне картинки
imgModal8.addEventListener('click', (e) => {
  if (e.target === imgModal8) {
    imgModal8.style.display = 'none';
  }
});

// как зайди на сервер(если есть)
document.addEventListener('DOMContentLoaded', () => {
  const modal8 = document.getElementById('modal8');
  const closeBtn = modal8.querySelector('.close');
  const showVideoBtn = document.getElementById('show-video-btn');
  const videoContainer = document.getElementById('video-container');
  const linkList = document.getElementById('link-list');
  const youtubeVideo = document.getElementById('youtube-video');

  // Показ видео
  showVideoBtn.addEventListener('click', () => {
    linkList.style.display = 'none';
    videoContainer.style.display = 'block';
    youtubeVideo.src += "?autoplay=1"; // Автовоспроизведение
  });

  // Закрытие
  closeBtn.addEventListener('click', () => {
    youtubeVideo.src = youtubeVideo.src.replace("?autoplay=1", ""); // Останавливаем видео
    videoContainer.style.display = 'none';
    linkList.style.display = 'block';
    modal8.style.display = 'none';
  });

  // Клик вне окна — закрытие
  window.addEventListener('click', (e) => {
    if (e.target === modal8) {
      youtubeVideo.src = youtubeVideo.src.replace("?autoplay=1", "");
      videoContainer.style.display = 'none';
      linkList.style.display = 'block';
      modal8.style.display = 'none';
    }
  });

  // Можно вызвать через window.openModal()
  window.openModal = function() {
    modal8.style.display = 'block';
    linkList.style.display = 'block';
    videoContainer.style.display = 'none';
  };
});
