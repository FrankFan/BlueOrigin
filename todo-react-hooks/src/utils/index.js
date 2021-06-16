export function getMaxId(arr) {
  let maxId = 0;
  arr.forEach((item) => {
    if (+item.id > +maxId) {
      maxId = item.id;
    }
  });
  return maxId;
}

export function pluralize(word, count) {
  return word + (count === 1 ? '' : 's');
}

export function getHash() {
  return window.location.hash.replace(/#\/?/, '');
}
