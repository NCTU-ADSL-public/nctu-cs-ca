import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Button
} from '@material-ui/core'
import NormalCoursePanel from './CreditPanel/normalCoursePanel'
import EnglishCoursePanel from './CreditPanel/englishCoursePanel'

const styles = theme => ({
  container: {
    margin: '1%',
    fontFamily: 'Noto Sans CJK TC'
  }
})

class Index extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='offset-10 col-2' style={{ marginTop: '20px' }}>
            <Link to='/students/credit/apply'>
              <Button variant='contained' color='primary'>抵免申請</Button>
            </Link>
          </div>
          <div className='col-md-12' style={{ marginTop: '20px' }}>
            <NormalCoursePanel />
            <EnglishCoursePanel />
          </div>
        </div>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Index)
