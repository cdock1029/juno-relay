import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render() {
    console.log('Props:', this.props)
    return (
      <div>
        <h1 className='ui header'>{this.props.company.name}</h1>
        <div className='ui list'>
          {this.props.company.properties.edges.map(edge =>
            <div className='item' key={edge.node.id}>
              {edge.node.name}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    company: () => Relay.QL`
      fragment on Company {
        id
        name,
        properties(first: 3) {
          edges {
            node {
              id,
              name,
            },
          },
        },
      }
    `,
  },
})
