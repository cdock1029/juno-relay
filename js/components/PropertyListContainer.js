import React, { PropTypes } from 'react'
import Relay from 'react-relay'
import { EntityList, EntityListItem } from './index'

const PropertyListContainer = ({
  company: { properties: { edges } },
  propertyId,
}) => (
  <EntityList
    title={'Property'}
    size='twelve wide mobile six wide tablet six wide computer'>
    {edges.map(({ property }) => (
      <EntityListItem
        key={property.id}
        active={property.id === propertyId}
        path={`/${property.id}/buildings`}
        text={property.name} />
      ))}
  </EntityList>
)

PropertyListContainer.propTypes = {
  company: PropTypes.object.isRequired,
  propertyId: PropTypes.string,
}

export default Relay.createContainer(PropertyListContainer, {
  fragments: {
    company: () => Relay.QL`
      fragment on Company {
        properties(first: 10) {
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
