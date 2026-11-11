export interface Contribution {
  title: string;
  description: string;
  url: string;
}

export interface PublicLink {
  label: string;
  kind: 'github' | 'social' | 'website';
  url: string;
}

export interface ProfileEvidenceData {
  contributions: [Contribution, ...Contribution[]];
  links: PublicLink[];
}
