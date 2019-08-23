import React from 'react'
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { styles, theme } from './../styles'
import { type } from './../macro'

import { 
  verifyHandleChange 
} from '../../../../Redux/Assistants/Actions/Verify'
import {
  CircularProgress
} from '@material-ui/core'

import ApplyItem from './ApplyItem'

class index extends React.Component {
  render() {
    const { classes, Verify } = this.props;
    let Data = Verify.isOld ? Verify.formListOld : Verify.formList
    return (
      <div className={ classes.Panels }>
      {
        Verify.fetching ? 
          <MuiThemeProvider theme={theme}>
            <CircularProgress className={classes.loading} color={Verify.isOld? 'secondary':'primary'}/>
          </MuiThemeProvider>
        : 
          Data.filter( apply => (type[Verify.index].includes(apply.status)) && (Verify.type.includes(apply.type))).length > 0 ? 
            Data
              .filter( apply => type[Verify.index].includes(apply.status) && Verify.type.includes(apply.type))
              .map( (apply, index) => <ApplyItem key={index} apply={apply} /> )
          : <div>目前尚無資料</div>
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  Verify: state.Assistant.Verify
})

const mapDispatchToProps = (dispatch) => ({
  verifyHandleChange: (payload) => dispatch(verifyHandleChange(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))