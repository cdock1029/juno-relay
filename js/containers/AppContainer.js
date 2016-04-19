import React, { PropTypes } from 'react'
import Relay from 'react-relay'
import cx from 'classnames'

import {
  PropertyListContainer,
} from '../components'

const App = (props) => {
  const {
    company,
    buildingComponent,
    propertyComponent,
    unitComponent,
    unitDetailComponent,
  } = props
  console.log('render App - props:', props)
  return (
    <div className='ui four column grid'>
      <div className={cx('segments', 'ui', 'row attached segment')}>
        {propertyComponent}
        {buildingComponent || <noscript />}
        {unitComponent || <noscript />}
        <div className='ui top attached violet label'>{company.name}</div>
      </div>
      <div className='row'>
        {unitDetailComponent || <noscript />}
      </div>
    </div>
  )
}

App.propTypes = {
  company: PropTypes.object.isRequired,
  propertyComponent: PropTypes.object.isRequired,
  buildingComponent: PropTypes.object,
  unitComponent: PropTypes.object,
  unitDetailComponent: PropTypes.object,
}

export default Relay.createContainer(App, {
  fragments: {
    company: () => Relay.QL`
      fragment on Company {
        name,
        ${PropertyListContainer.getFragment('company')},
      }
    `,
  },
})
