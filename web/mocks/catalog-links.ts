export const profileUrls: Partial<Record<string, string>> = {
  'leonardo-sousa': 'https://leonardosousa.dev.br/pt',
  turing: 'https://en.wikipedia.org/wiki/Alan_Turing',
  hamilton: 'https://en.wikipedia.org/wiki/Margaret_Hamilton_(software_engineer)',
  carmack: 'https://en.wikipedia.org/wiki/John_Carmack',
  hopper: 'https://en.wikipedia.org/wiki/Grace_Hopper',
  torvalds: 'https://en.wikipedia.org/wiki/Linus_Torvalds',
  lovelace: 'https://en.wikipedia.org/wiki/Ada_Lovelace',
};

export const projectUrls: Partial<Record<string, { url: string; source?: string }>> = {
  howmanytime: { url: 'https://howmanytime.app/' },
  linux: {
    url: 'https://www.kernel.org/',
    source: 'https://github.com/torvalds/linux',
  },
  react: {
    url: 'https://react.dev/',
    source: 'https://github.com/facebook/react',
  },
  postgresql: {
    url: 'https://www.postgresql.org/',
    source: 'https://github.com/postgres/postgres',
  },
  node: {
    url: 'https://nodejs.org/',
    source: 'https://github.com/nodejs/node',
  },
  docker: {
    url: 'https://www.docker.com/',
    source: 'https://github.com/moby/moby',
  },
  tensorflow: {
    url: 'https://www.tensorflow.org/',
    source: 'https://github.com/tensorflow/tensorflow',
  },
  git: {
    url: 'https://git-scm.com/',
    source: 'https://github.com/git/git',
  },
  doom: {
    url: 'https://github.com/id-Software/DOOM',
    source: 'https://github.com/id-Software/DOOM',
  },
};

export const articleUrls: Partial<Record<string, string>> = {
  'evolution-of-the-web':
    'https://developer.mozilla.org/en-US/docs/Learn_web_development',
  'distributed-systems':
    'https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/',
  'machine-learning-fundamentals':
    'https://developers.google.com/machine-learning/crash-course',
  'docker-guide': 'https://docs.docker.com/get-started/',
};
