import React from 'react'
import FilterLink from '../containers/FilterLink'

const Footer = () => (
    <div>
        <FilterLink filter="SHOW_ALL">
            全覽
        </FilterLink>
        <FilterLink filter="SHOW_ACTIVE">
            必修
        </FilterLink>
        <FilterLink filter="SHOW_COMPLETED">
            必選修
        </FilterLink>
    </div>
)

export default Footer