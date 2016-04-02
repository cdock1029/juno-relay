import React from 'react'
import Relay from 'react-relay'
import { EntityList, EntityListItem } from './index'

const PropertyListContainer = React.createClass({

  propTypes: {
    company: React.PropTypes.object.isRequired,
  },

  render() {
    console.log('PropertyListContainer - props', this.props)
    const { company: { properties: { edges } } } = this.props
    return (
      <EntityList
        title={'Property Yo'}
        size='eight wide mobile four wide tablet three wide computer'>
        {edges.map(edge => (
            <EntityListItem
              key={edge.property.id}
              active={false}
              path={`/${edge.property.id}/buildings`}
              text={edge.property.name} />
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
