export const insertionSort = ({ subject: subject }) => {
  const sub = [...subject];
  const output = [];

  for (let j = 1; j < sub.length; j++) {
    //starts a position 02 (from 1 to 10)
    const key = sub[j]; //sets the key for the j-th element
    let i = j - 1; //sets the first comparison to j-1-th element

    while (i >= 0 && sub[i] > key) {
      //while, when the element beneath the key is smaller & i >= 0
      sub[i + 1] = sub[i]; //move the i-th element one position higher
      i = i - 1; //lower i by one
    }

    sub[i + 1] = key; // assign the new position by i+1
    output.push(sub.toString().split(','));
  }

  return output;
};
