document.addEventListener('DOMContentLoaded', function() {
    const modoOscuroBtn = document.getElementById('modo-oscuro');
    const body = document.body;

    // Verifica si el modo oscuro está guardado en localStorage
    if (localStorage.getItem('modoOscuro') === 'true') {
        body.classList.add('dark-mode');
        modoOscuroBtn.textContent = '☀️';
    }

    modoOscuroBtn.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            modoOscuroBtn.textContent = '☀️';
            localStorage.setItem('modoOscuro', 'true');
        } else {
            modoOscuroBtn.textContent = '🌙';
            localStorage.setItem('modoOscuro', 'false');
        }
    });

    // Animación de aparición para los elementos al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.servicio, .campo').forEach(el => {
        observer.observe(el);
    });

    // Animación suave para los campos del formulario
    const campos = document.querySelectorAll('.campo');
    campos.forEach((campo, index) => {
        campo.style.opacity = '0';
        campo.style.transform = 'translateY(20px)';
        setTimeout(() => {
            campo.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            campo.style.opacity = '1';
            campo.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Animación al entrar en el campo
    campos.forEach(campo => {
        const input = campo.querySelector('input, textarea');
        input.addEventListener('focus', () => {
            campo.style.transform = 'scale(1.05)';
            campo.style.transition = 'transform 0.3s ease';
        });
        input.addEventListener('blur', () => {
            campo.style.transform = 'scale(1)';
        });
    });

    // Efecto de escritura para las etiquetas
    campos.forEach(campo => {
        const label = campo.querySelector('label');
        const texto = label.textContent;
        label.textContent = '';
        
        function escribirTexto(index) {
            if (index < texto.length) {
                label.textContent += texto[index];
                setTimeout(() => escribirTexto(index + 1), 50);
            }
        }

        campo.addEventListener('transitionend', () => {
            if (campo.classList.contains('visible')) {
                setTimeout(() => escribirTexto(0), 300);
            }
        }, { once: true });
    });

    // Efecto parallax en el hero
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
});