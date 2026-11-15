export function indexSearch<SearchItem>(
  items: readonly SearchItem[],
  parts: (item: SearchItem) => readonly string[],
  translate: (text: string) => string,
) {
  return items.map((item) => ({
    item,
    text: parts(item)
      .flatMap((part) => [part, translate(part)])
      .join(' ')
      .toLowerCase(),
  }));
}

export function matchSearch<SearchItem>(
  index: readonly { item: SearchItem; text: string }[],
  query: string,
  include: (item: SearchItem) => boolean = () => true,
) {
  const needle = query.toLowerCase();
  return index
    .filter(({ item, text }) => include(item) && text.includes(needle))
    .map(({ item }) => item);
}
