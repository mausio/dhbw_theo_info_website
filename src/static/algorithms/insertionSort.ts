export const insertionSortAlgo = `
// input array A index starts at 1
function InsertionSort(A) {
    for (let p = 2; p <= A.length; p++) {
      let key = A[p];
      let i = p - 1;
      while (i > 0 && A[i] > key) {
        A[i + 1] = A[i];
        i--;
      }
      A[i + 1] = key;
    }
}
`; 