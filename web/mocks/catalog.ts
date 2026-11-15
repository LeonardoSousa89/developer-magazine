import peopleData from './people.json';
import { profileEvidence } from './evidence';
import type { ProfileEvidenceData } from '../types/evidence';

const evidenceByPersonId: Partial<Record<string, ProfileEvidenceData>> = profileEvidence;

const emptyEvidence: ProfileEvidenceData = { contributions: [], links: [] };

export const people = peopleData.map((person) => ({
  ...person,
  evidence: Object.hasOwn(evidenceByPersonId, person.id)
    ? (evidenceByPersonId[person.id] ?? emptyEvidence)
    : emptyEvidence,
}));

export const projects = [
  {
    id: 'linux',
    name: 'Linux Kernel',
    kind: 'Operating Systems',
    summary:
      'The kernel at the heart of a global open source operating system ecosystem.',
    detail:
      'The Linux kernel manages hardware resources and provides the interfaces used by applications. Its development brings together maintainers and contributors from across the world.',
    tags: ['C', 'Kernel', 'Open Source'],
    people: ['torvalds'],
    tone: 'blue',
    logo: 'linux',
  },
  {
    id: 'react',
    name: 'React',
    kind: 'Web Development',
    summary: 'A library for building user interfaces from reusable components.',
    detail:
      'React lets developers compose interfaces from reusable components and describe how they should render as data changes. The project is maintained by Meta and an open source community.',
    tags: ['JavaScript', 'UI', 'Components'],
    people: [],
    tone: 'cyan',
    logo: 'react',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    kind: 'Databases',
    summary: 'An open source relational database with a rich SQL feature set.',
    detail:
      'PostgreSQL is a relational database that supports transactions, constraints, indexes and extensions. Developer Magazine’s architecture uses it as the source of truth for application data.',
    tags: ['SQL', 'Database', 'Open Source'],
    people: [],
    tone: 'blue',
    logo: 'postgresql',
  },
  {
    id: 'node',
    name: 'Node.js',
    kind: 'Developer Tools',
    summary: 'A JavaScript runtime for building servers, tools and applications.',
    detail:
      'Node.js runs JavaScript outside the browser. Its asynchronous I/O model helps applications handle concurrent work such as network requests and file operations.',
    tags: ['JavaScript', 'Runtime', 'Backend'],
    people: [],
    tone: 'green',
    logo: 'nodedotjs',
  },
  {
    id: 'docker',
    name: 'Docker',
    kind: 'DevOps',
    summary: 'Tools to package, distribute and run software in containers.',
    detail:
      'Docker packages an application and its dependencies in an image. Containers run from that image in consistent environments, making builds easier to reproduce and share.',
    tags: ['Containers', 'DevOps', 'Infrastructure'],
    people: [],
    tone: 'blue',
    logo: 'docker',
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    kind: 'Machine Learning',
    summary:
      'An open source ecosystem for building and deploying machine learning models.',
    detail:
      'TensorFlow provides tools for expressing numerical computation and building machine learning workflows, from experimentation to deployment.',
    tags: ['Python', 'Machine Learning'],
    people: [],
    tone: 'orange',
    logo: 'tensorflow',
  },
  {
    id: 'git',
    name: 'Git',
    kind: 'Developer Tools',
    summary:
      'A distributed version control system for tracking changes and collaborating.',
    detail:
      'Git records versions of a project as commits. Each clone can hold its own history, so contributors can create branches and work independently before exchanging changes.',
    tags: ['Version Control', 'Open Source', 'CLI'],
    people: ['torvalds'],
    tone: 'orange',
    logo: 'git',
  },
  {
    id: 'doom',
    name: 'Doom Engine',
    kind: 'Game Development',
    summary: 'The engine behind id Software’s influential first-person game Doom.',
    detail:
      'The source release documents the architecture and rendering techniques behind Doom. It is a useful starting point for studying early real-time game rendering.',
    tags: ['C', 'Game Engines', 'Rendering'],
    people: ['carmack'],
    tone: 'orange',
    logo: 'doom',
  },
  {
    id: 'howmanytime',
    name: 'HowManyTime',
    kind: 'Web Development',
    summary: 'A web app that shows how many hours of work a purchase costs.',
    detail:
      'HowManyTime converts a purchase price into working hours based on the user’s income. It helps people compare purchases in terms of the time needed to pay for them.',
    tags: ['TypeScript', 'Tailwind CSS'],
    people: ['leonardo-sousa'],
    tone: 'cyan',
    logo: 'howmanytime',
  },
] as const;

export const articles = [
  {
    id: 'evolution-of-the-web',
    title: 'How the web became an application platform',
    topic: 'Web Development',
    minutes: 5,
    style: 'ribbon',
    summary:
      'From linked documents to component systems, explore what changed and why it matters.',
    body: [
      'The web began as a way to publish and link documents. HTML gave documents structure, URLs made them addressable, and browsers made them readable across operating systems. Those properties still matter when we build interactive applications.',
      'As interfaces grew more complex, teams moved toward reusable components. A component can bring markup, state and behavior together, but it works best when it has a clear responsibility and an accessible interface.',
      'A practical approach is to start with a document that can be read and navigated, then add interaction where it helps. Treat performance, keyboard support and clear URLs as features.',
    ],
  },
  {
    id: 'distributed-systems',
    title: 'Understanding distributed systems',
    topic: 'Architecture',
    minutes: 6,
    style: 'grid',
    summary: 'What changes when a single process becomes several machines?',
    body: [
      'A distributed system coordinates independent processes over a network. Network calls can time out even when the recipient has already handled them, so a retry may repeat a side effect.',
      'Start by deciding which operations must be safe to retry. For a write endpoint, consider storing an idempotency key alongside the result so another request can return the same outcome.',
      'Test with delayed responses, failed requests and unavailable dependencies. Observing how a system fails is as useful as knowing how it behaves when everything works.',
    ],
  },
  {
    id: 'machine-learning-fundamentals',
    title: 'Machine learning fundamentals',
    topic: 'Machine Learning',
    minutes: 7,
    style: 'mesh',
    summary: 'A practical introduction to training data, evaluation and model errors.',
    body: [
      'Machine learning models estimate patterns from examples. A model can perform well on the examples it has seen and still fail on unfamiliar data, which makes evaluation a separate job from training.',
      'Keep evaluation data separate before feature selection and tuning. Pick metrics that reflect the costs of the kinds of mistakes your application can make.',
      'Use a simple baseline and record the data assumptions behind the result. A model is useful only in the context in which you can evaluate its behavior.',
    ],
  },
  {
    id: 'docker-guide',
    title: 'A practical guide to Docker',
    topic: 'DevOps',
    minutes: 8,
    style: 'boxes',
    summary: 'Build a repeatable local environment using images and containers.',
    body: [
      'An image is a packaged filesystem and configuration. A container is a running instance of an image, with a writable layer and runtime settings of its own.',
      'Pin the base image version, keep the build context small and copy dependency manifests before application source so builds can reuse layers.',
      'Pass runtime configuration separately from the image. Put durable application data in an appropriate database or volume, and check that a fresh checkout can recreate the environment.',
    ],
  },
] as const;

export const positions = [
  {
    id: 'backend',
    title: 'Backend Engineer',
    area: 'Backend',
    tags: ['Node.js', 'TypeScript', 'REST API'],
    description:
      'Design the API and domain boundaries for profiles, projects and revisions.',
  },
  {
    id: 'infra',
    title: 'Database & DevOps Engineer',
    area: 'DevOps',
    tags: ['PostgreSQL', 'Docker', 'CI/CD'],
    description:
      'Own database modeling, migrations and a reproducible deployment workflow.',
  },
  {
    id: 'frontend',
    title: 'Web & Mobile Contributor',
    area: 'Frontend',
    tags: ['React', 'Next.js', 'Accessibility'],
    description:
      'Help turn the approved design into an accessible, consistent experience.',
  },
] as const;
