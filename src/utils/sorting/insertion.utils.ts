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

//
// const performAnimatedInsertionSort = async () => {
//   setIsAnimated(true);
//   setIsSorting(true);
//   setIsManual(false);
//   animatedRequestRef.current = true;
//   exitRequestRef.current = false; // Reset stopRequestedRef
//   const sortedBars = [...bars];
//   const newPositions = [...positions];
//
//   for (let j = 1; j < sortedBars.length; j++) {
//     const key = sortedBars[j];
//     setKey(key);
//     setSelectedIndex(j);
//     setKeyIndex(j);
//     await new Promise((resolve) => setTimeout(resolve, delay / speedRequestRef.current));
//
//     if (pauseRequestRef.current) {
//       await performPause();
//     }
//
//     let i = j - 1;
//
//     setComparingIndex(i);
//     await new Promise((resolve) => setTimeout(resolve, delay / speedRequestRef.current));
//
//     if (pauseRequestRef.current) {
//       await performPause();
//     }
//
//     while (i >= 0) {
//       if (sortedBars[i] < key) {
//         break;
//       }
//       setSelectedIndex(i + 1);
//       setComparingIndex(i);
//       await new Promise((resolve) => setTimeout(resolve, delay / speedRequestRef.current));
//
//       sortedBars[i + 1] = sortedBars[i];
//       newPositions[i + 1] = newPositions[i];
//
//       setBars([...sortedBars]);
//       setPositions([...newPositions]);
//
//       if (pauseRequestRef.current) {
//         await performPause();
//       }
//
//       await new Promise((resolve) => setTimeout(resolve, delay / speedRequestRef.current));
//
//       if (pauseRequestRef.current) {
//         await performPause();
//       }
//       i--;
//     }
//
//     sortedBars[i + 1] = key;
//     newPositions[i + 1] = key;
//
//     setBars([...sortedBars]);
//     setPositions([...newPositions]);
//
//     if (exitRequestRef.current) {
//       animatedRequestRef.current = false;
//       makeChartInactive();
//       break;
//     } else if (pauseRequestRef.current) {
//       await performPause();
//     }
//
//     await new Promise((resolve) => setTimeout(resolve, delay / speedRequestRef.current));
//
//     setComparingIndex(null);
//
//     if (pauseRequestRef.current) {
//       await performPause();
//     }
//   }
//
//   makeChartInactive();
//   setIsSorted(false);
//   setIsSorting(false);
//   setIsAnimated(false);
// };
