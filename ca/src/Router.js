import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Frame from './Components/Frame'
import Login from './Pages/Login/Login'

import TeacherHead from './Pages/Teachers/Head'
import TeacherHome from './Pages/Teachers/Home'
import TeacherGroup from './Pages/Teachers/Group/Group'

import Head from './Pages/Students/Head'
import AssistantHead from './Pages/Assistants/Head'
import AssistantHome from './Pages/Assistants/Home'
import AssistantGrad from './Pages/Assistants/Graduation_v2'
import AssistantProject from './Pages/Assistants/Project_v3'
import AssistantVerify from './Pages/Assistants/Verify'
import AssistantMail from './Pages/Assistants/Mail'

import StudentDetail from './Components/StudentDetail'
import StudentList from './Pages/Assistants/Family/StudentList'
import TeacherList from './Pages/Assistants/Family'

import StudentHome from './Pages/Students/Home/Home'
import StudentGrad from './Pages/Students/Graduation_v2'

import StudentCredit from './Pages/Students/Credit'
//import StudentMap from './Pages/Students/Map_v2'
import StudentMap from './Pages/Students/Map_v3'
import StudentProject from './Pages/Students/ProjectList'
import StudentProfessor from './Pages/Students/Mentor'
import Footer from './Components/Footer'

import AutoLogout from './Components/AutoLogout'

injectTapEventPlugin()

const Router = () => (
  <BrowserRouter>
    <div>
      <Route path='/assistants' component={AssistantHead} />
      <Route path='/students' component={Head} />
      <Route path='/teachers' component={TeacherHead} />
      <Switch>
        <Route exact path='/' component={Login} />
        {/* students route */}
        <Route exact path='/students/head/' render={() => <StudentHome />} />
        <Route exact path='/students/grad' render={() => <StudentGrad />} />
        <Route exact path='/students/map' render={() => <StudentMap />} />
        <Route exact path='/students/professor' render={() => <StudentProfessor />} />
        <Route exact path='/students/project' render={() => <StudentProject />} />
        <Route exact path='/students/credit' render={() => <StudentCredit />} />

        <Route exact path='/teachers/head' component={TeacherHome} />
        <Route exact path='/teachers/group' component={TeacherGroup} />

        <Route exact path='/assistants/head' render={() => <Frame><AssistantHome /></Frame>} />
        <Route exact path='/assistants/grad' render={() => <Frame><AssistantGrad /></Frame>} />
        <Route exact path='/assistants/project' render={() => <Frame><AssistantProject /></Frame>} />
        <Route exact path='/assistants/family' render={() => <Frame><TeacherList /></Frame>} />
        <Route exact path='/assistants/family/:tid' component={StudentList} />
        <Route exact path='/assistants/verify' component={AssistantVerify} />
        <Route exact path='/assistants/mail' render={() => <Frame><AssistantMail /></Frame>} />
        <Route path='/assistants/head/s/:sid/:sname/:program' component={StudentDetail} />

      </Switch>
      <Route path='/' component={Footer} />
      <div id='printArea' />
    </div>
  </BrowserRouter>
)

export default AutoLogout(Router)
