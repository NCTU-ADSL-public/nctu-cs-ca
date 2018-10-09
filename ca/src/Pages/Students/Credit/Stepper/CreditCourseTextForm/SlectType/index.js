import React, {Component} from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { courseCreditChange } from '../../../../../../Redux/Students/Actions/Credit'
import { connect } from 'react-redux'

const fontStyle = {
  verticalAlign: 'default',
  fontSize: '1em',
  fontWeight: '300',
  letterSpacing: '1px',
  fontFamily: 'Noto Sans CJK TC',
  width: '100px',
}

const fontlabelStyle = {
  verticalAlign: 'default',
  fontSize: '1em',
  fontWeight: '300',
  letterSpacing: '1px',
  fontFamily: 'Noto Sans CJK TC',
  width: '100px',
  color: 'blue'
}

class SelectCourseField extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = { value: 0 }
  }

  handleChange (event, index, value) {
    this.setState({ value: value })
    this.props.courseCreditChange('course_type', event.target.value === 0 ? '必修' : '選修')
  }

  render () {
    return (
      <div style={{float: 'left', paddingTop: '25px', width: '100px'}}>
        <SelectField
          value={this.state.value}
          onChange={this.handleChange}
          autoWidth
          maxHeight={200}
          labelStyle={fontlabelStyle}
          menuStyle={fontlabelStyle}
          selectedMenuItemStyle={fontlabelStyle}
          listStyle={fontStyle}
          menuItemStyle={fontStyle}
          style={{width: '100px'}}
        >
          <MenuItem value={0} key={0} primaryText={'必修'} />
          <MenuItem value={1} key={1} primaryText={'選修'} />
        </SelectField>

      </div>
    )
  }
}
const mapStateToProps = (state) => ({
})
const mapDispatchToProps = (dispatch) => ({
  courseCreditChange: (type, value) => {
    dispatch(courseCreditChange(type, value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectCourseField)
