// Alternar navegação móvel
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const navList = document.querySelector(".nav-list")

if (mobileMenuToggle && navList) {
  mobileMenuToggle.addEventListener("click", () => {
    navList.classList.toggle("active")
    mobileMenuToggle.classList.toggle("active")

    // Animação do menu
    const spans = mobileMenuToggle.querySelectorAll("span")
    if (mobileMenuToggle.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
      spans[1].style.opacity = "0"
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
    } else {
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  })
}

// Fechar menu móvel ao clicar em um link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navList?.classList.remove("active")
    mobileMenuToggle?.classList.remove("active")
  })
})

// Alternar alto contraste
const highContrastBtn = document.getElementById("high-contrast")
if (highContrastBtn) {
  highContrastBtn.addEventListener("click", () => {
    document.body.classList.toggle("high-contrast")

    const icon = highContrastBtn.querySelector("i")
    if (document.body.classList.contains("high-contrast")) {
      highContrastBtn.innerHTML = '<i class="fas fa-adjust"></i> Contraste Normal'
    } else {
      highContrastBtn.innerHTML = '<i class="fas fa-adjust"></i> Alto Contraste'
    }
  })
}

// Rolagem suave para links de âncora
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = document.querySelector(".main-nav").offsetHeight
      const targetPosition = target.offsetTop - headerHeight - 20

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Destaque de navegação ativa
function updateActiveNavigation() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link, .quick-links a")
  const headerHeight = document.querySelector(".main-nav").offsetHeight

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - headerHeight - 50
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
}

window.addEventListener("scroll", updateActiveNavigation)

// Funcionalidade de alternância de semestre
document.querySelectorAll(".semester-header").forEach((header) => {
  header.addEventListener("click", () => {
    const subjectsList = header.nextElementSibling
    const toggleBtn = header.querySelector(".toggle-btn i")

    if (subjectsList.classList.contains("active")) {
      subjectsList.classList.remove("active")
      toggleBtn.style.transform = "rotate(0deg)"
    } else {
      // Fecha todos os outros semestres
      document.querySelectorAll(".subjects-list").forEach((list) => {
        list.classList.remove("active")
      })
      document.querySelectorAll(".toggle-btn i").forEach((btn) => {
        btn.style.transform = "rotate(0deg)"
      })

      // Abrir semestre clicado
      subjectsList.classList.add("active")
      toggleBtn.style.transform = "rotate(180deg)"
    }
  })
})

// Destacar termos de pesquisa
function highlightSearchTerms(term) {
  const content = document.querySelector(".content-area")
  const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, null, false)

  const textNodes = []
  let node

  while ((node = walker.nextNode())) {
    textNodes.push(node)
  }

  textNodes.forEach((textNode) => {
    const parent = textNode.parentNode
    if (parent.tagName !== "SCRIPT" && parent.tagName !== "STYLE") {
      const text = textNode.textContent
      const regex = new RegExp(`(${term})`, "gi")

      if (regex.test(text)) {
        const highlightedText = text.replace(
          regex,
          '<mark style="background: yellow; padding: 2px 4px; border-radius: 3px;">$1</mark>',
        )
        const wrapper = document.createElement("span")
        wrapper.innerHTML = highlightedText
        parent.replaceChild(wrapper, textNode)
      }
    }
  })
}

// Simulação de download de documento
document.querySelectorAll(".download-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation()

    // Adicionar estado de carregamento
    const originalContent = btn.innerHTML
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'
    btn.disabled = true

    // Simulação de download
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i>'
      setTimeout(() => {
        btn.innerHTML = originalContent
        btn.disabled = false
      }, 1000)
    }, 1500)

    // Obter o nome do documento do pai
    const docItem = btn.closest(".document-item")
    const docName = docItem.querySelector("h4").textContent
    console.log("Downloading:", docName)
  })
})

// Interações com itens de assunto
document.querySelectorAll(".subject-item").forEach((item) => {
  item.addEventListener("click", () => {
    // Adicionar efeito de onda
    const ripple = document.createElement("span")
    ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(24, 140, 41, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `

    const rect = item.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = rect.width / 2 - size / 2 + "px"
    ripple.style.top = rect.height / 2 - size / 2 + "px"

    item.style.position = "relative"
    item.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)

    console.log("Subject clicked:", item.textContent.trim())
  })
})

// Animações dos itens de tecnologia do curso
document.querySelectorAll(".tech-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.transform = "translateY(-8px) scale(1.05)"
  })

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translateY(0) scale(1)"
  })
})

// Observador de interseção para animações
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe os elementos para animação
document.querySelectorAll(".info-card, .area-card, .semester-card, .document-category").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Comportamento de navegação fixo
let lastScrollTop = 0
const nav = document.querySelector(".main-nav")

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Rolagem para baixo
    nav.style.transform = "translateY(-100%)"
  } else {
    // Rolagem para cima
    nav.style.transform = "translateY(0)"
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
})

// CSS para estados ativos e animações
const style = document.createElement("style")
style.textContent = `
    .nav-link.active {
        background: var(--primary-green);
    }
    
    .nav-link.active::before {
        width: 100%;
    }
    
    .quick-links a.active {
        color: var(--light-green);
        font-weight: 600;
        padding-left: 12px;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .main-nav {
        transition: transform 0.3s ease;
    }
    
    .semester-card:hover .semester-header {
        background: var(--medium-green);
    }
    
    .document-item:hover .doc-icon {
        transform: scale(1.1);
    }
    
    .hero-visual .code-window {
        animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(-50%) translateX(0); }
        50% { transform: translateY(-50%) translateX(10px); }
    }
    
    .code-line {
        animation: typewriter 3s steps(20) infinite;
    }
    
    @keyframes typewriter {
        0% { opacity: 0.3; }
        50% { opacity: 1; }
        100% { opacity: 0.3; }
    }
    
    .code-line:nth-child(2) { animation-delay: 0.5s; }
    .code-line:nth-child(3) { animation-delay: 1s; }
`
document.head.appendChild(style)

// Inicialização da página
document.addEventListener("DOMContentLoaded", () => {
  updateActiveNavigation()

  // Expansão automática do primeiro semestre
  const firstSemester = document.querySelector(".semester-card .subjects-list")
  const firstToggle = document.querySelector(".semester-card .toggle-btn i")
  if (firstSemester && firstToggle) {
    firstSemester.classList.add("active")
    firstToggle.style.transform = "rotate(180deg)"
  }

  // Adicionar animação de carregamento à página
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"
  }, 100)
})

// Suporte à navegação por teclado
document.addEventListener("keydown", (e) => {
  // A tecla ESC fecha o menu móvel
  if (e.key === "Escape" && navList?.classList.contains("active")) {
    navList.classList.remove("active")
    mobileMenuToggle?.classList.remove("active")
  }

  // Teclas de seta para navegação por semestre
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    const focusedElement = document.activeElement
    if (focusedElement.classList.contains("semester-btn")) {
      e.preventDefault()
      const buttons = Array.from(document.querySelectorAll(".semester-btn"))
      const currentIndex = buttons.indexOf(focusedElement)
      let nextIndex

      if (e.key === "ArrowDown") {
        nextIndex = (currentIndex + 1) % buttons.length
      } else {
        nextIndex = (currentIndex - 1 + buttons.length) % buttons.length
      }

      buttons[nextIndex].focus()
    }
  }
})

function tocarSom(event) {
  event.preventDefault() // não deixa o navegador trocar de página agora

  const audio = document.getElementById("somChat")
  const destino = event.currentTarget.href // guarda para onde vamos redirecionar

  audio.currentTime = 0 // reinicia o som
  audio
    .play()
    .then(() => {
      // Quando o som terminar, redireciona
      audio.onended = () => {
        window.location.href = destino
      }

      // Define um tempo máximo de espera pelo áudio, caso o áudio não conclua (ou não inicie), o redirecionamento é forçado
      setTimeout(() => {
        if (!audio.paused) return // já terminou, não faz nada
        window.location.href = destino
      }, 1000) // 1 segundo de tolerância
    })
    .catch(() => {
      // Se não conseguir tocar o som, vai direto
      window.location.href = destino
    })
}

/* Slider das notícias */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".slider-track")
  const slides = document.querySelectorAll(".news-slide")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")

  let index = 0
  const totalSlides = slides.length

  function updateSlider() {
    track.style.transform = `translateX(${-index * 100}%)`
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % totalSlides // volta para 0 quando chega no último
    updateSlider()
  })

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + totalSlides) % totalSlides // vai para o último quando está no primeiro
    updateSlider()
  })
})
