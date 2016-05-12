import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'


import Root from './Root'
const rootElement = document.getElementById('root')

render(
  <AppContainer>
    <Root />
  </AppContainer>,
  rootElement
)

if (module.hot) {
  module.hot.accept(
    './Root',
    () => {
      const NextRoot = require('./Root').default
      render(
        <AppContainer>
          <NextRoot />
        </AppContainer>,
        rootElement
      )
    }
  )
}
