import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import FirstPage from '@material-ui/icons/FirstPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import LastPage from '@material-ui/icons/LastPage';
import grey from '@material-ui/core/colors/grey';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  chip: {
    margin: '10px',
    fontSize: '15px',
  },
  icon: {
    fontSize: '40px',
    display: 'inline-flex',
    verticalAlign: 'middle',
    color: grey[600],
    '&:hover': {
      color: grey[900],
      transition: 'color 0.5s'
    },
    transition: 'color 0.3s',
    marginRight: '10px',
    marginLeft: '10px'
  },
  cssLabel: {
    fontSize: 20,
    '&$cssFocused': {
      color: 'rgb(0, 188, 212)'
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: 'rgb(0, 188, 212)'
    },
  }
})

class index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
      page: 0,
      number_per_page: 10,
      input: ''
    }
  }

  filter = (teachers) => {
    const { input } = this.state
    return (
      teachers.filter( (teacher) => input === ''
        || teacher.professor_name.toLowerCase().search(input.toLowerCase()) !== -1
      )
    )
  }

  render() {

    const { classes, teachers, professor_name } = this.props
    const { expanded, page, number_per_page, input } = this.state

    return (
      <div style = {{ marginBottom: '60px' }} >
        <FormControl style = {{ width: '100%', marginBottom: '10px' }}>
          <InputLabel
            FormLabelClasses={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
          >
            搜尋教授 姓名
          </InputLabel>
          <Input
            classes={{
              underline: classes.cssUnderline,
            }}
            onChange = { (event) => this.setState({ input: event.target.value, page: 0 }) }
            value = { input }
          />
        </FormControl>
        <div style = {{ minHeight: '570px' }} >
          {this.filter(teachers).slice(page * number_per_page, (page + 1) * number_per_page)
          .map( ( teacher, index ) => {
            return (
              <div style = {{ margin: '5px auto'}}>
                <ExpansionPanel expanded = { expanded === index } onChange = { () => this.setState({ expanded: expanded === index ? null : index }) } >
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div style = {{ width: '100%', display: 'flex' }}>
                      <div style = {{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black' }} >{ teacher.professor_name }</div>
                      <LinearProgress variant="determinate"
                        value={teacher.pending.projects.reduce( (pending_number, project) => pending_number + project.students.length, 0) / 10 * 100 }
                        style = {{ flex: 0.6, margin: '10px auto' }}
                      />
                      <div style = {{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black'  }}>{ teacher.pending.projects.reduce( (pending_number, project) => pending_number + project.students.length, 0) } 人</div>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                  {
                    teacher.pending.projects.length !== 0 ?
                    teacher.pending.projects.map( project => {
                      return (
                        <div>
                          <div style = {{ fontSize: 15, color: 'black' }} >{ project.title }</div>
                          {
                            project.students.map( student => (
                              <Chip label = { student.id + " " + student.name } className = { classes.chip } />
                            ))
                          }
                        </div>
                      )
                    })
                    :
                    <div style = {{ width: '100%', display: 'flex', justifyContent: "center", }}>
                      <div style = {{ fontSize: 20 }} >尚未有專題</div>
                    </div>
                  }
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            )
          })}
        </div>
        <div style = {{ textAlign: 'center', marginTop: '10px' }} >
          <FirstPage className = { classes.icon } onClick = { () => this.setState({ page: 0 }) } />
          <ChevronLeft className = { classes.icon } onClick = { () => this.setState({ page: Math.max(0, page - 1) }) } />
          <span style = {{
            display: 'inline-flex',
            verticalAlign: 'middle',
            fontSize: '20px',
            marginRight: '20px',
            marginLeft: '20px'
          }}>{page + 1} / { Math.max(1, Math.ceil(this.filter(teachers).length / number_per_page)) }</span>
          <ChevronRight className = { classes.icon } onClick = { () => this.setState({ page: Math.min(Math.ceil(this.filter(teachers).length / number_per_page) - 1, page + 1) }) } />
          <LastPage className = { classes.icon } onClick = { () => this.setState({ page: Math.ceil(this.filter(teachers).length / number_per_page) - 1 }) } />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
