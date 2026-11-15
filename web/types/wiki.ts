export const wikiKinds = ['Article', 'Historical figure', 'Famous'] as const;
export type WikiKind = (typeof wikiKinds)[number];
export type WikiEntry = {
  id: string;
  kind: WikiKind;
  title: string;
  summary: string;
  body: string;
};
