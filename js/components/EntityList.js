import React from 'react'
import cx from 'classnames'

const EntityList = ({ children, title, size }) => (
  <div className={cx(size, 'column')}>
    <h4 className='ui header'>{title}</h4>
    <div className='ui relaxed divided link list'>
      {children}
    </div>
  </div>
)

EntityList.propTypes = {
  children: React.PropTypes.array,
  title: React.PropTypes.string.isRequired,
  size: React.PropTypes.string.isRequired,
}

export default EntityList
