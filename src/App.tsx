import { Route, Router, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import { BlogsList } from './components/BlogsList';
import Header from './components/Header';
import { BlogForm } from './components/BlogForm';
import { BlogDetails } from './components/BlogsDetails';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<BlogsList />} />
        <Route path="/blogs" element={<BlogsList />} />
        <Route path="/create" element={<BlogForm />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
