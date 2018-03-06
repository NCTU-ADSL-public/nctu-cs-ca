import { connect } from 'react-redux'
import { setVisibilityFilter, setPascos, setAll, setNopascos} from '../actions'
import Link from '../MapComponents/Link'

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
      if (ownProps.filter === 'SHOW_ALL') {
        for (let i = 0; i < ownProps.data.length; i++) {
          dispatch(setAll(ownProps.data[i].cos_cname, 0))
        }
      } else if (ownProps.filter === 'SHOW_COMPLETED') {
        for (let i = 0; i < ownProps.data.length; i++) {
          dispatch(setAll(ownProps.data[i].cos_cname, 1))
        }
        for (let k = 0; k < ownProps.studentPasdata.length; k++) {
          dispatch(setNopascos(ownProps.studentPasdata[k].cos_cname))
        }
      } else if (ownProps.filter === 'SHOW_ACTIVE') {
        for (let i = 0; i < ownProps.data.length; i++) {
          dispatch(setAll(ownProps.data[i].cos_cname, 0))
        }
        for (let j = 0; j < ownProps.studentPasdata.length; j++) {
          dispatch(setPascos(ownProps.studentPasdata[j].cos_cname))
        }
      }
    }
  }
}

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link)

export default FilterLink
