import React, { PropTypes } from 'react'
import Relay from 'react-relay'

const UnitDetailContainer = ({ unit }) => (
  <div className='eight wide column'>
    <div className='ui raised segment'>
      <div className='ui teal ribbon label'>
        {unit && `${unit.building.address}-${unit.number}`}
      </div>
      <span>{unit && unit.property.name}</span>
      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <div className='ui two column grid'>
          <div className='column'>
            <h5>Current Tenant(s)</h5>
            <div className='ui list'>
            </div>
          </div>
          <div className='column'>
            <h5>Lease</h5>
            <div className='ui list'>
              {unit && unit.leases.map((l, i) => (
                <div className='item' key={i}>
                  {l.rent / 100.0}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

UnitDetailContainer.propTypes = {
  unit: PropTypes.object,
}

export default Relay.createContainer(UnitDetailContainer, {
  fragments: {
    company: () => Relay.QL`
      fragment on Company {
        properties(first: 5) {
          edges {
            property:node {
              ... on Property {
                id,
                name,
              }
            }
          }
        }
      }
    `,
  },
})
