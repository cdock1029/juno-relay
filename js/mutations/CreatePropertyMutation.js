import Relay from 'react-relay'

export default class extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation { createPropertyMutation }`
  }

  getVariables() {
    return {
      name: this.props.name,
      city: this.props.city,
      state: this.props.state,
      street: this.props.street,
      zip: this.props.zip,
      companyId: this.props.company.id,
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreatePropertyMutationPayload {
        company {
          properties
        }
        property
      }
    `
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        company: this.props.company.id,
      },
    }]
  }

  /* static fragments = {
    company: () => Relay.QL`
      fragment on Company {
        id,
      }
    `,
  } */

}
