import React from 'react';
import './App.css';
import {Home} from './components/pages/Home/Home';
import {Route, Routes} from 'react-router-dom';
import {Users} from './components/pages/Users/Users';

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/user/:login'} element={<Users/>}/>
        </Routes>
    );
}

export default App;
