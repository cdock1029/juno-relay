import React, { PropTypes } from 'react'
import Relay from 'react-relay'

import {
  PropertyListContainer,
} from '../components'

const Dashboard = (props) => {
  const {
    company,
    buildingComponent,
    propertyComponent,
    unitComponent,
    unitDetailComponent,
  } = props
  // console.log('render Dashboard - props:', props)
  return (
    <div className='ui two column grid'>
      <div className='row'>
        <div className='sixteen wide mobile ten wide computer column'>
          <h5 className='ui inverted teal top attached header'>{company.name}</h5>
          <div className='ui attached segment row'>
            <div className='ui equal width grid'>
            {propertyComponent}
            {buildingComponent || <noscript />}
            {unitComponent || <noscript />}
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        {unitDetailComponent || <noscript />}
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  company: PropTypes.object.isRequired,
  propertyComponent: PropTypes.object.isRequired,
  buildingComponent: PropTypes.object,
  unitComponent: PropTypes.object,
  unitDetailComponent: PropTypes.object,
}

export default Relay.createContainer(Dashboard, {
  fragments: {
    company: () => Relay.QL`
      fragment on Company {
        name,
        ${PropertyListContainer.getFragment('company')},
      }
    `,
  },
})
