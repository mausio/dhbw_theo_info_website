import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navigation.component.tsx';
import HomePage from './pages/home.page.tsx';
import FourOfourPage from './pages/fourOfour.page.tsx';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<NavigationBar key={'NavigationBar'} />}>
        <Route index element={<HomePage />} />
        <Route path={'*'} element={<FourOfourPage />} />
      </Route>
    </Routes>
  );
}

export default App;
