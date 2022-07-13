import { Navigate, Route, Routes } from 'react-router-dom';
import HomeScreen from '../screens/HomeScreen';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route path='/:planId' element={<HomeScreen />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}
