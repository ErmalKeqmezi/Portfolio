export const projects = [
  {
    id: 'proj-fittrack',
    name: 'FitTrack',
    description:
      'Private gym journal PWA for logging workouts, following training plans, and tracking strength progression, personal records and body metrics — with Supabase auth and row-level security.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    image: '/projects/fittrack.webp',
    imageAlt: 'FitTrack dashboard with weekly activity chart, today\'s workout and personal records',
    github: 'https://github.com/ErmalKeqmezi/fittrack',
    termLine: 'FitTrack — gym journal PWA (Next.js, Supabase, Recharts)',
  },
  {
    id: 'proj-ai-assistant',
    name: 'AI Assistant',
    description:
      'RAG-based AI assistant that answers questions from ingested documents, with both a CLI and a Streamlit UI.',
    tags: ['Python', 'ChromaDB', 'Claude API'],
    image: '/projects/ai-assistant.png',
    imageAlt: 'AI Assistant chat interface with uploaded documents',
    github: 'https://github.com/ErmalKeqmezi/AI-Assistant',
    termLine: 'AI Assistant — RAG assistant over ingested documents (Claude API)',
  },
  {
    id: 'proj-ai-tool-calling-agent',
    name: 'AI Tool-Calling Agent',
    description:
      "An autonomous AI assistant built on Anthropic's Claude API that independently decides when to invoke tools, executes them in Python, and iterates until it can answer the query — with permission gates for write operations and short-term conversational memory.",
    tags: ['Python', 'Claude API', 'FastAPI', 'Streamlit'],
    image: '/projects/ai-tool-calling-agent.png',
    imageAlt: 'AI Tool Agent web UI showing available tools and example prompts',
    github: 'https://github.com/ErmalKeqmezi/AI-Tool-Calling-Agent',
    termLine: 'AI Tool-Calling Agent — autonomous tool-calling assistant on Claude API',
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
