import React from 'react'
import { Link } from 'react-router'

const Heading = () => (
  <div className='ui top fixed menu'>
    <div className='ui container'>
      <Link className='item' to='/new-tenant'>Add new tenant</Link>
      <div className='right menu'>
        <a className='item' onClick={() => console.log('log out')}>Log out</a>
      </div>
    </div>
  </div>
)

export default Heading