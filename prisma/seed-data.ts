// Здесь хранится всё содержимое цифровой визитки, поэтому seed.ts отвечает только
// за работу с базой данных. Чтобы изменить данные API, отредактируйте этот файл
// и перезапустите контейнер (или выполните `npm run db:seed`).

export const profileData = {
  email: 'vdmitri0101@gmail.com',
  name: 'Dmitri Han',
  headline: 'Junior AI & Full Stack Software Engineer — Python & LLM Specialist',
  description:
    'AI and full-stack engineer focused on Python services, LLM-powered retrieval systems, and dependable web applications. Experienced with FastAPI, TypeScript/React, PostgreSQL, vector search, caching, and containerized delivery.',
};

export const links = [{ label: 'GitHub', url: 'https://github.com/VdmitDev' }];

// Здесь навыки сгруппированы по категориям, а в seed.ts преобразуются в плоский список.
// Такой формат проще читать и редактировать, чем один длинный список пар.
export const skillsByCategory: Record<string, string[]> = {
  'AI & Machine Learning': [
    'Python',
    'PyTorch',
    'TensorFlow',
    'Scikit-learn',
    'OpenAI and Gemini APIs',
    'RAG',
    'LangChain',
    'LlamaIndex',
    'Prompt Engineering',
    'Hugging Face',
    'NLP',
  ],
  'Full Stack & Web': [
    'TypeScript',
    'JavaScript',
    'Node.js',
    'NestJS',
    'GraphQL',
    'FastAPI',
    'Flask',
    'React.js',
    'Next.js',
    'REST APIs',
  ],
  'Databases & Search': [
    'PostgreSQL',
    'PGVector',
    'MySQL',
    'Redis',
    'ChromaDB',
    'Pinecone',
    'Qdrant',
    'MongoDB',
    'Prisma',
  ],
  'Engineering & DevOps': [
    'Git',
    'Docker',
    'GitHub Actions',
    'AWS EC2/S3/RDS',
    'Microservices',
    'CI/CD',
    'Linux/Bash',
    'PyTest',
  ],
};

// sortOrder: 0 — самое новое место работы, отображается первым в ответе API.
export const experience = [
  {
    company: 'Orient Software',
    position: 'Junior AI & Full Stack Developer (Part-Time / Contract)',
    location: 'Hanoi, Vietnam · Remote',
    startDate: 'Jan 2024',
    endDate: 'Present',
    sortOrder: 0,
    achievements: [
      'Built six FastAPI, React, and PostgreSQL microservices handling 15,000+ daily requests; reduced p95 API latency by 42%.',
      'Built a RAG search pipeline with LangChain, LlamaIndex, and OpenAI APIs; improved context accuracy from 68% to 94%.',
      'Delivered 12+ TypeScript/React dashboards and endpoints, improving client delivery turnaround by 25%.',
      'Optimized PostgreSQL, Redis caching, and PGVector indexing; reduced query time from 680 ms to 140 ms and database CPU load by 50%.',
    ],
  },
  {
    company: 'Savvycom',
    position: 'AI & Python Engineering Intern / Junior Developer',
    location: 'Hanoi, Vietnam · Remote',
    startDate: 'Jun 2022',
    endDate: 'Dec 2023',
    sortOrder: 1,
    achievements: [
      'Built Scikit-learn and Pandas pipelines over 500,000+ records, increasing daily ingestion throughput by 38%.',
      'Built eight administrative UI modules with React and Node.js/Python backends, saving 12 hours per week in manual reporting.',
      'Automated tests with PyTest, Docker, and GitHub Actions; raised test coverage from 45% to 89% and reduced bugs by 34%.',
    ],
  },
  {
    company: 'Adamo Software',
    position: 'Software Engineering Trainee',
    location: 'Hanoi, Vietnam',
    startDate: 'Jun 2021',
    endDate: 'May 2022',
    sortOrder: 2,
    achievements: [
      'Improved Python/MySQL ETL validation, reducing recurring synchronization errors by 95% and batch runtime by 30%.',
      'Built 10+ responsive JavaScript, HTML, and CSS components; achieved a 98% mobile performance audit score.',
      'Refactored backend routes and SQL queries, reducing database execution latency by 180 ms across 5,000+ daily transactions.',
    ],
  },
];

export const projects = [
  {
    name: 'Autonomous AI Agent & RAG Pipeline',
    description:
      'A multi-agent document query system using LangChain, LlamaIndex, and Qdrant, with Next.js and PostgreSQL. Reported retrieval time: 380 ms, with OpenAI token costs reduced by 28%.',
    url: 'https://github.com/VdmitDev/autonomous-ai-agent-rag-pipeline',
    technologies: ['Python', 'LangChain', 'LlamaIndex', 'Qdrant', 'Next.js', 'PostgreSQL'],
    sortOrder: 0,
  },
];
