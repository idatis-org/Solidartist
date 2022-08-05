import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from 'context/UserContext';

import Header from 'components/Header'
import Register from 'pages/Register'
import Login from 'pages/Login'
import Home from 'pages/Home'
import Profile from 'pages/Profile'

import 'bootstrap/dist/css/bootstrap.min.css';

import useUser from 'hooks/useUser';
import Artists from 'pages/Artists';
import Art_Detail from 'pages/Art_Detail';

function App() {
  const { token } = useUser();

  return (
    <div className="App">
      <UserContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/:alias"
              element={<Profile />}
            />
            <Route
              path="/user/:alias"
              element={<Profile />}
            />
            <Route
              path="/artists"
              element={<Artists />}
            />
             <Route
              path="/artDetail/:id"
              element={<Art_Detail />}
            />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
