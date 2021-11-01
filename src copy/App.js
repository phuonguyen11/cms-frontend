import {
  Switch,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.scss';

//import AOS from 'aos';
import { focusHandling } from 'cruip-js-toolkit';
import React,{ useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Contact from './pages/Contact';
import Help from './pages/Help';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import PageNotFound from './pages/PageNotFound';

function App() {

  const location = useLocation();
  const [blogs, setBlogs] = useState([]);
  useEffect(()=>{
    // link back end có thể vào google seach  https://qametroi.herokuapp.com/Blogs sẽ ra data theo json
    axios.get('https://qametroi.herokuapp.com/Blogs')
    .then((response)=>{
      // set vào blogs 
      setBlogs(response.data);

      // thử console.log(response.data) để thấy dc thông tin get dc
    })
  },[])
  console.log(blogs)
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
    focusHandling('outline');
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/features">
          <Features />
        </Route>
        <Route path="/pricing">
          <Pricing />
        </Route>
        <Route path="/blog">
          
          <Blog />
        </Route>
        <Route path="/blog-post">
          <BlogPost />
          <div className="App">
          {/* dùng vòng lặp để map qua để ý mình */}
          {blogs.map(blog => (
            <div key={blog.id}>
            <h1>{blog.title}</h1>
            <h1>{blog.content}</h1>
            </div>
          ))}
        </div>
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/help">
          <Help />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/reset-password">
          <ResetPassword />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </>
    
        
      );
    }
    
    



export default App;
