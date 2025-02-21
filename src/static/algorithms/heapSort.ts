export const heapSortAlgo = `
//array index starts at 1
function HeapSort(A) {
    BuildMaxHeap(A)
    for (i=A.length downto 2) {
        exchange A[1] with A[i]
        A.heap-size = A.heap-size -1
        MaxHeapify(A, 1)
    }
}

function BuildMaxHeap(A) {
    A.heap-size = A.length
    for (i= Math.floor(A.length/2) downto 1) {
        MaxHeapify(A, i)
    }
}

function MaxHeapify(A, i) {
    r=RIGHT(i)
    l=LEFT(i)
    if (l<=A.heap_size && A[l]>A[i]) {
        largest=l
    }
    else {
      largest=i
    }
    if (r<=A.heap_size && A[r]>A[largest]) {
        largest=r
    }
    if (largest!=i) {
        exchange A[i] with A[largest]
        MaxHeapify(A, largest)
    }
}    
`; 