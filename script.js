// Inicialización obligatoria de efectos AOS
AOS.init({
    duration: 1000,
    once: true,
});

document.addEventListener('DOMContentLoaded', () => {

    // 1. CONTROL DE EFECTO PARALLAX SUTIL
    const parallaxBg = document.querySelector('.parallax-bg');
    const parallaxBg2 = document.querySelector('.parallax-bg-2');

    window.addEventListener('scroll', () => {
        let offset = window.pageYOffset;
        
        if(parallaxBg) {
            parallaxBg.style.transform = `translateY(${offset * 0.4}px)`;
        }
        
        if(parallaxBg2) {
            const section = document.querySelector('#capturas');
            if(section) {
                let sectionTop = section.offsetTop;
                if(offset > sectionTop - window.innerHeight) {
                    parallaxBg2.style.transform = `translateY(${(offset - sectionTop) * 0.15}px)`;
                }
            }
        }
    });

    // 2. CAMBIO DE CLASE NAVBAR AL SCROLL
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (navbar && window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else if (navbar) {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. LOGICA DEL CARRUSEL (Protegida para que no rompa el menú si no existe el carrusel)
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    
    if (slider && slides.length > 0 && prevBtn && nextBtn) {
        let counter = 0;

        const moveSlider = () => {
            const size = slides[0].clientWidth;
            slider.style.transform = `translateX(${-size * counter}px)`;
        }

        nextBtn.addEventListener('click', () => {
            if (counter >= slides.length - 1) counter = -1;
            counter++;
            moveSlider();
        });

        prevBtn.addEventListener('click', () => {
            if (counter <= 0) counter = slides.length;
            counter--;
            moveSlider();
        });

        // Auto-avance cada 5 segundos
        setInterval(() => {
            if(nextBtn) nextBtn.click();
        }, 5000);

        window.addEventListener('resize', moveSlider);
    }

    // 4. MENÚ COLAPSABLE EN MÓVILES (Totalmente operativo)
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const menuLinks = document.querySelectorAll('.nav-links a');

    if (mobileMenu && navLinks) {
        // Abre y cierra el menú al presionar las tres barras
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            mobileMenu.classList.toggle('toggle');
        });

        // Cierra el menú automáticamente cuando el usuario hace clic en una opción
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                mobileMenu.classList.remove('toggle');
            });
        });
    }

    // 5. EFECTO ONDA EN LOS BOTONES (RIPPLE EFFECT)
    const rippleButtons = document.querySelectorAll('.ripple');
    rippleButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;

            let ripples = document.createElement('span');
            ripples.classList.add('ripple-effect');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            this.appendChild(ripples);

            setTimeout(() => ripples.remove(), 600);
        });
    });
});
