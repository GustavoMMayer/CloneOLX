import React from 'react';
import { Routes, Route} from 'react-router-dom';

import RouteHandler from './components/RouteHandler'

import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdPage from './pages/AdPage';
import AddAd from './pages/AddAd';

export default () => {
    return (
        
            <Routes>
                <Route path="/" element={<Home/>}/>                            
                <Route path="/about" element={<About/>}/>              
                
                <Route path="/signin" element={<SignIn />}/>                
            
                <Route path="/signup" element={<SignUp />}/>                
                
                <Route path="/ad/:id" element={<AdPage />}/>                
                
                <Route path="/post-an-ad" element={<AddAd />}/>                
                
                <Route path='*' element={<NotFound />}/>               
                
            </Routes>
        


       /* <Routes>
            <RouteHandler path="/" element={<Home/>}/>                            
            <RouteHandler path="/about" element={<About/>}/>              
            
            <RouteHandler path="/signin" element={<SignIn />}/>                
           
            <RouteHandler path="/signup" element={<SignUp />}/>                
            
            <RouteHandler path="/ad/:id" element={<AdPage />}/>                
            
            <RouteHandler private path="/post-an-ad" element={<AddAd />}/>                
            
            <RouteHandler element={<NotFound />}/>               
            
        </Routes>*/
    );
}