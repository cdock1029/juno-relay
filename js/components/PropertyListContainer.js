import React from 'react'
import Relay from 'react-relay'
import { EntityList, EntityListItem } from './index'

const PropertyListContainer = React.createClass({

  propTypes: {
    company: React.PropTypes.object.isRequired,
    relay: React.PropTypes.object.isRequired,
  },

  render() {
    console.log('PropertyListContainer - props', this.props)
    const {
      company: { properties: { edges } },
      relay: { route: { params: { propertyId } } },
    } = this.props
    return (
      <EntityList
        title={'Property'}
        size='eight wide mobile four wide tablet three wide computer'>
        {edges.map(({ property }) => (
            <EntityListItem
              key={property.id}
              active={property.id === propertyId}
              path={`/${property.id}/buildings`}
              text={property.name} />
          ))}
      </EntityList>
    )
  },
})

export default Relay.createContainer(PropertyListContainer, {
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
