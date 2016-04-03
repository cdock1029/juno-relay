import React, { PropTypes } from 'react'
import Relay from 'react-relay'
import { EntityList, EntityListItem } from './index'

const UnitListContainer = React.createClass({

  propTypes: {
    building: PropTypes.object.isRequired,
  },

  render() {
    console.log('UnitListContainer - props', this.props)
    const { building: { units: { edges } } } = this.props
    return (
      <EntityList
        title={'Unit'}
        size='eight wide mobile four wide tablet three wide computer'>
        {edges.map(e => {
            /* const unit = unitEntities[id]
            // last item in unit.leases array...
            const lease = unit.leases && leaseEntities[unit.leases.slice(-1).pop()]
            // tenant
            const tenants = lease && lease.tenants.map(tId => tenantEntities[tId]) */
          return (
            <EntityListItem
              key={e.unit.id}
              active={false}
              path={
                `/${'fill_me_in'}/buildings/${'me_too'}/units/${e.unit.id}`
              }
              text={
                `${e.unit.number}\u00a0\u00a0\u00a0\u00a0`
                /* ${tenants ?
                  tenants.map(t => `${t.firstName} ${t.lastName}`) :
                  ''}`*/
              } />
            )
        })}
      </EntityList>
    )
  },

})

export default Relay.createContainer(UnitListContainer, {
  fragments: {
    building: () => Relay.QL`
      fragment on Building {
        units(first: 50) {
          edges {
            unit:node {
              id
              number
            }
          }
        }
      }
    `,
  },
})
