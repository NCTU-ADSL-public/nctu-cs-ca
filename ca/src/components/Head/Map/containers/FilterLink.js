import { connect } from 'react-redux'
import { setVisibilityFilter ,setPascos} from '../actions'
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
            if(ownProps.filter === "SHOW_ALL"){
                for(let j=0;j<ownProps.studentPasdata.length;j++){
                    dispatch(setPascos(ownProps.studentPasdata[j].cos_cname,0));
                }
            }
            else if(ownProps.filter === "SHOW_COMPLETED"){
                for(let j=0;j<ownProps.studentPasdata.length;j++){
                    dispatch(setPascos(ownProps.studentPasdata[j].cos_cname,1));
                }
            }
            else if(ownProps.filter === "SHOW_ACTIVE"){
                for(let j=0;j<ownProps.studentPasdata.length;j++){
                    dispatch(setPascos(ownProps.studentPasdata[j].cos_cname,2));
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