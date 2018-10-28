import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import purple from '@material-ui/core/colors/purple';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ScoreList from './ScoreList'
import FirstPage from '@material-ui/icons/FirstPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import LastPage from '@material-ui/icons/LastPage';
import { fetchScores, downloadCsv } from '../../../../Redux/Assistants/Actions/Project_v3/Score'
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { CSVLink, CSVDownload } from "react-csv";


const styles = theme => ({
  root: {
    width: '60%',
    margin: '0 auto',
    marginTop: '20px',
    marginBottom: '60px'
  },
  cssLabel: {
    fontSize: 18,
    '&$cssFocused': {
      color: '#68BB66'
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#68BB66'
    },
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
  button: {
    width: '100%',
    fontSize: '15px'
  }
})

class index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      semester: '106-2',
      input: "",
      page: 0,
      number_per_page: 10,
      first_second: "1",
      panel_open: [...Array(10)].map( (x) => true)
    }
    props.fetch_scores({ semester: this.state.semester, first_second: this.state.first_second })
    props.download_csv({ semester: this.state.semester, first_second: this.state.first_second })
  }

  filter = (scores) => {
    const { input } = this.state
    return (
      scores.filter( (student) =>
         input === ''
      || student.student.name.toLowerCase().search(input.toLowerCase()) !== -1
      || student.student.id.search(input) !== -1
      || student.professor_name.toLowerCase().search(input.toLowerCase()) !== -1
      )
    )
  }

  fuck = () => {
    let data = this.props.csvData
    if(this.props.csvData[0][0] !== '老師')
      return ''
    return <CSVLink
      data={data}>
      {this.props.csvData[0][0]}
    </CSVLink>
  }

  render() {

    const { classes, fetch_scores, scores, download_csv, csvData } = this.props
    const { input, page, number_per_page, semester, max_page, first_second } = this.state
    console.log(csvData)
    return (
      <div className = { classes.root } >
        <div className = 'row' style = {{ marginTop: '30px', marginBottom: '20px' }}>
          <div className = 'col-md-4 col-lg-4 col-xs-12' >
            <FormControl style = {{ width: '100%' }}>
              <InputLabel
                FormLabelClasses={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
              >
                搜尋 姓名 / 學號
              </InputLabel>
              <Input
                classes={{
                  underline: classes.cssUnderline,
                }}
                onChange = { (event) => this.setState({ input: event.target.value, page: 0 }) }
                value = { input }
              />
            </FormControl>
          </div>
          <div className = 'col-md-3 col-lg-3 col-xs-12' >
            <FormControl style = {{ width: '100%' }}>
              <InputLabel
                FormLabelClasses={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
              >
                學年度
              </InputLabel>
              <Select
                input = {
                  <Input
                    classes={{
                      underline: classes.cssUnderline,
                    }}
                  />
                }
                value = { semester }
                style = {{ fontSize: '15px' }}
                onChange={
                  (event) => {
                    fetch_scores({ first_second, semester: event.target.value })
                    this.setState({ semester: event.target.value, page: 0 })
                  }
                }
              >
              <MenuItem value = { "106-1" } style = {{ fontSize: '20px' }} >106上學期</MenuItem>
              <MenuItem value = { "106-2" } style = {{ fontSize: '20px' }} >106下學期</MenuItem>
              <MenuItem value = { "107-1" } style = {{ fontSize: '20px' }} >107上學期</MenuItem>
              <MenuItem value = { "107-2" } style = {{ fontSize: '20px' }} >107下學期</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className = 'col-md-3 col-lg-3 col-xs-12' >
            <FormControl style = {{ width: '100%' }}>
              <InputLabel
                FormLabelClasses={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
              >
                資工專題
              </InputLabel>
              <Select
                input = {
                  <Input
                    classes={{
                      underline: classes.cssUnderline,
                    }}
                  />
                }
                value = { this.state.first_second }
                style = {{ fontSize: '15px' }}
                onChange={
                  (event) => {
                    fetch_scores({ first_second: event.target.value, semester })
                    this.setState({ first_second: event.target.value, page: 0 })
                  }
                }
              >
                <MenuItem value = { "1" } style = {{ fontSize: '20px' }} >資工專題(一)</MenuItem>
                <MenuItem value = { "2" } style = {{ fontSize: '20px' }} >資工專題(二)</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className = 'col-md-2 col-lg-2 col-xs-12' >
            <Button variant="contained" className={classes.button}
                    // onClick = { () => download_csv({ semester, first_second})}
            >
              <CloudDownloadIcon style = {{ fontSize: '20px' }}/>
              {this.fuck()}
            </Button>
          </div>
        </div>
        <div style = {{ minHeight: '570px' }} >
          <ScoreList
            scores = {
              this.filter(scores).slice(number_per_page * page, number_per_page * (page + 1) )
            }
          />
        </div>
        <div style = {{ textAlign: 'center', marginTop: '10px', marginBottom: '50px' }} >
          <FirstPage className = { classes.icon } onClick = { () => this.setState({ page: 0 }) } />
          <ChevronLeft className = { classes.icon } onClick = { () => this.setState({ page: Math.max(0, page - 1) }) } />
          <span style = {{
            display: 'inline-flex',
            verticalAlign: 'middle',
            fontSize: '20px',
            marginRight: '20px',
            marginLeft: '20px'
          }}>{page + 1} / { Math.max(1, Math.ceil(this.filter(scores).length / number_per_page)) }</span>
          <ChevronRight className = { classes.icon } onClick = { () => this.setState({ page: Math.max(0, Math.min(Math.ceil(this.filter(scores).length / number_per_page) - 1, page + 1)) }) } />
          <LastPage className = { classes.icon } onClick = { () => this.setState({ page: Math.max(0, Math.ceil(this.filter(scores).length / number_per_page) - 1) }) } />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  scores: state.Assistant.Project.Score.scores,
  csvData: state.Assistant.Project.Score.csvData
})

const mapDispatchToProps = (dispatch) => ({
  fetch_scores: (post_item) => dispatch(fetchScores(post_item)),
  download_csv: (post_item) => dispatch(downloadCsv(post_item))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
