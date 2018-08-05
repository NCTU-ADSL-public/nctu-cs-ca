import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Frame from './Components/Frame'
import Login from './Pages/Login/Login'
import TeacherHead from './Pages/Teachers/Head'
import Head from './Pages/Students/Head'
import AssistantHead from './Pages/Assistants/Head'
import AssistantHome from './Pages/Assistants/Home'
import AssistantGrad from './Pages/Assistants/Graduation'
import AssistantProject from './Pages/Assistants/Project'
import AssistantMail from './Pages/Assistants/Mail'
import StudentDetail from './Pages/Assistants/Graduation/StudentDetail'
import StudentList from './Pages/Assistants/Family/StudentList'
import TeacherList from './Pages/Assistants/Family'
import Footer from './Components/Footer'

injectTapEventPlugin()

const Router = () => (
  <BrowserRouter>
    <div>
      <Route path='/assistants' component={AssistantHead} />
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
        
        <Route exact path='/assistants/head' render={()=><Frame><AssistantHome/></Frame>} />
        <Route exact path='/assistants/grad' render={()=><Frame><AssistantGrad/></Frame>} />
        <Route exact path='/assistants/project' render={()=><Frame><AssistantProject/></Frame>} />
        <Route exact path='/assistants/family' render={()=><Frame><TeacherList/></Frame>} />
        <Route exact path='/assistants/family/:tid' component={StudentList} />
        <Route exact path='/assistants/mail' render={()=><Frame><AssistantMail/></Frame>} />
        <Route exact path='/assistants/head/s/:sid' component={StudentDetail} />

      </Switch>
      <Route path='/' component={Footer} />
      <div id='printArea' />
    </div>
  </BrowserRouter>
)

export default Router
