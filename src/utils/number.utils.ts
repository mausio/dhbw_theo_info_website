export const generateRandomArrayOfN = (n: number) => {
  const array: number[] = [];
  for (let i = 0; i < n; i++) {
    let n;
    do {
      n = Math.floor(Math.random() * 99) + 1;
    } while (array.includes(n));
    array.push(n);
  }
  return array;
};

export const isEven = (num) => num % 2 === 0;

export const calcArrayTaskContainerHeight = (num: number, height: number) => {
  return isEven(num) ? (num / 2) * height : ((num + 1) / 2) * height;
};
