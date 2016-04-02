import React, { PropTypes } from 'react'

const Header = ({ text }) => (
  <h1 className='ui header'>{text}</h1>
)

Header.propTypes = {
  text: PropTypes.string,
}
export default Header
