//Routes.js
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../Home';
import {NotFoundPage, LoginPage, RegisterPage, TablePage} from '../pages';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
