// === ИНИЦИАЛИЗАЦИЯ ===
document.addEventListener('DOMContentLoaded', function() {
    initWebsite();
});

function initWebsite() {
    setupNavigation();
    setupForms();
    setupModal();
    setupProgressBar();
    setupMobileMenu();
    
    console.log('CreateX Construction Bureau website initialized');
}

// === НАВИГАЦИЯ ===
function setupNavigation() {
    // Навигация по меню
    document.querySelectorAll('[data-page]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.dataset.page;
            scrollToPage(pageId);
            closeMobileMenu();
        });
    });
}

function scrollToPage(pageId) {
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        const headerHeight = 80;
        const targetPosition = targetPage.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// === ПРОГРЕСС-БАР ===
function setupProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;
    
    function updateProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (documentHeight > 0) {
            const scrollPercent = (scrollTop / documentHeight) * 100;
            progressBar.style.height = `${Math.min(100, scrollPercent)}%`;
        }
    }
    
    // Обновляем при скролле
    window.addEventListener('scroll', updateProgress);
    
    // Инициализируем начальное значение
    updateProgress();
}

// === ФОРМЫ ===
function setupForms() {
    // Обработка всех форм
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this);
        });
    });
    
    // Обработка подписки
    document.querySelectorAll('.subscribe-action-btn, .newsletter-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handleSubscription(this);
        });
    });
}

function handleFormSubmit(form) {
    // Проверяем обязательные поля
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });
    
    if (isValid) {
        // Имитация отправки
        alert('Thank you! Your message has been sent successfully.');
        form.reset();
    } else {
        alert('Please fill in all required fields marked with *');
    }
}

function handleSubscription(button) {
    let emailField;
    
    // Находим поле email
    if (button.classList.contains('subscribe-action-btn')) {
        emailField = button.parentElement.querySelector('.subscribe-email-field');
    } else if (button.classList.contains('newsletter-btn')) {
        emailField = document.querySelector('.newsletter-input');
    }
    
    if (emailField) {
        const email = emailField.value.trim();
        
        if (!email) {
            alert('Please enter your email address');
            emailField.focus();
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            emailField.focus();
            return;
        }
        
        alert('Thank you for subscribing to our newsletter!');
        emailField.value = '';
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// === МОДАЛЬНОЕ ОКНО ===
function setupModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const openModalButtons = document.querySelectorAll('.open-modal');
    
    if (!modalOverlay) return;
    
    // Открытие модального окна
    openModalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            modalOverlay.classList.add('active');
        });
    });
    
    // Закрытие модального окна
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modalOverlay.classList.remove('active');
        });
    }
    
    // Закрытие по клику на оверлей
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            modalOverlay.classList.remove('active');
        }
    });
}

// === МОБИЛЬНОЕ МЕНЮ ===
function setupMobileMenu() {
    const burgerBtn = document.getElementById('burger-btn');
    const mainNav = document.getElementById('main-nav');
    
    if (!burgerBtn || !mainNav) return;
    
    burgerBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-item a').forEach(link => {
        link.addEventListener('click', function() {
            burgerBtn.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });
    
    // Закрытие при клике вне меню
    document.addEventListener('click', function(e) {
        if (!mainNav.contains(e.target) && !burgerBtn.contains(e.target) && mainNav.classList.contains('active')) {
            burgerBtn.classList.remove('active');
            mainNav.classList.remove('active');
        }
    });
}

function closeMobileMenu() {
    const burgerBtn = document.getElementById('burger-btn');
    const mainNav = document.getElementById('main-nav');
    
    if (burgerBtn && mainNav) {
        burgerBtn.classList.remove('active');
        mainNav.classList.remove('active');
    }
}

// === ОБНОВЛЕНИЕ АКТИВНОГО МЕНЮ ===
window.addEventListener('scroll', function() {
    updateActiveMenu();
});

function updateActiveMenu() {
    const sections = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-item a[data-page]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.dataset.page === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}