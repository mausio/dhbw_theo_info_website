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