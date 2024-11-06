export const quickSortAlgo = `
//array index starts at 1
function QuickSort(A, start, end) {
  if (start < end) {
      q = Partition(A, start, end)
      QuickSort(A, start, q-1)
      QuickSort(A, q+1, end)
  }
}

function Partition(A, start, end) {
  x = A[end]
  i = start-1
  for (j = start to end-1) {
      if (A[j] <= x) {
          i = i + 1
          exchange A[i] with A[j]
      }
  }
  exchange A[i+1] with A[end]
  return i+1
}
`;

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

export const mergeSortAlgo = `
//array index starts at 1
function MergeSort(A, p, r) {
  if (p < r) {
    q= Math.floor((p+r)/2)
    MergeSort(A, p, q)
    MergeSort(A, q+1, r)
    Merge(A, p, q, r)
  }
}

function Merge(A, p, q, r) {
  n1 = q-p+1
  n2 = r-q
  let L[1.. n1+1] and R[1.. n2+1] be new arrays
  for (i = 1 to n1) {
        L[i] = A[p+i-1]
  }
  for (j = 1 to n2) {
      R[j] = A[q+j]
  }
  L[n1+1] = INFINITY
  R[n2+1] = INFINITY
  i = 1
  j =1
  for (k = p to r) {
      if (L[i] <= R[j]) {
        A[k] = L[i]
        i = i + 1
      }
      else {
        A[k] = R [j]
        j = j +1
      }
  }
}
`;
