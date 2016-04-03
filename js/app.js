import React from 'react'
import ReactDOM from 'react-dom'

// import { browserHistory } from 'react-router'
// import routes from './routes'
const rootEl = document.getElementById('root')

const render = () => {
  const Root = require('./root').default
  ReactDOM.render(
    <Root />,
    rootEl
  )
}

let finalRender = render
if (module.hot) {
  const renderApp = () => {
    // ReactDOM.unmountComponentAtNode(rootEl)
    render()
  }
  const renderError = (error) => {
    const RedBox = require('redbox-react')
    ReactDOM.render(
      <RedBox error={error} />,
      rootEl
    )
  }
  finalRender = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
  }
  module.hot.accept('./root', () => {
    setTimeout(render)
  })
}

finalRender()
