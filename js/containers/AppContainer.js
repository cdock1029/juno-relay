import React, { PropTypes } from 'react'
import Relay from 'react-relay'
import cx from 'classnames'

import {
  PropertyListContainer,
} from '../components'

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
