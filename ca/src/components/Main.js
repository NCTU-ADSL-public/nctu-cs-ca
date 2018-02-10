import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './Login/Login'
import TeacherHead from './TeacherHead/Head'
import Head from './Head/Head'
import AssistantHead from './AssistantHead/Head'
import StudentDetail from './AssistantHead/Graduation/StudentDetail'
import Footer from './Components/Footer'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"

const Main = () => (
  <main>
      <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/students/head' component={Head} />
          <Route exact path='/teachers/head' component={TeacherHead} />
          <Route exact path='/assistants/head' component={AssistantHead} />
          <Route exact path='/assistants/head/s/:sid' component={StudentDetail} />
      </Switch>
      <Route path='/' component={Footer}/>
  </main>
)

export default Main
