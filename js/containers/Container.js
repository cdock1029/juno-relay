import React, { PropTypes } from 'react'
import {
  Heading,
} from '../components'

const Container = ({ children }) => (
  <div className='ui container'>
    <Heading />
    {children}
  </div>
)

Container.propTypes = {
  children: PropTypes.object,
}

export default Container
