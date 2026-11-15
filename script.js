document.addEventListener('DOMContentLoaded', () => {
    // --- Burger Menu Toggle ---
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav__link');

    function toggleMenu() {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }

    burger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // --- Sticky Header Scroll Effect ---
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Phone Mask Formatting Helper ---
    const phoneInput = document.getElementById('phone');
    
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('7') || value.startsWith('8')) {
            value = value.substring(1);
        }
        let formatted = '+7 ';
        if (value.length > 0) {
            formatted += '(' + value.substring(0, 3);
        }
        if (value.length >= 3) {
            formatted += ') ' + value.substring(3, 6);
        }
        if (value.length >= 6) {
            formatted += '-' + value.substring(6, 8);
        }
        if (value.length >= 8) {
            formatted += '-' + value.substring(8, 10);
        }
        e.target.value = value.length === 0 ? '' : formatted;
    });

    // --- Form Validation & Simulated Submission ---
    const form = document.getElementById('feedbackForm');
    const nameInput = document.getElementById('name');
    const guestsInput = document.getElementById('guests');
    const privacyCheckbox = document.getElementById('privacy');
    const successMessage = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');

    function validateField(input, condition) {
        const group = input.closest('.form__group') || input.parentElement;
        if (!condition) {
            group.classList.add('has-error');
            input.classList.add('error');
            return false;
        } else {
            group.classList.remove('has-error');
            input.classList.remove('error');
            return true;
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNameValid = validateField(nameInput, nameInput.value.trim().length >= 2);
        
        const rawPhone = phoneInput.value.replace(/\D/g, '');
        const isPhoneValid = validateField(phoneInput, rawPhone.length >= 10);
        
        const guestsVal = parseInt(guestsInput.value);
        const isGuestsValid = validateField(guestsInput, !isNaN(guestsVal) && guestsVal >= 1 && guestsVal <= 50);

        const isPrivacyValid = validateField(privacyCheckbox, privacyCheckbox.checked);

        if (isNameValid && isPhoneValid && isGuestsValid && isPrivacyValid) {
            // --- DEMONSTRATION SUBMISSION VIA JAVASCRIPT ---
            // NOTE: Бэкенд не предусмотрен. Для реальной отправки подключите этот блок
            // к вашему API, например: fetch('/api/booking', { method: 'POST', body: ... })
            
            submitBtn.textContent = 'ОТПРАВКА...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = 'ОСТАВИТЬ ЗАЯВКУ';
                submitBtn.disabled = false;
                successMessage.style.display = 'block';
                form.reset();

                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 6000);
            }, 1000);
        }
    });

    // Real-time error clearing on input
    [nameInput, phoneInput, guestsInput, privacyCheckbox].forEach(element => {
        element.addEventListener('input', () => {
            if (element.classList.contains('error')) {
                element.classList.remove('error');
                const group = element.closest('.form__group') || element.parentElement;
                group.classList.remove('has-error');
            }
        });
        element.addEventListener('change', () => {
            if (element.classList.contains('error')) {
                element.classList.remove('error');
                const group = element.closest('.form__group') || element.parentElement;
                group.classList.remove('has-error');
            }
        });
    });

    // Privacy policy link stub
    const privacyLink = document.getElementById('privacyLink');
    privacyLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Политика конфиденциальности: здесь будет размещен документ после утверждения.');
    });
});
