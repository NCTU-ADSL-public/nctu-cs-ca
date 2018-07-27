import React from 'react'
import Paper from 'material-ui/Paper';
import StudentsTable from './StudentsTable'
import TextField from 'material-ui/TextField';

import Chip from 'material-ui/Chip';

const styles = {
  wrapper: {
    width: '80%',
    margin: 'auto'
  },
  paper: {
    background: '#FFFFFF',
    padding: '20px',
    height: '80vh'
  },
  searchTextField: {
    width: '90%',
    marginLeft: '30px',
    fontSize: '20px',
    marginButton: '20px'
  },
  chip: {
    width: '100%',
    margin: '0 auto',
    border: '1px'
  },
  chipText: {
    margin: '0 auto',
  }
}

class StudentsItem extends React.Component {
  render() {
    return (
      <div style = { styles.wrapper }>
        <div className='row' style={{marginBottom: '50px', marginTop: '20px'}}>
          <div className='col-md-6 col-lg-6 hidden-xs' >
            <Paper style = { styles.paper } zDepth={2}>
              <TextField
                hintText="學號/姓名/組別"
                floatingLabelText="搜尋欄位"
                style = { styles.searchTextField }
              />
              <StudentsTable />
            </Paper>
          </div>
          <div className='col-md-6 col-lg-6 hidden-xs' >
            <Paper style = { styles.paper } zDepth={2}>
              <h3>專題狀況</h3>
              <div className='row' style={{marginBottom: '20px', marginTop: '50px'}}>
                <div className='col-md-6 col-lg-6 hidden-xs' >
                  <Chip style = { styles.chip } labelStyle = { styles.chipText } >
                    未申請教授
                  </Chip>
                </div>
                <div className='col-md-6 col-lg-6 hidden-xs' >
                  <Chip style = { styles.chip } labelStyle = { styles.chipText } >
                    待教授審核
                  </Chip>
                </div>
              </div>
              <div className='row' style={{marginBottom: '50px', marginTop: '20px'}}>
                <div className='col-md-6 col-lg-6 hidden-xs' >
                  <Chip style = { styles.chip } labelStyle = { styles.chipText } >
                    已找到教授
                  </Chip>
                </div>
                <div className='col-md-6 col-lg-6 hidden-xs' >
                  <Chip style = { styles.chip } labelStyle = { styles.chipText } >
                    無資工專題
                  </Chip>
                </div>
              </div>
              <hr/>
              <h3>組別</h3>
              <div className='row' style={{marginBottom: '20px', marginTop: '50px'}}>
                <div className='col-md-6 col-lg-6 hidden-xs' >
                  <Chip style = { styles.chip } labelStyle = { styles.chipText } >
                    資A
                  </Chip>
                </div>
                <div className='col-md-6 col-lg-6 hidden-xs' >
                  <Chip style = { styles.chip } labelStyle = { styles.chipText } >
                    資B
                  </Chip>
                </div>
              </div>
              <div className='row' style={{marginBottom: '50px', marginTop: '20px'}}>
                <div className='col-md-6 col-lg-6 hidden-xs' >
                  <Chip style = { styles.chip } labelStyle = { styles.chipText } >
                    網多
                  </Chip>
                </div>
                <div className='col-md-6 col-lg-6 hidden-xs' >
                  <Chip style = { styles.chip } labelStyle = { styles.chipText } >
                    資電
                  </Chip>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}

export default StudentsItem
