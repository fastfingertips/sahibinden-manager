export const getOrCreateToolbarContainer = (): HTMLElement | null => {
  const searchResults = document.querySelector('#searchResultsTable, #searchResultsGallery');
  if (!searchResults) {
    const existing = document.querySelector('.sm-toolbar-actions-group');
    if (existing) existing.remove();
    return null;
  }

  let group = document.querySelector<HTMLElement>('.sm-toolbar-actions-group');
  if (group && document.body.contains(group)) return group;

  // 1. Birincil Hedef: Sahibinden native toolbar barı (.searchResultSorted)
  const sortedBar = document.querySelector<HTMLElement>('.searchResultSorted');
  if (sortedBar) {
    group = document.createElement('div');
    group.className = 'sm-toolbar-actions-group';
    const sortedTypes = sortedBar.querySelector('.sortedTypes');
    if (sortedTypes) {
      sortedBar.insertBefore(group, sortedTypes);
    } else {
      sortedBar.appendChild(group);
    }
    return group;
  }

  // 2. Yedek Hedef: Sonuç bilgi ve sayaç alanı (.infoSearchResults)
  const fallback = document.querySelector<HTMLElement>(
    '.infoSearchResults, .searchResultsTitleBox, .searchResultsRight',
  );
  if (fallback) {
    group = document.createElement('div');
    group.className = 'sm-toolbar-actions-group sm-toolbar-fallback';
    fallback.appendChild(group);
    return group;
  }

  return null;
};
