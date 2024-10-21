import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navigation.component.tsx';
import HomePage from './pages/home.page.tsx';
import FourOfourPage from './pages/fourOfour.page.tsx';
import { APP_ROUTES } from './routes/routes.ts';
import { useEffect } from 'react';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<NavigationBar key={'NavigationBar'} />}>
        <Route index element={<HomePage />} />
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
