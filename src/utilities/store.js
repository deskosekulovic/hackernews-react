let cacheIds = JSON.parse(sessionStorage.getItem('cacheIds')) || {};

const saveIds = (name, ids) => {
  cacheIds = { ...cacheIds, [name]: ids, [`${name} timeStamp`]: Date.now() };
  sessionStorage.setItem('cacheIds', JSON.stringify(cacheIds));
};

let cacheItems = JSON.parse(sessionStorage.getItem('cacheItems')) || {};

const saveItems = item => {
  item.map(i => (cacheItems[i.id] = i));
  sessionStorage.setItem('cacheItems', JSON.stringify(cacheItems));
};

export const store = {
  saveIds,
  saveItems
};
