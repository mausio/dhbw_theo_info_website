import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/general/navigation.component.tsx';
import HomePage from './pages/general/home.page.tsx';
import FourOfourPage from './pages/general/fourOfour.page.tsx';
import { APP_ROUTES } from './routes/routes.ts';
import { useEffect } from 'react';
import InsertionSortPage from './pages/sorting/InsertionSort.page.tsx';
import MergeSortPage from './pages/sorting/MergeSort.page.tsx';
import QuickSortPage from './pages/sorting/QuickSort.page.tsx';
import CountingSortPage from './pages/sorting/CountingSort.page.tsx';
import BucketSortPage from './pages/sorting/BucketSort.page.tsx';
import RadixSortPage from './pages/sorting/RadixSort.page.tsx';
import HeapSortPage from './pages/sorting/HeapSort.page.tsx';

// Eine TODO-Liste
//TODO: uninstall all unused packages
//TODO: Translation of whole website
//TODO: Responsive Design
//TODO: Check ALL Sorting Algos for bugs!
//TODO: Delete Dead/Unused Code
//TODO: Naming Scheme anpassen in Code (überall)
//TODO: Check all Algorithms for correctness (seems like they all differ in their pseudo style => look at book)
//TODO: Refactor Generic Styled Components into other files, e.g. "ControlPanel" is under "insertion.style" but should be generic
//TODO: Set keys for lists
//TODO: Create Standard Messages for e.g. "Shuffling", "Shuffling finished. Sort!", etc.
//TODO: Centralize Data at one place, e.g. "InitialData" => "CountingSortInitialData", etc.
//TODO: Apply "user-select: none" everywhere, e.g. "SortableItem", Iterations, Buttons etc.
//TODO: Make the Control Panel a own component, make it generic and prop the getter and setter

//TODO: Li-Deal?
// Sorting Algos finished, Translation, Responsiveness, Progress Display (e.g. 0/2 done), Documentation for following Student, GAMIFICATION,
// => Aim: No worsening of grade
// => 6000 Zeilen geschrieben bereits

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<NavigationBar key={'NavigationBar'} />}>
        <Route index element={<HomePage />} />
        <Route path={APP_ROUTES.sorting.insertion} element={<InsertionSortPage />} />
        <Route path={APP_ROUTES.sorting.merge} element={<MergeSortPage />} />
        <Route path={APP_ROUTES.sorting.quick} element={<QuickSortPage />} />
        <Route path={APP_ROUTES.sorting.counting} element={<CountingSortPage />} />
        <Route path={APP_ROUTES.sorting.bucket} element={<BucketSortPage />} />
        <Route path={APP_ROUTES.sorting.radix} element={<RadixSortPage />} />
        <Route path={APP_ROUTES.sorting.heap} element={<HeapSortPage />} />
        <Route path={'*'} element={<FourOfourPage />} />
        <Route path={APP_ROUTES.imprint} element={<RedirectExternalImprint />} />
      </Route>
    </Routes>
  );
}

function RedirectExternalImprint() {
  useEffect(() => {
    window.location.replace(APP_ROUTES.imprint);
  }, []);
  return null;
}

export default App;
