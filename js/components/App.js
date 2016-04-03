import React, { PropTypes } from 'react'
import cx from 'classnames'

import {
  PropertyListContainer,
  BuildingListContainer,
  UnitListContainer,
  Header,
} from './index'

const App = (props) => {
  const { buildingComponent, unitComponent, company } = props
  console.log('render App - props:', props)
  return (
    <div className='ui four column grid'>
      <Header text='Property Manager' />
      <div className='row'>
        <div className='column'>
          <h2 className='ui green header'>{company.name}</h2>
        </div>
      </div>
      <div
        className={cx('ui', 'row segment')}>
        <PropertyListContainer company={company} />
        {buildingComponent || <noscript />}
        {unitComponent || <noscript />}
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
