export const projects = [
  {
    id: 'proj-bluetech',
    name: 'BlueTech',
    description:
      'Full-stack e-commerce app with Stripe payments, Cloudinary image uploads, JWT auth, and an admin panel for product management.',
    tags: ['ASP.NET Core 7', 'React', 'TypeScript', 'PostgreSQL'],
    image: '/projects/bluetech.jpg',
    imageAlt: 'BlueTech e-commerce storefront',
    github: '#',
    termLine: 'BlueTech — full-stack e-commerce app (Stripe, Cloudinary, JWT)',
  },
  {
    id: 'proj-ai-assistant',
    name: 'AI Assistant',
    description:
      'RAG-based AI assistant that answers questions from ingested documents, with both a CLI and a Streamlit UI.',
    tags: ['Python', 'ChromaDB', 'Claude API'],
    image: '/projects/ai-assistant.png',
    imageAlt: 'AI Assistant chat interface with uploaded documents',
    github: '#',
    termLine: 'AI Assistant — RAG assistant over ingested documents (Claude API)',
  },
  {
    id: 'proj-restaurant',
    name: 'RestaurantAppProject',
    description:
      'ASP.NET Core MVC restaurant ordering system with role-based access (Admin/Manager/Waiter/Bartender) and session-based cart/checkout flow.',
    tags: ['.NET 8', 'EF Core', 'SQLite'],
    image: '/projects/restaurant.jpg',
    imageAlt: 'Restaurant ordering system menu grid',
    github: '#',
    termLine: 'RestaurantAppProject — role-based ordering system, .NET 8',
  },
] as const;

export const education = [
  {
    id: 'edu-ubt',
    school: 'BSc Computer Science and Engineering',
    org: 'University of Business and Technology (UBT)',
    date: '10/2021 — Present',
    courses: 'Coursework: Java · PHP · Databases · .NET MVC · JavaScript',
  },
  {
    id: 'edu-donbosko',
    school: 'High School Certificate',
    org: 'Don Bosko',
    date: '07/2018 — 06/2021',
    courses: null,
  },
] as const;

export interface SkillGroup {
  title: string;
  tags: readonly string[];
  learning?: boolean;
}

export const skillGroups: readonly SkillGroup[] = [
  { title: 'Programming', tags: ['Java', 'C#', 'JavaScript', 'Python'] },
  { title: 'Frameworks & Tools', tags: ['.NET MVC', 'React', 'TypeScript', 'PostgreSQL', 'SQLite'] },
  { title: '★ Currently Learning', tags: ['Python', 'Machine Learning'], learning: true },
];

export const navSections = [
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'education', label: 'education' },
  { id: 'skills', label: 'skills' },
  { id: 'contact', label: 'contact' },
] as const;

export const contact = {
  email: 'ekeqmezi10@gmail.com',
  phone: '+383 43 777 063',
  phoneHref: '+38343777063',
  github: 'github.com/ErmalKeqmezi',
  githubUrl: 'https://github.com/ErmalKeqmezi',
  resumeUrl: '/Ermal-Keqmezi-CV.pdf',
};
