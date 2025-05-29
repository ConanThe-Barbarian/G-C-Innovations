document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const menuBtn = document.querySelector('.menu-mobile');
    const nav = document.querySelector('.navegacao');
    
    menuBtn.addEventListener('click', function() {
        nav.classList.toggle('ativo');
        this.setAttribute('aria-expanded', nav.classList.contains('ativo'));
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.navegacao a').forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('ativo');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Filtro de Projetos
    const filtros = document.querySelectorAll('.filtro');
    const projetos = document.querySelectorAll('.projeto-card');
    
    if (filtros.length > 0) {
        filtros.forEach(filtro => {
            filtro.addEventListener('click', function() {
                // Remove a classe ativo de todos os filtros
                filtros.forEach(f => f.classList.remove('ativo'));
                
                // Adiciona a classe ativo ao filtro clicado
                this.classList.add('ativo');
                
                const categoria = this.dataset.categoria;
                
                // Filtra os projetos
                projetos.forEach(projeto => {
                    if (categoria === 'todos' || projeto.dataset.categoria === categoria) {
                        projeto.style.display = 'block';
                    } else {
                        projeto.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação ao rolar
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.projeto-card, .sobre-conteudo, .form-contato, .membro-equipe');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configura animações iniciais
    const animatedElements = document.querySelectorAll('.projeto-card, .sobre-conteudo, .form-contato, .membro-equipe');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executa uma vez ao carregar
    
    // Validação do formulário
    const form = document.querySelector('.form-contato');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if