import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Login from './Pages/Login/Login'
import TeacherHead from './Pages/Teachers/Head'
import Head from './Pages/Students/Head'
import AssistantHead from './Pages/Assistants/Head'
import StudentDetail from './Pages/Assistants/Graduation/StudentDetail'
import Footer from './Components/Footer'

injectTapEventPlugin()

const Router = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path='/' component={Login} />
        {/* students route */}
        <Route exact path='/students/head' component={Head} />
        {/*<Route exact path='/students/head/home' component={Head} />*/}
        {/*<Route exact path='/students/head/grad' component={Head} />*/}
        {/*<Route exact path='/students/head/map' component={Head} />*/}
        {/*<Route exact path='/students/head/professor' component={Head} />*/}
        {/*<Route exact path='/students/head/project' component={Head} />*/}

        <Route exact path='/teachers/head' component={TeacherHead} />
        <Route exact path='/assistants/head' component={AssistantHead} />
        <Route exact path='/assistants/head/s/:sid' component={StudentDetail} />
      </Switch>
      <Route path='/' component={Footer} />
      <div id='printArea' />
    </div>
  </BrowserRouter>
)

export default Router
