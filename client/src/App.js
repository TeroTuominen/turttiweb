import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar/Navbar';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import Register from './Pages/Register/Register';
import AppContext from './Contexts/AppContext';
import './Components/Form/Form.css';
import './Components/Page/Page.css';
import './Components/CommonCss/List.css';
import CreateCategory from './Pages/Category/CreateCategory';
import HttpClient from './Pages/Services/HttpClient';
import CreateForum from './Pages/Forum/Create/CreateForum';
import ShowCategory from './Pages/Category/Show/ShowCategory';
import CreateThread from './Pages/Forum/Create/CreateThread';
import ShowForum from './Pages/Category/Show/ShowForum';
import ShowThread from './Pages/Category/Show/ShowThread';


function App() {
    const [isInitiated, setIsInitiated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        init();
    }, []);

    const logout = () => {
        setUser(null);
        localStorage.setItem('token', null);
    };

    const init = async () => {
        try {
            const { data } = await HttpClient().get('/api/user/init');
            setUser(data.user);
            setIsInitiated(true);
        } catch (error) {
            // Handle error, e.g., redirect to login page
            setIsInitiated(true);
        }
    };

    const PrivateRoute = ({ element, ...props }) => {
        if (!user) {
            // Redirect to login page if the user is not logged in
            return <Navigate to="/auth/login" />;
        }
        return element;
    };

    return (
        <div>
            {isInitiated && (
                <AppContext.Provider value={{ user, setUser, logout }}>
                    <Router>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<PrivateRoute element={<Home />} />} />
                            <Route path="/auth/login" element={<Login />} />
                            <Route path="/auth/register" element={<Register />} />
                            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
                            <Route path="/category/create" element={<PrivateRoute element={<CreateCategory />} />} />
                            <Route path="/category/:id" element={<ShowCategory />} />
                            <Route path="/forum/create/:categoryId" element={<PrivateRoute element={<CreateForum />} />} />
                            <Route path="/forum/:id" element={<ShowForum />} />
                            <Route path="/forum/:forumId/create-thread" element={<PrivateRoute element={<CreateThread />} />} />
                            <Route path="/thread/:id" element={<ShowThread />} />
                        </Routes>
                    </Router>
                </AppContext.Provider>
            )}
        </div>
    );
}

export default App;
