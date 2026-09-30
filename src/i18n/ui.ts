export const LOCALES = ['es', 'en', 'pt'] as const;
export type Lang = (typeof LOCALES)[number];

export const DEFAULT_LANG: Lang = 'es';

/** Locale tags for `og:locale`, `hreflang` and `Intl` formatting. */
export const LOCALE_TAG: Record<Lang, string> = {
  es: 'es-VE',
  en: 'en-US',
  pt: 'pt-BR',
};

/**
 * Section ids are locale-neutral — they anchor the scroll-spy and the `#hash`
 * links. Only the label changes per language.
 */
export const SECTIONS = [
  { id: 'home', num: '00', key: 'home' },
  { id: 'about', num: '01', key: 'about' },
  { id: 'stack', num: '02', key: 'stack' },
  { id: 'work', num: '03', key: 'experience' },
  { id: 'projects', num: '04', key: 'projects' },
  { id: 'contact', num: '05', key: 'contact' },
] as const;

export type SectionKey = (typeof SECTIONS)[number]['key'];

const es = {
  seo: {
    homeTitle: 'Carlos Volweides — Ingeniero Fullstack',
    homeDescription:
      'Ingeniero fullstack especializado en TypeScript, React, Next.js, Astro, Python (FastAPI), arquitectura limpia, DDD e integración de LLMs. Basado en Caracas, Venezuela.',
    projectsTitle: 'Proyectos — Carlos Volweides',
    projectsDescription:
      'Proyectos seleccionados de Carlos Volweides: Frida, Atlas Protocol, Repositorio UGMA, Luxdata.',
    jobTitle: 'Ingeniero Fullstack',
  },

  nav: {
    home: 'inicio',
    about: 'sobre mí',
    stack: 'stack',
    experience: 'experiencia',
    projects: 'proyectos',
    contact: 'contacto',
  },

  /** Etiquetas cortas para la barra inferior de mobile — seis tabs a 320px. */
  navShort: {
    home: 'inicio',
    about: 'sobre mí',
    stack: 'stack',
    experience: 'exp',
    projects: 'proyectos',
    contact: 'contacto',
  },

  header: {
    cmdk: 'Abrir paleta de comandos',
    mobileNav: 'Navegación por secciones',
    /** `{lang}` se rellena con el nombre del idioma destino (langNames). */
    switchTo: 'Ver en {lang}',
    langNames: { es: 'español', en: 'inglés', pt: 'portugués' } as Record<Lang, string>,
  },

  hero: {
    location: 'Ubicación',
    locationValue: 'Caracas, VE',
    role: 'Rol',
    roleValue: 'Ingeniero Fullstack',
    status: 'Estado',
    statusValue: '● Disponible para trabajar',
    localTime: 'Hora local',
    taglineRole: 'Ingeniero Fullstack',
    taglineLead: 'Construyo aplicaciones web & mobile end-to-end con énfasis en',
    taglineArch: 'arquitectura limpia',
    taglineDdd: 'DDD',
    taglineLlm: 'LLMs',
    taglineJoin: 'e integración de',
    ctaProjects: 'Ver proyectos',
    ctaContact: 'Hablemos',
    scroll: 'scroll',
    prompt: './construyamos-algo',
  },

  about: {
    label: 'sobre mí',
    headingLine1: 'Construyo software',
    headingLine2: 'de principio a fin.',
    based: 'Ubicación',
    basedValue: 'Caracas, VE',
    edu: 'Estudios',
    eduValue: 'UGMA · Ing. Informática',
    years: 'Años',
    yearsValue: '3+ construyendo',
    mode: 'Modo',
    modeValue: 'Remoto · Async',
    p1Lead: 'desarrollador fullstack',
    p1: 'con experiencia construyendo aplicaciones web y mobile end-to-end. Trabajo principalmente con',
    p1Tail: 'y',
    p1Python: '(FastAPI).',
    p1Prefix: 'Soy',
    p2Lead: 'APIs escalables',
    p2Prefix: 'Mi enfoque está en el diseño e implementación de',
    p2: 'aplicando arquitectura limpia, Domain-Driven Design y comunicación basada en eventos. He participado en sistemas de logística, facturación y plataformas multi-aplicación que conectan web y mobile.',
    p3Prefix:
      'Trabajo bien en equipo bajo Scrum, pero también entrego proyectos completos de forma autónoma — desde requerimientos hasta despliegue. Me interesan los sistemas escalables y la integración de',
    p3Lead: 'LLMs',
    p3: 'en productos reales.',
  },

  stack: {
    label: 'stack',
    languages: 'Lenguajes',
    frontend: 'Frontend',
    backend: 'Backend',
    data: 'Datos',
    architecture: 'Arquitectura',
    ai: 'IA / LLM',
    practices: 'Prácticas',
    tooling: 'Herramientas',
  },

  experience: {
    label: 'experiencia',
    role: 'Desarrollador Fullstack',
    date: '2025 — 2026',
    summary:
      'Construí aplicaciones web y mobile end-to-end en plataformas de logística, sistemas de facturación e integraciones multi-app. En remoto para Córdoba, Argentina.',
    bullets: [
      'Diseñé e implementé APIs escalables en Python (FastAPI) aplicando arquitectura limpia, DDD y comunicación basada en eventos.',
      'Maqueté a partir de Figma e integré full-stack desde requerimientos funcionales hasta despliegue en develop / staging / production.',
      'Entregué Frida en solitario, de principio a fin: 12 contextos acotados, 356 pruebas con pytest y 38 E2E con Playwright.',
    ],
  },

  projects: {
    label: 'trabajo seleccionado',
    allLabel: 'todos los proyectos',
    caseStudy: 'Ver caso de estudio',
    caseStudyAria: 'Ver caso de estudio: {title}',
    back: '← proyectos',
    role: 'Rol',
    demo: 'Ver demo',
    repo: 'Ver repo',
  },

  contact: {
    label: 'contacto',
    headingLine1: 'Construyamos',
    headingLine2: 'algo real',
    location: 'Ubicación',
    locationValue: 'Caracas · Venezuela',
    status: 'Estado',
    statusValue: '● Disponible para trabajar',
  },

  footer: {
    rights: 'Todos los derechos reservados.',
  },

  cmdk: {
    goto: 'Ir a {label}',
    email: 'Enviar email',
    github: 'Abrir GitHub',
    linkedin: 'Abrir LinkedIn',
    allProjects: 'Todos los proyectos',
    placeholder: '$ buscar nav · proyectos · contacto...',
    noResults: 'sin resultados',
    navigate: 'navegar',
    select: 'seleccionar',
    close: 'cerrar',
  },

  form: {
    title: 'Formulario de contacto',
    name: 'Nombre',
    email: 'Email',
    reason: 'Motivo',
    company: 'Empresa',
    message: 'Mensaje',
    selectOption: 'Selecciona una opción',
    tipoTrabajo: 'Oferta de trabajo',
    tipoFreelance: 'Proyecto freelance',
    tipoNetworking: 'Networking / Otro',
    submit: 'Enviar mensaje',
    submitting: 'Enviando...',
    privacy: {
      intro: 'Tu email solo se usa para responderte.',
      showLabel: 'Ver política de privacidad',
      hideLabel: 'Ocultar',
      title: 'Política de privacidad',
      body1:
        'Al enviar este formulario, compartes tu nombre y email conmigo (Carlos Volweides) con el único propósito de responder tu mensaje.',
      body2:
        'No vendo, comparto ni uso tus datos para ningún otro fin. Los mensajes son procesados por Resend (resend.com) para el envío del email y se eliminan automáticamente en 30 días.',
      contact: 'Para cualquier duda:',
    },
    tipos: {
      trabajo: {
        companyLabel: 'Empresa que contrata',
        companyPlaceholder: 'Ej: Google, startup, agencia...',
        messageHint:
          'Ej: empresa, stack tecnológico, modalidad (remoto/híbrido) y rango salarial si puedes compartirlo.',
      },
      freelance: {
        companyLabel: 'Tu empresa o proyecto',
        companyPlaceholder: 'Ej: Mi startup, Proyecto X...',
        messageHint:
          'Ej: descripción del proyecto, stack preferido, timeline aproximado y presupuesto.',
      },
      networking: {
        companyLabel: 'Empresa u organización',
        companyPlaceholder: 'Opcional',
        messageHint: 'Cuéntame sobre ti o en qué te gustaría conectar.',
      },
    },
    validation: {
      nameRequired: 'Ingresa tu nombre.',
      emailRequired: 'Ingresa tu email.',
      emailInvalid: 'Ingresa un email válido.',
      tipoRequired: 'Selecciona una opción.',
      messageRequired: 'Escribe tu mensaje.',
      messageTooLong: 'El mensaje no puede superar {max} caracteres.',
    },
    status: {
      errorTitle: 'No se pudo enviar',
      successTitle: 'Mensaje enviado',
      successSubtitle: 'Te respondo en menos de 24 horas.',
      networkError: 'Ocurrió un error de red. Intenta de nuevo.',
    },
    /** Keyed by the `code` returned from /api/contact. */
    errors: {
      NAME_REQUIRED: 'El nombre es obligatorio.',
      EMAIL_REQUIRED: 'El email es obligatorio.',
      EMAIL_INVALID: 'El email no tiene un formato válido.',
      TIPO_INVALID: 'Selecciona un motivo de contacto válido.',
      MESSAGE_REQUIRED: 'El mensaje es obligatorio.',
      MESSAGE_TOO_LONG: 'El mensaje no puede superar {max} caracteres.',
      BAD_JSON: 'La petición no tiene un formato válido.',
      SERVER_ERROR: 'Error interno del servidor.',
      SEND_FAILED: 'No se pudo enviar el mensaje. Intenta de nuevo.',
      UNKNOWN: 'Ocurrió un error. Intenta de nuevo.',
    },
  },
};

/** `es` is the source of truth for the shape; a missing or extra key in `en` fails typecheck. */
export type Dict = typeof es;

const en: Dict = {
  seo: {
    homeTitle: 'Carlos Volweides — Fullstack Engineer',
    homeDescription:
      'Fullstack Engineer specializing in TypeScript, React, Next.js, Astro, Python (FastAPI), clean architecture, DDD, and LLM integration. Based in Caracas, Venezuela.',
    projectsTitle: 'Projects — Carlos Volweides',
    projectsDescription:
      'Selected projects by Carlos Volweides: Frida, Atlas Protocol, Repositorio UGMA, Luxdata.',
    jobTitle: 'Fullstack Engineer',
  },

  nav: {
    home: 'index',
    about: 'about',
    stack: 'stack',
    experience: 'experience',
    projects: 'projects',
    contact: 'contact',
  },

  navShort: {
    home: 'index',
    about: 'about',
    stack: 'stack',
    experience: 'exp',
    projects: 'projects',
    contact: 'contact',
  },

  header: {
    cmdk: 'Open command palette',
    mobileNav: 'Section navigation',
    switchTo: 'View in {lang}',
    langNames: { es: 'Spanish', en: 'English', pt: 'Portuguese' },
  },

  hero: {
    location: 'Location',
    locationValue: 'Caracas, VE',
    role: 'Role',
    roleValue: 'Fullstack Engineer',
    status: 'Status',
    statusValue: '● Open to work',
    localTime: 'Local time',
    taglineRole: 'Fullstack Engineer',
    taglineLead: 'I build end-to-end web & mobile applications with a focus on',
    taglineArch: 'clean architecture',
    taglineDdd: 'DDD',
    taglineLlm: 'LLMs',
    taglineJoin: 'and the integration of',
    ctaProjects: 'View projects',
    ctaContact: 'Get in touch',
    scroll: 'scroll',
    prompt: './let-s-build-something',
  },

  about: {
    label: 'about',
    headingLine1: 'I build software',
    headingLine2: 'from end to end.',
    based: 'Based',
    basedValue: 'Caracas, VE',
    edu: 'Edu',
    eduValue: 'UGMA · Computer Engineering',
    years: 'Years',
    yearsValue: '3+ building',
    mode: 'Mode',
    modeValue: 'Remote · Async',
    p1Prefix: "I'm a",
    p1Lead: 'fullstack developer',
    p1: 'with experience building end-to-end web and mobile applications. I work mainly with',
    p1Tail: 'and',
    p1Python: '(FastAPI).',
    p2Prefix: 'My focus is designing and implementing',
    p2Lead: 'scalable APIs',
    p2: 'using clean architecture, Domain-Driven Design and event-driven communication. I have worked on logistics systems, billing platforms and multi-app products that connect web and mobile.',
    p3Prefix:
      'I work well in a Scrum team, but I also deliver entire projects autonomously — from requirements to deployment. I care about scalable systems and the integration of',
    p3Lead: 'LLMs',
    p3: 'into real products.',
  },

  stack: {
    label: 'stack',
    languages: 'Languages',
    frontend: 'Frontend',
    backend: 'Backend',
    data: 'Data',
    architecture: 'Architecture',
    ai: 'AI / LLM',
    practices: 'Practices',
    tooling: 'Tooling',
  },

  experience: {
    label: 'experience',
    role: 'Fullstack Developer',
    date: '2025 — 2026',
    summary:
      'Built end-to-end web and mobile applications across logistics platforms, billing systems and multi-app integrations. Remote, for Córdoba, Argentina.',
    bullets: [
      'Designed and implemented scalable Python (FastAPI) APIs using clean architecture, DDD and event-driven communication.',
      'Built UIs from Figma and handled full-stack integration, from functional requirements through deployment across develop / staging / production.',
      'Delivered Frida solo, end to end: 12 bounded contexts, 356 pytest tests and 38 Playwright E2E tests.',
    ],
  },

  projects: {
    label: 'selected work',
    allLabel: 'all projects',
    caseStudy: 'View case study',
    caseStudyAria: 'View case study: {title}',
    back: '← projects',
    role: 'Role',
    demo: 'Live demo',
    repo: 'View repo',
  },

  contact: {
    label: 'contact',
    headingLine1: "Let's build",
    headingLine2: 'something real',
    location: 'Location',
    locationValue: 'Caracas · Venezuela',
    status: 'Status',
    statusValue: '● Open to work',
  },

  footer: {
    rights: 'All rights reserved.',
  },

  cmdk: {
    goto: 'Go to {label}',
    email: 'Send email',
    github: 'Open GitHub',
    linkedin: 'Open LinkedIn',
    allProjects: 'All projects',
    placeholder: '$ search nav · projects · contact...',
    noResults: 'no results',
    navigate: 'navigate',
    select: 'select',
    close: 'close',
  },

  form: {
    title: 'Contact form',
    name: 'Name',
    email: 'Email',
    reason: 'Reason',
    company: 'Company',
    message: 'Message',
    selectOption: 'Select an option',
    tipoTrabajo: 'Job offer',
    tipoFreelance: 'Freelance project',
    tipoNetworking: 'Networking / Other',
    submit: 'Send message',
    submitting: 'Sending...',
    privacy: {
      intro: 'Your email is only used to reply to you.',
      showLabel: 'View privacy policy',
      hideLabel: 'Hide',
      title: 'Privacy policy',
      body1:
        'By submitting this form, you share your name and email with me (Carlos Volweides) for the sole purpose of replying to your message.',
      body2:
        'I do not sell, share or use your data for any other purpose. Messages are processed by Resend (resend.com) to deliver the email and are deleted automatically after 30 days.',
      contact: 'Any questions:',
    },
    tipos: {
      trabajo: {
        companyLabel: 'Hiring company',
        companyPlaceholder: 'e.g. Google, startup, agency...',
        messageHint:
          'e.g. company, tech stack, work mode (remote/hybrid) and salary range if you can share it.',
      },
      freelance: {
        companyLabel: 'Your company or project',
        companyPlaceholder: 'e.g. My startup, Project X...',
        messageHint:
          'e.g. project description, preferred stack, rough timeline and budget.',
      },
      networking: {
        companyLabel: 'Company or organization',
        companyPlaceholder: 'Optional',
        messageHint: 'Tell me about yourself or what you would like to connect on.',
      },
    },
    validation: {
      nameRequired: 'Enter your name.',
      emailRequired: 'Enter your email.',
      emailInvalid: 'Enter a valid email.',
      tipoRequired: 'Select an option.',
      messageRequired: 'Write your message.',
      messageTooLong: 'The message cannot exceed {max} characters.',
    },
    status: {
      errorTitle: "Couldn't send",
      successTitle: 'Message sent',
      successSubtitle: 'I reply within 24 hours.',
      networkError: 'A network error occurred. Please try again.',
    },
    errors: {
      NAME_REQUIRED: 'Name is required.',
      EMAIL_REQUIRED: 'Email is required.',
      EMAIL_INVALID: 'Email format is not valid.',
      TIPO_INVALID: 'Select a valid contact reason.',
      MESSAGE_REQUIRED: 'Message is required.',
      MESSAGE_TOO_LONG: 'The message cannot exceed {max} characters.',
      BAD_JSON: 'The request format is not valid.',
      SERVER_ERROR: 'Internal server error.',
      SEND_FAILED: "Couldn't send the message. Please try again.",
      UNKNOWN: 'Something went wrong. Please try again.',
    },
  },
};

const pt: Dict = {
  seo: {
    homeTitle: 'Carlos Volweides — Engenheiro Fullstack',
    homeDescription:
      'Engenheiro fullstack especializado em TypeScript, React, Next.js, Astro, Python (FastAPI), arquitetura limpa, DDD e integração de LLMs. Baseado em Caracas, Venezuela.',
    projectsTitle: 'Projetos — Carlos Volweides',
    projectsDescription:
      'Projetos selecionados de Carlos Volweides: Frida, Atlas Protocol, Repositorio UGMA, Luxdata.',
    jobTitle: 'Engenheiro Fullstack',
  },

  nav: {
    home: 'início',
    about: 'sobre mim',
    stack: 'stack',
    experience: 'experiência',
    projects: 'projetos',
    contact: 'contato',
  },

  navShort: {
    home: 'início',
    about: 'sobre',
    stack: 'stack',
    experience: 'exp',
    projects: 'projetos',
    contact: 'contato',
  },

  header: {
    cmdk: 'Abrir paleta de comandos',
    mobileNav: 'Navegação por seções',
    switchTo: 'Ver em {lang}',
    langNames: { es: 'espanhol', en: 'inglês', pt: 'português' },
  },

  hero: {
    location: 'Localização',
    locationValue: 'Caracas, VE',
    role: 'Cargo',
    roleValue: 'Engenheiro Fullstack',
    status: 'Status',
    statusValue: '● Disponível para trabalhar',
    localTime: 'Hora local',
    taglineRole: 'Engenheiro Fullstack',
    taglineLead: 'Construo aplicações web & mobile end-to-end com ênfase em',
    taglineArch: 'arquitetura limpa',
    taglineDdd: 'DDD',
    taglineLlm: 'LLMs',
    taglineJoin: 'e integração de',
    ctaProjects: 'Ver projetos',
    ctaContact: 'Vamos conversar',
    scroll: 'scroll',
    prompt: './vamos-construir-algo',
  },

  about: {
    label: 'sobre mim',
    headingLine1: 'Construo software',
    headingLine2: 'de ponta a ponta.',
    based: 'Localização',
    basedValue: 'Caracas, VE',
    edu: 'Formação',
    eduValue: 'UGMA · Eng. da Computação',
    years: 'Anos',
    yearsValue: '3+ construindo',
    mode: 'Modo',
    modeValue: 'Remoto · Async',
    p1Lead: 'desenvolvedor fullstack',
    p1: 'com experiência construindo aplicações web e mobile end-to-end. Trabalho principalmente com',
    p1Tail: 'e',
    p1Python: '(FastAPI).',
    p1Prefix: 'Sou',
    p2Lead: 'APIs escaláveis',
    p2Prefix: 'Meu foco está no design e na implementação de',
    p2: 'aplicando arquitetura limpa, Domain-Driven Design e comunicação baseada em eventos. Já participei de sistemas de logística, faturamento e plataformas multi-aplicação que conectam web e mobile.',
    p3Prefix:
      'Trabalho bem em equipe sob Scrum, mas também entrego projetos completos de forma autônoma — dos requisitos até o deploy. Me interessam sistemas escaláveis e a integração de',
    p3Lead: 'LLMs',
    p3: 'em produtos reais.',
  },

  stack: {
    label: 'stack',
    languages: 'Linguagens',
    frontend: 'Frontend',
    backend: 'Backend',
    data: 'Dados',
    architecture: 'Arquitetura',
    ai: 'IA / LLM',
    practices: 'Práticas',
    tooling: 'Ferramentas',
  },

  experience: {
    label: 'experiência',
    role: 'Desenvolvedor Fullstack',
    date: '2025 — 2026',
    summary:
      'Construí aplicações web e mobile end-to-end em plataformas de logística, sistemas de faturamento e integrações multi-app. Remoto, para Córdoba, Argentina.',
    bullets: [
      'Projetei e implementei APIs escaláveis em Python (FastAPI) aplicando arquitetura limpa, DDD e comunicação baseada em eventos.',
      'Implementei interfaces a partir do Figma e cuidei da integração full-stack, dos requisitos funcionais ao deploy em develop / staging / production.',
      'Entreguei o Frida sozinho, de ponta a ponta: 12 bounded contexts, 356 testes com pytest e 38 E2E com Playwright.',
    ],
  },

  projects: {
    label: 'trabalhos selecionados',
    allLabel: 'todos os projetos',
    caseStudy: 'Ver estudo de caso',
    caseStudyAria: 'Ver estudo de caso: {title}',
    back: '← projetos',
    role: 'Cargo',
    demo: 'Ver demo',
    repo: 'Ver repo',
  },

  contact: {
    label: 'contato',
    headingLine1: 'Vamos construir',
    headingLine2: 'algo real',
    location: 'Localização',
    locationValue: 'Caracas · Venezuela',
    status: 'Status',
    statusValue: '● Disponível para trabalhar',
  },

  footer: {
    rights: 'Todos os direitos reservados.',
  },

  cmdk: {
    goto: 'Ir para {label}',
    email: 'Enviar email',
    github: 'Abrir GitHub',
    linkedin: 'Abrir LinkedIn',
    allProjects: 'Todos os projetos',
    placeholder: '$ buscar nav · projetos · contato...',
    noResults: 'sem resultados',
    navigate: 'navegar',
    select: 'selecionar',
    close: 'fechar',
  },

  form: {
    title: 'Formulário de contato',
    name: 'Nome',
    email: 'Email',
    reason: 'Motivo',
    company: 'Empresa',
    message: 'Mensagem',
    selectOption: 'Selecione uma opção',
    tipoTrabajo: 'Oferta de emprego',
    tipoFreelance: 'Projeto freelance',
    tipoNetworking: 'Networking / Outro',
    submit: 'Enviar mensagem',
    submitting: 'Enviando...',
    privacy: {
      intro: 'Seu email é usado apenas para te responder.',
      showLabel: 'Ver política de privacidade',
      hideLabel: 'Ocultar',
      title: 'Política de privacidade',
      body1:
        'Ao enviar este formulário, você compartilha seu nome e email comigo (Carlos Volweides) com o único propósito de responder à sua mensagem.',
      body2:
        'Não vendo, compartilho nem uso seus dados para qualquer outra finalidade. As mensagens são processadas pelo Resend (resend.com) para o envio do email e são apagadas automaticamente em 30 dias.',
      contact: 'Para qualquer dúvida:',
    },
    tipos: {
      trabajo: {
        companyLabel: 'Empresa contratante',
        companyPlaceholder: 'Ex: Google, startup, agência...',
        messageHint:
          'Ex: empresa, stack tecnológico, modalidade (remoto/híbrido) e faixa salarial, se puder compartilhar.',
      },
      freelance: {
        companyLabel: 'Sua empresa ou projeto',
        companyPlaceholder: 'Ex: Minha startup, Projeto X...',
        messageHint:
          'Ex: descrição do projeto, stack preferida, prazo aproximado e orçamento.',
      },
      networking: {
        companyLabel: 'Empresa ou organização',
        companyPlaceholder: 'Opcional',
        messageHint: 'Conte sobre você ou sobre o que gostaria de conversar.',
      },
    },
    validation: {
      nameRequired: 'Informe seu nome.',
      emailRequired: 'Informe seu email.',
      emailInvalid: 'Informe um email válido.',
      tipoRequired: 'Selecione uma opção.',
      messageRequired: 'Escreva sua mensagem.',
      messageTooLong: 'A mensagem não pode passar de {max} caracteres.',
    },
    status: {
      errorTitle: 'Não foi possível enviar',
      successTitle: 'Mensagem enviada',
      successSubtitle: 'Respondo em menos de 24 horas.',
      networkError: 'Ocorreu um erro de rede. Tente novamente.',
    },
    errors: {
      NAME_REQUIRED: 'O nome é obrigatório.',
      EMAIL_REQUIRED: 'O email é obrigatório.',
      EMAIL_INVALID: 'O email não tem um formato válido.',
      TIPO_INVALID: 'Selecione um motivo de contato válido.',
      MESSAGE_REQUIRED: 'A mensagem é obrigatória.',
      MESSAGE_TOO_LONG: 'A mensagem não pode passar de {max} caracteres.',
      BAD_JSON: 'A requisição não tem um formato válido.',
      SERVER_ERROR: 'Erro interno do servidor.',
      SEND_FAILED: 'Não foi possível enviar a mensagem. Tente novamente.',
      UNKNOWN: 'Algo deu errado. Tente novamente.',
    },
  },
};

export const ui: Record<Lang, Dict> = { es, en, pt };

