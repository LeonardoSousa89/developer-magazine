import type { ProfileEvidenceData } from '../types/evidence';

export const profileEvidence = {
  turing: {
    contributions: [
      {
        title: 'Turing machine',
        description: 'Formalized a model of computation and the limits of algorithms.',
        url: 'https://en.wikipedia.org/wiki/Turing_machine',
      },
      {
        title: 'Bombe',
        description:
          'Co-designed a machine used to help break Enigma-encrypted messages.',
        url: 'https://en.wikipedia.org/wiki/Bombe',
      },
    ],
    links: [],
  },
  hamilton: {
    contributions: [
      {
        title: 'Apollo flight software',
        description: 'Led the MIT team developing onboard guidance software for Apollo.',
        url: 'https://science.nasa.gov/people/margaret-hamilton/',
      },
      {
        title: 'Universal Systems Language',
        description:
          'Developed a systems language and a preventive approach to software design.',
        url: 'https://en.wikipedia.org/wiki/Universal_Systems_Language',
      },
    ],
    links: [],
  },
  carmack: {
    contributions: [
      {
        title: 'Doom engine',
        description: 'Lead programming and rendering technology for id Software’s Doom.',
        url: 'https://github.com/id-Software/DOOM',
      },
      {
        title: 'Quake engine',
        description: 'Helped advance real-time 3D game engines as lead programmer.',
        url: 'https://github.com/id-Software/Quake',
      },
    ],
    links: [
      { label: 'X · @ID_AA_Carmack', kind: 'social', url: 'https://x.com/ID_AA_Carmack' },
    ],
  },
  hopper: {
    contributions: [
      {
        title: 'A-0 System',
        description: 'Developed an early compiler system for the UNIVAC I.',
        url: 'https://en.wikipedia.org/wiki/A-0_System',
      },
      {
        title: 'FLOW-MATIC & COBOL',
        description: 'Led FLOW-MATIC development; her work helped shape COBOL.',
        url: 'https://en.wikipedia.org/wiki/FLOW-MATIC',
      },
    ],
    links: [],
  },
  torvalds: {
    contributions: [
      {
        title: 'Linux kernel',
        description: 'Created the kernel and leads its collaborative development.',
        url: 'https://github.com/torvalds/linux',
      },
      {
        title: 'Git',
        description: 'Created the distributed version control system in 2005.',
        url: 'https://git-scm.com/',
      },
    ],
    links: [
      { label: 'GitHub · torvalds', kind: 'github', url: 'https://github.com/torvalds' },
    ],
  },
  lovelace: {
    contributions: [
      {
        title: 'Note G · Bernoulli numbers',
        description:
          'Published a method for calculating Bernoulli numbers on the Analytical Engine.',
        url: 'https://en.wikipedia.org/wiki/Note_G',
      },
      {
        title: 'Analytical Engine notes',
        description:
          'Explored how a general-purpose machine could work with more than numbers.',
        url: 'https://www.computerhistory.org/babbage/adalovelace/',
      },
    ],
    links: [],
  },
} satisfies Record<string, ProfileEvidenceData>;
