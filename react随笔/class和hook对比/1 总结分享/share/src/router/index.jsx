import React from 'react';
import {HashRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Home from '../pages/home';
import Test1 from "../pages/test1";
import Test2 from "../pages/test2";
import Test3 from "../pages/test3";
import Test4 from "../pages/test4";
import Test5 from "../pages/test5";
import Test6 from "../pages/test6";
import Test7 from "../pages/test7";
import Test8 from "../pages/test8";
import Test9 from "../pages/test9";
import Test11 from "../pages/test11";
import Test12 from "../pages/test12";

const Routers = () => {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Navigate to="/home" />} />
                <Route exact path='/home' element={<Home />} >
                    <Route exact path='/home/test1' element={<Test1 />} />
                    <Route exact path='/home/test2' element={<Test2 />} />
                    <Route exact path='/home/test3' element={<Test3 />} />
                    <Route exact path='/home/test4' element={<Test4 />} />
                    <Route exact path='/home/test5' element={<Test5 />} />
                    <Route exact path='/home/test6' element={<Test6 />} />
                    <Route exact path='/home/test7' element={<Test7 />} />
                    <Route exact path='/home/test8' element={<Test8 />} />
                    <Route exact path='/home/test9' element={<Test9 />} />
                    <Route exact path='/home/test11' element={<Test11 />} />
                    <Route exact path='/home/test12' element={<Test12 />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default Routers;