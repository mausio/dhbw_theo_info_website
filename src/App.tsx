import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/general/navigation.component.tsx';
import HomePage from './pages/general/home.page.tsx';
import FourOfourPage from './pages/general/fourOfour.page.tsx';
import { APP_ROUTES } from './routes/routes.ts';
import { useEffect } from 'react';
import InsertionSortPage from './pages/sorting/InsertionSort.page.tsx';
import MergeSortPage from './pages/sorting/MergeSort.page.tsx';
import QuickSortPage from './pages/sorting/QuickSort.page.tsx';

//TODO: uninstall all unused packages

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<NavigationBar key={'NavigationBar'} />}>
        <Route index element={<HomePage />} />
        <Route path={APP_ROUTES.sorting.insertion} element={<InsertionSortPage />} />
        <Route path={APP_ROUTES.sorting.merge} element={<MergeSortPage />} />
        <Route path={APP_ROUTES.sorting.quick} element={<QuickSortPage />} />
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
