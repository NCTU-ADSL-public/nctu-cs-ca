import React from 'react'
import FilterLink from '../containers/FilterLink'

const Footer = (ownProps) => (
    <div>
        <FilterLink filter="SHOW_ALL">
            全覽
        </FilterLink>
        <br />
        <br />
        <FilterLink filter="SHOW_COMPLETED" studentPasdata={ownProps.studentPasdata}>
            已修
        </FilterLink>
        <br />
        <br />
        <FilterLink filter="SHOW_ACTIVE" studentPasdata={ownProps.studentPasdata}>
            未修
        </FilterLink>
    </div>
)

export default Footer