
(function() {
    function initMobileMenu() {
        const toggle = document.getElementById('menuToggle');
        const nav    = document.querySelector('.navegacao');
        const overlay = document.getElementById('navOverlay');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', function() {
            const aberto = nav.classList.toggle('aberta');
            toggle.classList.toggle('aberto', aberto);
            if (overlay) overlay.classList.toggle('visivel', aberto);
            document.body.style.overflow = aberto ? 'hidden' : '';
        });

        if (overlay) {
            overlay.addEventListener('click', fechar);
        }

        
        document.querySelectorAll('.dropdown > .nav-link').forEach(function(link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 900) {
                    e.preventDefault();
                    const dd = link.closest('.dropdown');
                    dd.classList.toggle('dropdown-aberto');
                }
            });
        });

        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 900) fechar();
        });

        function fechar() {
            nav.classList.remove('aberta');
            toggle.classList.remove('aberto');
            if (overlay) overlay.classList.remove('visivel');
            document.body.style.overflow = '';
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
})();
