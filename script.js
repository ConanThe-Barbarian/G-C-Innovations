document.addEventListener('DOMContentLoaded', function() {
    // 1. Inicialize o EmailJS
    emailjs.init('yaWxoI7M1-jCPgUwM');

    // 2. Menu Mobile
    const menuBtn = document.querySelector('.menu-mobile');
    const nav = document.querySelector('.navegacao');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('ativo');
            this.setAttribute('aria-expanded', nav.classList.contains('ativo'));
        });
        
        document.querySelectorAll('.navegacao a').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('ativo');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // 3. Dados dos projetos
    const projetosData = [
        {
            titulo: "Lollapalooza",
            categoria: "web",
            subtitulo: "Processamento de dados",
            tag: "Big Data",
            descricao: "Desenvolvemos um ingestor de dados para o Lollapalooza, um dos maiores eventos da América Latina, capaz de processar milhões de interações em tempo real e fornecer insights valiosos para os organizadores.",
            tecnologias: ["Kafka", "AWS", "Python"],
            link: "#"
        },
        {
            titulo: "Rock in Rio",
            categoria: "web",
            subtitulo: "Sistema de ingressos",
            tag: "Plataforma Web",
            descricao: "Desenvolvimento de plataforma de vendas de ingressos com sistema antifraude e gestão de lotes para o maior festival de música do Brasil.",
            tecnologias: ["React", "Node.js", "MongoDB"],
            link: "#"
        },
        {
            titulo: "Carnaval",
            categoria: "mobile",
            subtitulo: "Aplicativo mobile",
            tag: "Eventos",
            descricao: "Aplicativo para gestão de blocos de carnaval com mapas interativos, programação personalizada e sistema de alertas em tempo real.",
            tecnologias: ["Flutter", "Firebase", "Dart"],
            link: "#"
        },
        {
            titulo: "Tomorrowland",
            categoria: "design",
            subtitulo: "Design de Experiência",
            tag: "UX/UI",
            descricao: "Redesign completo da plataforma digital do festival, focando em melhorar a experiência do usuário e aumentar as conversões de venda de ingressos.",
            tecnologias: ["Figma", "Adobe XD", "Sketch"],
            link: "#"
        },
        {
            titulo: "Ultra Music",
            categoria: "mobile",
            subtitulo: "App Oficial",
            tag: "Eventos",
            descricao: "Desenvolvimento do aplicativo oficial do festival com programação personalizável, mapas 3D do evento e sistema de notificações push.",
            tecnologias: ["React Native", "GraphQL", "Node.js"],
            link: "#"
        }
    ];

    // 4. Carrossel Dinâmico
    const carrosselContainer = document.querySelector('.carrossel-container');
    const carrosselProjetos = document.getElementById('carrossel-projetos');
    const filtros = document.querySelectorAll('.filtro');

    if (carrosselContainer && carrosselProjetos && filtros.length > 0) {
        // Função para renderizar projetos
        function renderizarProjetos(categoria = 'todos') {
            carrosselProjetos.innerHTML = '';
            
            const projetosFiltrados = categoria === 'todos' 
                ? projetosData 
                : projetosData.filter(p => p.categoria === categoria);
            
            projetosFiltrados.forEach(projeto => {
                const projetoHTML = `
                    <article class="event-panel" data-categoria="${projeto.categoria}">
                        <div class="title-section">
                            <h1 class="event-title">${projeto.titulo}</h1>
                        </div>
                        <div class="content-section">
                            <div class="subtitle-container">
                                <div class="subtitle">${projeto.subtitulo}</div>
                                <div class="subtitle small">${projeto.tag}</div>
                            </div>
                            <p class="description">${projeto.descricao}</p>
                            <div class="action-row">
                                <div class="tech-container">
                                    ${projeto.tecnologias.map(tech => 
                                        `<span class="tech-badge">${tech}</span>`
                                    ).join('')}
                                </div>
                                <a href="${projeto.link}" class="visit-button">Visitar site</a>
                            </div>
                        </div>
                    </article>
                `;
                carrosselProjetos.insertAdjacentHTML('beforeend', projetoHTML);
            });
        }

        // Configura filtros
        filtros.forEach(filtro => {
            filtro.addEventListener('click', function() {
                filtros.forEach(f => f.classList.remove('ativo'));
                this.classList.add('ativo');
                renderizarProjetos(this.dataset.categoria);
            });
        });

        // Navegação do carrossel
        const btnPrev = document.querySelector('.carrossel-btn.prev');
        const btnNext = document.querySelector('.carrossel-btn.next');
        
        if (btnPrev && btnNext) {
            btnPrev.addEventListener('click', () => {
                carrosselProjetos.scrollBy({ left: -730, behavior: 'smooth' });
            });
            
            btnNext.addEventListener('click', () => {
                carrosselProjetos.scrollBy({ left: 730, behavior: 'smooth' });
            });
        }

        // Renderiza projetos inicialmente
        renderizarProjetos();
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
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // 7. Formulário de Contato
    const form = document.querySelector('.form-contato');
    if (form) {
        if (!form.querySelector('.form-status')) {
            const statusDiv = document.createElement('div');
            statusDiv.className = 'form-status';
            form.appendChild(statusDiv);
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            form.classList.add('sending');
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;

            const formData = {
                from_name: form.querySelector('input[type="text"]').value.trim(),
                from_email: form.querySelector('input[type="email"]').value.trim(),
                message: form.querySelector('textarea').value.trim(),
                _subject: 'Novo contato do site G&C Innovations'
            };
            
            if (!formData.from_name || !formData.from_email || !formData.message) {
                showFormMessage(form, 'Por favor, preencha todos os campos!', 'error');
                form.classList.remove('sending');
                if (submitBtn) submitBtn.disabled = false;
                return;
            }

            emailjs.send('service_G&C', 'template_lq55hv6', formData)
                .then(() => {
                    showFormMessage(form, 'Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                    form.reset();
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
                    showFormMessage(form, `Erro: ${error.text || 'Tente novamente ou nos contate por WhatsApp'}`, 'error');
                })
                .finally(() => {
                    form.classList.remove('sending');
                    if (submitBtn) submitBtn.disabled = false;
                });
        });
    }

    function showFormMessage(form, message, type) {
        const statusDiv = form.querySelector('.form-status');
        if (statusDiv) {
            statusDiv.textContent = message;
            statusDiv.className = `form-status ${type}-message`;
            statusDiv.style.display = 'block';
            statusDiv.style.animation = 'fadeInUp 0.5s ease-out';
        }
    }
});