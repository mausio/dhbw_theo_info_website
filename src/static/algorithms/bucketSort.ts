export const bucketSortAlgo = `
function BUCKET-SORT(A,n){
  let i = 0 to n-1
      make B[i] an empty list
      
  for i = 1 to n
      insert A[i] into list B[[n*A[i]]
  
  for i = 0 to n-1
      sort list B[i] with insertion sort
      
  concatenate the lists B[0], B[1], ...
  ..., B[n-1] together in order
  
  return the concatenated list 
`; 