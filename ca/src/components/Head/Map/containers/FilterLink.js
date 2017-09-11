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
            if(ownProps.filter === "SHOW_COMPLETED"){
                console.log(ownProps.filter);
                for(let j=0;j<ownProps.studentPasdata.length;j++){
                    dispatch(setPascos(ownProps.studentPasdata[j].cos_cname,0));
                }
            }
            else if(ownProps.filter === "SHOW_ACTIVE"){
                console.log(ownProps.filter);
                for(let j=0;j<ownProps.studentPasdata.length;j++){
                    dispatch(setPascos(ownProps.studentPasdata[j].cos_cname,1));
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