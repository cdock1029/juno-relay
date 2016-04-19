import React, { PropTypes } from 'react'
import Relay from 'react-relay'
import { EntityList, EntityListItem } from './index'

const BuildingListContainer = React.createClass({

  propTypes: {
    property: PropTypes.object.isRequired,
    propertyId: PropTypes.string.isRequired,
    buildingId: PropTypes.string,
  },

  render() {
    console.log('BuildingListContainer - props', this.props)
    const {
      property: {
        buildings: {
          edges,
        },
      },
      propertyId,
      buildingId,
    } = this.props
    // TODO: should we short cricuit & not render when buildingListId
    // not defined ? (leaf nodes rendered before data fetched)
    return (
      <EntityList
        title={'Building'}
        size='eight wide mobile four wide tablet two wide computer'>
        {edges.map(({ building }) => (
            <EntityListItem
              key={building.id}
              active={building.id === buildingId}
              path={`/${propertyId}/buildings/${building.id}/units`}
              text={building.address} />
        ))}
      </EntityList>
    )
  },
})

export default Relay.createContainer(BuildingListContainer, {
  fragments: {
    property: () => Relay.QL`
      fragment on Property {
        id
        name
        buildings(first: 20) {
          edges {
            building:node {
              id
              address
            }
          }
        }
      }
    `,
  },
})
