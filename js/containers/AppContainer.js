import Relay from 'react-relay'
import {
  App,
  PropertyListContainer,
} from '../components'

export default Relay.createContainer(App, {
  initialVariables: {
    showBuildingListContainer: null,
  },

  fragments: {
    company: () => Relay.QL`
      fragment on Company {
        name,
        ${PropertyListContainer.getFragment('company')},
      }
    `,
  },
})
