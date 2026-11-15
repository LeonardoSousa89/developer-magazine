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
    sequence: 'URL → HTML → UI',
    panels: [
      {
        title: 'The address is part of the interface',
        paragraphs: [
          'The web began as a way to publish and link documents. HTML gave documents structure, URLs made them addressable, and browsers made them readable across operating systems. Those properties still matter when we build interactive applications.',
          'Open a bookmarked issue in a tracker. Its URL should take you to that exact issue, even on another device. Put shareable context such as the issue ID or a search filter in the URL; keep a temporary control such as an open menu out of it.',
        ],
      },
      {
        title: 'State has an owner',
        paragraphs: [
          'As interfaces grew more complex, teams moved toward reusable components. A component can bring markup, state and behavior together, but it works best when it has a clear responsibility and an accessible interface.',
          'In a project board, cards display their own details, but the board owns which cards match the active filter. Derive the visible cards from the filter and the original collection so there are no two lists to keep in sync.',
        ],
      },
      {
        title: 'The browser already knows the basics',
        paragraphs: [
          'A practical approach is to start with a document that can be read and navigated, then add interaction where it helps. Treat performance, keyboard support and clear URLs as features.',
          'An ordinary link comes with keyboard navigation, browser history and an option to open it in another tab. Adding client-side behavior should preserve the original destination and the focus needed to use the next screen.',
        ],
      },
      {
        title: 'Field test: save the move',
        paragraphs: [
          'Drag-and-drop can make a board quicker to use, but keep a keyboard-accessible way to move a card. Open a filtered board from a fresh tab, move one card by keyboard, and make sure Back restores the previous view.',
        ],
      },
    ],
  },
  {
    id: 'distributed-systems',
    title: 'Understanding distributed systems',
    topic: 'Architecture',
    minutes: 6,
    style: 'grid',
    summary: 'What changes when a single process becomes several machines?',
    sequence: 'SEND → TIMEOUT → RETRY',
    panels: [
      {
        title: 'The reply never arrived',
        paragraphs: [
          'A distributed system coordinates independent processes over a network. Network calls can time out even when the recipient has already handled them, so a retry may repeat a side effect.',
          'Imagine placing an order. The server commits the order, then the connection drops before the browser receives the reply. To the browser this looks like a failure, even though the order exists.',
        ],
      },
      {
        title: 'One intent, one key',
        paragraphs: [
          'Start by deciding which operations must be safe to retry. For a write endpoint, consider storing an idempotency key alongside the result so another request can return the same outcome.',
          'Generate a unique key for the purchase intent and reuse it if the request times out. Store it atomically with the order and use a uniqueness constraint to handle concurrent retries; reject reuse of the same key for a different payload.',
        ],
      },
      {
        title: 'Retry with a budget',
        paragraphs: [
          'Test with delayed responses, failed requests and unavailable dependencies. Observing how a system fails is as useful as knowing how it behaves when everything works.',
          'Set a deadline, cap the number of attempts, and add jitter to the delay so clients are less likely to retry together. Carry a request or trace ID across services so you can see where time was spent.',
        ],
      },
      {
        title: 'Field test: cut the connection',
        paragraphs: [
          'Simulate losing the reply just after the database commit. Send the request again with the same key, verify that only one order exists, and confirm that the retry returns the original order ID.',
        ],
      },
    ],
  },
  {
    id: 'machine-learning-fundamentals',
    title: 'Machine learning fundamentals',
    topic: 'Machine Learning',
    minutes: 7,
    style: 'mesh',
    summary: 'A practical introduction to training data, evaluation and model errors.',
    sequence: 'TRAIN → VALIDATE → TEST',
    panels: [
      {
        title: 'The examples teach the model',
        paragraphs: [
          'Machine learning models estimate patterns from examples. A model can perform well on the examples it has seen and still fail on unfamiliar data, which makes evaluation a separate job from training.',
          'Picture a moderation queue. To estimate which posts need review, a model learns from labeled examples. The labels reflect what reviewers considered actionable, so inconsistent labeling can make the model look unpredictable.',
        ],
      },
      {
        title: 'Keep the ending out of training',
        paragraphs: [
          'Keep evaluation data separate before feature selection and tuning. Pick metrics that reflect the costs of the kinds of mistakes your application can make.',
          'For a system that will score future posts, evaluate on a later time window. Fit preprocessing only on training data; avoid features that become available after the model has to make a decision.',
        ],
      },
      {
        title: 'Choose the mistake you can afford',
        paragraphs: [
          'Use a simple baseline and record the data assumptions behind the result. A model is useful only in the context in which you can evaluate its behavior.',
          'A false positive can send a good post for unnecessary review. A false negative can leave a harmful one up. Use validation data to compare thresholds and reserve the test set for a final check.',
        ],
      },
      {
        title: 'Field test: beat a simple rule',
        paragraphs: [
          'Compare the model against a simple rule at a fixed review capacity. Inspect misses across languages or topics and keep examples of failures you would want to catch when testing the next version.',
        ],
      },
    ],
  },
  {
    id: 'docker-guide',
    title: 'A practical guide to Docker',
    topic: 'DevOps',
    minutes: 8,
    style: 'boxes',
    summary: 'Build a repeatable local environment using images and containers.',
    sequence: 'BUILD → RUN → PERSIST',
    panels: [
      {
        title: 'Same image, separate worlds',
        paragraphs: [
          'An image is a packaged filesystem and configuration. A container is a running instance of an image, with a writable layer and runtime settings of its own.',
          'Start two containers from the same image. They begin with the same application files, but each gets its own writable layer. A change made inside one running container does not edit the image or the other container.',
        ],
      },
      {
        title: 'Let the build reuse its work',
        paragraphs: [
          'Pin the base image version, keep the build context small and copy dependency manifests before application source so builds can reuse layers.',
          'For a Node app, copy the package manifests, install from the lockfile, then copy the source. A source edit can then reuse the dependency layer. Use .dockerignore to leave local caches and credentials out of the build context.',
        ],
      },
      {
        title: 'Separate configuration from data',
        paragraphs: [
          'Pass runtime configuration separately from the image. Put durable application data in an appropriate database or volume, and check that a fresh checkout can recreate the environment.',
          'Provide runtime configuration when the container starts. Mount a volume or connect a database for data that must outlive the container; if data matters, verify that you can restore it from a backup.',
        ],
      },
      {
        title: 'Field test: replace the container',
        paragraphs: [
          'Write a test record, remove the container, and start a replacement with the same volume. The application should start with the same configuration and still be able to read the record.',
        ],
      },
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
