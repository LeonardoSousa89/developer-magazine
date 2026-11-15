import brand from './public/media/brand.webp';
import mark from './public/media/mark.webp';
import carmack from './public/media/carmack.webp';
import hamilton from './public/media/hamilton.webp';
import hopper from './public/media/hopper.webp';
import leonardo from './public/media/Leo.jpg';
import lovelace from './public/media/lovelace.webp';
import torvalds from './public/media/torvalds.webp';
import turing from './public/media/turing.webp';

export const branding = {
  logo: brand.src,
  favicon: mark.src,
};

export const portraits = new Map<string, string>([
  ['carmack', carmack.src],
  ['hamilton', hamilton.src],
  ['hopper', hopper.src],
  ['leonardo-sousa', leonardo.src],
  ['lovelace', lovelace.src],
  ['torvalds', torvalds.src],
  ['turing', turing.src],
]);
