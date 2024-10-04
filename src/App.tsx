import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navigation.component.tsx';
import HomePage from './pages/home.page.tsx';

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<NavigationBar />}>
                <Route index element={<HomePage />} />
            </Route>
        </Routes>
    );
}

export default App;
