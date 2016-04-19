import React, { PropTypes } from 'react'
import Relay from 'react-relay'
import moment from 'moment'
import accounting from 'accounting'

const UnitDetailContainer = React.createClass({

  propTypes: {
    unit: PropTypes.object,
  },

  render() {
    console.log('UnitDetailContainer - props:', this.props)
    const { unit } = this.props
    // just using most recent for now
    const lease = unit.leases.edges[0].lease
    const tenantEdges = lease.tenants.edges
    const dateFormat = 'MMM Do YYYY'
    return (
      <div className='ten wide column'>
        <div className='ui raised segment'>
          <div className='ui teal ribbon label'>
            {`${unit.building.address}-${unit.number}`}
          </div>
          <span>{unit.building.property.name}</span>
          <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <div className='ui grid'>
              <div className='column'>
                <h4 className='ui horizontal divider header'>
                  <i className='edit icon' />
                  Lease
                </h4>
                <table className='ui definition table'>
                  <tbody>
                    <tr>
                      <td className='two wide column'>Tenant(s)</td>
                      <td>{
                        tenantEdges.map(({ tenant }) => tenant.fullName)
                          .join(', ')
                      }</td>
                    </tr>
                    <tr>
                      <td className='two wide column'>Rent</td>
                      <td>{accounting.formatMoney(lease.rent / 100.0)}</td>
                    </tr>
                    <tr>
                      <td className='two wide column'>Start Date</td>
                      <td>{moment(lease.startDate).format(dateFormat)}</td>
                    </tr>
                    <tr>
                      <td className='two wide column'>End Date</td>
                      <td>{moment(lease.endDate).format(dateFormat)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
})

export default Relay.createContainer(UnitDetailContainer, {
  fragments: {
    unit: () => Relay.QL`
      fragment on Unit {
        number
        building {
          address
          property {
            name
          }
        }
        leases(first:1) {
          edges {
            lease:node {
              id
              rent
              tenants(first:2) {
                edges {
                  tenant:node {
                    fullName
                  }
                }
              }
              startDate
              endDate
            }
          }
        }
      }
    `,
  },
})
