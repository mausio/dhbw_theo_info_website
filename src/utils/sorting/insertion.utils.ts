export const insertionSort = ({ subject: subject }) => {
  const sub = [...subject];
  const output = [];
  for (let j = 1; j < sub.length; j++) {
    const key = sub[j];
    let i = j - 1;
    while (i > -1 && sub[i] > key) {
      sub[i + 1] = sub[i];
      i = i - 1;
    }
    sub[i + 1] = key;
    output.push(sub.toString().split(','));
  }
  return output;
};
