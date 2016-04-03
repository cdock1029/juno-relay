import React, { PropTypes } from 'react'
import Relay from 'react-relay'
import { EntityList, EntityListItem } from './index'

const BuildingListContainer = React.createClass({

  propTypes: {
    property: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
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
    } = this.props
    // TODO: should we short cricuit & not render when buildingListId
    // not defined ? (leaf nodes rendered before data fetched)
    return (
      <EntityList
        title={'Building'}
        size='eight wide mobile four wide tablet three wide computer'>
        {edges.map(e => (
            <EntityListItem
              key={e.building.id}
              active={false}
              path={`/${propertyId}/buildings/${e.building.id}/units`}
              text={e.building.address} />
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
