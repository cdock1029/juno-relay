import React from 'react'
import cx from 'classnames'

const EntityList = ({ children, title, size, style }) => {
  return (<div className={cx(size, 'column')}>
    <h4 className='ui header'>{title}</h4>
    <div
      style={{ minHeight: '14em', maxHeight: '20em', overflow: 'scroll', ...style }}
      className='ui relaxed divided link list'>
      {children}
    </div>
  </div>)
}

EntityList.propTypes = {
  children: React.PropTypes.array,
  title: React.PropTypes.string.isRequired,
  size: React.PropTypes.string.isRequired,
  style: React.PropTypes.object,
}

export default EntityList
