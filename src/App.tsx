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
import './translation/i18next.ts';
import { LeaderboardProvider } from './context/LeaderboardContext';
import { CommentsProvider } from './context/comments.context';
import { UserProvider } from './context/user.context';

//TODO: Still development needed:
// => Responsiveness for all pages
// => Algorithm quiz is not showing the number of correct answers (around double the correct answers)


function App() {
  return (
    <LeaderboardProvider>
      <UserProvider>
        <CommentsProvider>
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
        </CommentsProvider>
      </UserProvider>
    </LeaderboardProvider>
  );
}

function RedirectExternalImprint() {
  useEffect(() => {
    window.location.replace(APP_ROUTES.imprint);
  }, []);
  return null;
}

export default App;
