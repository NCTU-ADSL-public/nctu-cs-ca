import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login/Login';
import Head from './Head/Head';
import TeacherHead from './TeacherHead/Head';


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"



const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Login}/>
      <Route exact path='/students/head' component={Head}/>
      <Route exact path='/teachers/head' component={TeacherHead}/>
    </Switch>
  </main>
);


export default Main;