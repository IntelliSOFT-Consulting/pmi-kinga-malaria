import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '@/Layouts/AppLayout';
import Login from '@/Pages/Login';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path='/*' element={<AppLayout />} />
    </Routes>
  );
}

export default App;
