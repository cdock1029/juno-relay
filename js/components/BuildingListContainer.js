import React, { PropTypes } from 'react'
import Relay from 'react-relay'
import { EntityList, EntityListItem } from './index'

const BuildingListContainer = React.createClass({

  propTypes: {
    property: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired,
  },

  render() {
    console.log('BuildingListContainer - props', this.props)
    const {
      property: {
        buildings: {
          edges,
        },
      },
      params: { propertyId },
      relay: { route: { params: { buildingId } } },
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
