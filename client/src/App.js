import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetails from './components/CourseDetails';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';

import './global.css';
import {withContext} from './Context';
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

export default function App() {

  return (
    <BrowserRouter>
      <HeaderWithContext />

      <Switch>
        <Route exact path='/' component={Courses} />
        <Route exact path='/courses' component={Courses} />
        <PrivateRoute path="/courses/create" component={CreateCourse} />
        <PrivateRoute path ='/courses/:id/update' component={UpdateCourse} />
        <Route exact path='/courses/:id' component={CourseDetails} />
        <Route path='/signin' component={UserSignInWithContext} /> 
        <Route path='/signup' component={UserSignUpWithContext} />
        <Route path='/signout' component={UserSignOutWithContext} />
        <Route path='/notfound' component={NotFound} />
        
      </Switch>
    </BrowserRouter>
  );
}