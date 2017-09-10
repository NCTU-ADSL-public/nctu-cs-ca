import React from 'react'
import FilterLink from '../containers/FilterLink'

const Footer = () => (
    <div>
        <FilterLink filter="SHOW_ALL">
            全覽
        </FilterLink>
        <br />
        <br />
        <FilterLink filter="SHOW_COMPLETED">
            已修
        </FilterLink>
        <br />
        <br />
        <FilterLink filter="SHOW_ACTIVE">
            未修
        </FilterLink>
    </div>
)

export default Footer