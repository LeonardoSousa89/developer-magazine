import type { PortraitCredit } from '../types/media-credit';

export const portraitCredits: Partial<Record<string, PortraitCredit>> = {
  turing: {
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Alan_Turing_Aged_16.jpg',
    author: 'Possibly Arthur Reginald Chaffin',
    license: 'Public domain',
  },
  hamilton: {
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Margaret_Hamilton_-_restoration.jpg',
    author: 'Adam Cuerden (restoration)',
    license: 'Public domain',
  },
  carmack: {
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:John_Carmack_2025.jpg',
    author: 'RoboSabs',
    license: 'CC0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
  },
  hopper: {
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Grace_Hopper_and_UNIVAC.jpg',
    author: 'Unknown author',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
  },
  torvalds: {
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:LinuxCon_Europe_Linus_Torvalds_03_(cropped).jpg',
    author: 'Krd (photo), Von Sprat (crop)',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
  lovelace: {
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ada_Lovelace_portrait.jpg',
    author: 'Alfred Edward Chalon',
    license: 'Public domain',
  },
};
