import React, { PropTypes } from 'react'
import Relay from 'react-relay'

import CreatePropertyForm from './CreatePropertyForm'
import { CreatePropertyMutation } from '../mutations'

const CreatePropertyComponent = ({ company }) => (
  <div className='ui grid'>
    <div className='sixteen wide mobile eight wide computer column'>
      <table className='ui definition table'>
        <tbody>
          {company.properties.edges.map(({ node }) => (
            <tr key={node.id} className='item'>
              <td className='two wide column'>{node.id}</td>
              <td>{node.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className='sixteen wide mobile six wide computer column'>
      <h3>New Property for: {company.name}</h3>
      <CreatePropertyForm
        onSubmit={(data) => {
          console.log('Form Data:', data)
          // { ...data, companyId: company.id }
          Relay.Store.commitUpdate(
            new CreatePropertyMutation({ ...data, company }),
            {
              onSuccess: response => {
                console.log('Mutation response:', response)
              },
              onFailure: tx => {
                const err = tx.getError()
                if (err) {
                  console.error('Mutation error:', err)
                } else {
                  console.error(new Error('Unspecified mutation error.'))
                }
              }
            }
          )
        }} />
    </div>

  </div>
)

CreatePropertyComponent.propTypes = {
  company: PropTypes.object.isRequired,
}

export default Relay.createContainer(CreatePropertyComponent, {
  fragments: {
    company: () => Relay.QL`
      fragment on Company {
        id
        name
        properties(first: 20) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
  },
})
