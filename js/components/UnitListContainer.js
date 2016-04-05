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
        style={{ fontSize: '12px' }}
        size='eight wide mobile four wide tablet five wide computer'>
        {edges.map(edge => {
          const unit = edge.unit
          const lease = unit.leases.edges[0].lease
          const tenants = lease.tenants.edges.map(e => e.tenant.fullName).join(', ')
          return (
            <EntityListItem
              key={unit.id}
              active={false}
              path={
                `/${'fill_me_in'}/buildings/${'me_too'}/units/${unit.id}`
              }
              text={
                `${unit.number}\u00a0\u00a0\u00a0\u00a0${tenants}`
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
              leases(first:1) {
                edges {
                  lease:node {
                    tenants(first:2) {
                      edges {
                        tenant:node {
                          id
                          fullName
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  },
})
