import React from 'react'
import FilterLink from '../containers/FilterLink'

class Footer extends React.Component {
    render(){
        return(
            <div>
                <FilterLink filter="SHOW_ALL" studentPasdata={this.props.studentPasdata} data={this.props.data}>
                    全覽
                </FilterLink>
                <br />
                <br />
                <FilterLink filter="SHOW_COMPLETED" studentPasdata={this.props.studentPasdata} data={this.props.data}>
                    已修
                </FilterLink>
                <br />
                <br />
                <FilterLink filter="SHOW_ACTIVE" studentPasdata={this.props.studentPasdata} data={this.props.data}>
                    未修
                </FilterLink>
            </div>

        )
    }
}

export default Footer