import React, { PropTypes } from 'react'
import cx from 'classnames'

import {
  PropertyListContainer,
} from './index'

const App = (props) => {
  const { buildingComponent, unitComponent, company } = props
  console.log('render App - props:', props)
  return (
    <div className='ui four column grid'>
      <div className={cx('segments', 'ui', 'row attached segment')}>
        <PropertyListContainer company={company} />
        {buildingComponent || <noscript />}
        {unitComponent || <noscript />}
        <div className='ui top attached violet label'>{company.name}</div>
      </div>
    </div>
  )
}

App.propTypes = {
  company: PropTypes.object.isRequired,
  buildingComponent: PropTypes.object,
  unitComponent: PropTypes.object,
}

/* const COMPONENTS = [
  [BuildingListContainer, 'showBuildingListContainer'],
] */

export default App
