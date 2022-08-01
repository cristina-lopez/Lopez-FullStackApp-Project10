import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
//import { Provider } from './Context';
import Header from './components/Header';
import Courses from './components/Courses';
//import CreateCourse from './components/CreateCourse';
//import UpdateCourse from './components/UpdateCourse';
import CourseDetails from './components/CourseDetails';
import UserSignIn from './components/UserSignIn';
//import UserSignUp from './components/UserSignUp';
//import UserSignOut from './components/UserSignOut';
//import config from './components/config';
import './global.css';
//import { useState } from 'react';
//import { withContext } from './Context';

//const CoursesWithContext = withContext(Courses);

export default function App() {

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={Courses} />
        <Route exact path='/courses' component={Courses} />
        {/* <Route path ='/courses/create' component={CreateCourse} /> */}
        {/* <Route path ='/courses/:id/update' component={UpdateCourse} />  */}
        <Route path='/courses/:id' component={CourseDetails} />
        <Route path='/signin' component={UserSignIn} /> 
        {/*<Route path='signup' component={UserSignUp} />  */}
        {/*<Route path='signout' component={UserSignOut} /> */}
      </Switch>
      <div className="App">
        <header className="App-header">
          <img className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div> 
    </BrowserRouter>
  );
}
