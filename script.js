document.addEventListener('DOMContentLoaded', function() {
    // 1. Inicialize o EmailJS com sua chave pública
    emailjs.init('yaWxoI7M1-jCPgUwM');

    // 2. Menu Mobile
    const menuBtn = document.querySelector('.menu-mobile');
    const nav = document.querySelector('.navegacao');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('ativo');
            this.setAttribute('aria-expanded', nav.classList.contains('ativo'));
        });
        
        // 3. Fechar menu ao clicar em links
        document.querySelectorAll('.navegacao a').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('ativo');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // 4. Filtro de Projetos com Carrossel Horizontal (VERSÃO ATUALIZADA)
    const filtros = document.querySelectorAll('.filtro');
    const carrosselContainer = document.querySelector('.carrossel-projetos');
    const projetos = document.querySelectorAll('.projeto-card');
    
    if (filtros.length > 0 && carrosselContainer && projetos.length > 0) {
        // Organiza os projetos por categoria
        const projetosPorCategoria = {
            todos: Array.from(projetos),
            web: Array.from(projetos).filter(p => p.dataset.categoria === 'web'),
            design: Array.from(projetos).filter(p => p.dataset.categoria === 'design'),
            mobile: Array.from(projetos).filter(p => p.dataset.categoria === 'mobile')
        };
        
        // Cria botões de navegação
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carrossel-btn prev';
        prevBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>';
        prevBtn.setAttribute('aria-label', 'Projetos anteriores');
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'carrossel-btn next';
        nextBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>';
        nextBtn.setAttribute('aria-label', 'Próximos projetos');
        
        carrosselContainer.parentElement.insertBefore(prevBtn, carrosselContainer);
        carrosselContainer.parentElement.insertBefore(nextBtn, carrosselContainer.nextSibling);
        
        // Cria indicadores
        const indicadoresContainer = document.createElement('div');
        indicadoresContainer.className = 'carrossel-indicadores';
        carrosselContainer.parentElement.appendChild(indicadoresContainer);
        
        // Função para atualizar indicadores
        function atualizarIndicadores(projetos) {
            indicadoresContainer.innerHTML = '';
            const numIndicadores = Math.ceil(projetos.length / 3); // 3 projetos visíveis por vez
            
            for (let i = 0; i < numIndicadores; i++) {
                const indicador = document.createElement('div');
                indicador.className = 'carrossel-indicador';
                indicador.setAttribute('aria-label', `Ir para grupo de projetos ${i+1}`);
                if (i === 0) indicador.classList.add('ativo');
                
                indicador.addEventListener('click', () => {
                    const scrollPos = i * (300 + 30) * 3; // Largura do card + gap
                    carrosselContainer.scrollTo({
                        left: scrollPos,
                        behavior: 'smooth'
                    });
                    
                    document.querySelectorAll('.carrossel-indicador').forEach(ind => ind.classList.remove('ativo'));
                    indicador.classList.add('ativo');
                });
                
                indicadoresContainer.appendChild(indicador);
            }
        }
        
        // Navegação do carrossel
        prevBtn.addEventListener('click', () => {
            carrosselContainer.scrollBy({
                left: -330, // Largura do card + gap
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', () => {
            carrosselContainer.scrollBy({
                left: 330, // Largura do card + gap
                behavior: 'smooth'
            });
        });
        
        // Atualiza indicadores quando o scroll acontece
        let isScrolling;
        carrosselContainer.addEventListener('scroll', () => {
            // Limpa o timeout anterior
            clearTimeout(isScrolling);
            
            // Configura um novo timeout
            isScrolling = setTimeout(() => {
                const scrollPos = carrosselContainer.scrollLeft;
                const cardWidth = 330; // Largura do card + gap
                const activeIndex = Math.round(scrollPos / cardWidth);
                
                document.querySelectorAll('.carrossel-indicador').forEach((ind, index) => {
                    ind.classList.toggle('ativo', index === activeIndex);
                });
            }, 100); // Atraso para melhor performance
        });
        
        filtros.forEach(filtro => {
            filtro.addEventListener('click', function() {
                // Atualiza o filtro ativo
                filtros.forEach(f => f.classList.remove('ativo'));
                this.classList.add('ativo');
                
                const categoria = this.dataset.categoria;
                const projetosFiltrados = projetosPorCategoria[categoria];
                
                // Limpa o container
                carrosselContainer.innerHTML = '';
                
                // Adiciona apenas os projetos filtrados
                projetosFiltrados.forEach(projeto => {
                    const clone = projeto.cloneNode(true);
                    clone.style.animation = 'fadeIn 0.5s ease-out forwards'; // Mantém a animação
                    carrosselContainer.appendChild(clone);
                });
                
                // Atualiza indicadores
                atualizarIndicadores(projetosFiltrados);
                
                // Rola para o início
                carrosselContainer.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            });
        });
        
        // Mostra 1 de cada categoria inicialmente (em "Todos")
        if (document.querySelector('.filtro.ativo')?.dataset.categoria === 'todos') {
            const projetosUnicos = [];
            const categoriasMostradas = new Set();
            
            projetos.forEach(projeto => {
                const categoria = projeto.dataset.categoria;
                if (!categoriasMostradas.has(categoria)) {
                    categoriasMostradas.add(categoria);
                    projetosUnicos.push(projeto.cloneNode(true));
                }
            });
            
            carrosselContainer.innerHTML = '';
            projetosUnicos.forEach(projeto => {
                const clone = projeto.cloneNode(true);
                clone.style.animation = 'fadeIn 0.5s ease-out forwards'; // Mantém a animação
                carrosselContainer.appendChild(clone);
            });
            
            atualizarIndicadores(projetosUnicos);
        } else {
            atualizarIndicadores(projetos);
        }
    }
    
    // 5. Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 6. Animação ao rolar
    const animateOnScroll = () => {
        document.querySelectorAll('.projeto-card, .sobre-conteudo, .form-contato, .membro-equipe').forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight / 1.2) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // 7. Configura animações iniciais
    document.querySelectorAll('.projeto-card, .sobre-conteudo, .form-contato, .membro-equipe').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // 8. Formulário de Contato - VERSÃO ATUALIZADA COM ANIMAÇÕES
    const form = document.querySelector('.form-contato');
    if (form) {
        // Cria elementos de feedback se não existirem
        if (!form.querySelector('.form-status')) {
            const statusDiv = document.createElement('div');
            statusDiv.className = 'form-status';
            form.appendChild(statusDiv);
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Adiciona estado de carregamento
            form.classList.add('sending');
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
            }

            const formData = {
                from_name: form.querySelector('input[type="text"]').value.trim(),
                from_email: form.querySelector('input[type="email"]').value.trim(),
                message: form.querySelector('textarea').value.trim(),
                _subject: 'Novo contato do site G&C Innovations'
            };
            
            // Validação dos campos
            if (!formData.from_name || !formData.from_email || !formData.message) {
                showFormMessage(form, 'Por favor, preencha todos os campos!', 'error');
                form.classList.remove('sending');
                if (submitBtn) submitBtn.disabled = false;
                return;
            }

            // Envia o formulário
            emailjs.send('service_G&C', 'template_lq55hv6', formData)
                .then(() => {
                    showFormMessage(form, 'Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                    form.reset();
                    
                    // Remove a mensagem após 5 segundos
                    setTimeout(() => {
                        const statusDiv = form.querySelector('.form-status');
                        if (statusDiv) {
                            statusDiv.style.display = 'none';
                            statusDiv.textContent = '';
                            statusDiv.className = 'form-status';
                        }
                    }, 5000);
                })
                .catch(error => {
                    console.error('Erro detalhado:', error);
                    showFormMessage(form, `Erro: ${error.text || 'Tente novamente ou nos contate por WhatsApp'}`, 'error');
                })
                .finally(() => {
                    form.classList.remove('sending');
                    if (submitBtn) submitBtn.disabled = false;
                });
        });
    }

    // Função auxiliar para mostrar mensagens no formulário
    function showFormMessage(form, message, type) {
        const statusDiv = form.querySelector('.form-status');
        if (statusDiv) {
            statusDiv.textContent = message;
            statusDiv.className = `form-status ${type}-message`;
            statusDiv.style.display = 'block';
            
            // Adiciona animação
            statusDiv.style.animation = 'fadeInUp 0.5s ease-out';
        }
    }
});