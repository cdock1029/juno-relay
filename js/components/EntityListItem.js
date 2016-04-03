import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'

const EntityListItem = ({ active, path, text }) => (
  <Link
    className={cx('item', { active })}
    to={path}>
    {text}
  </Link>
)

EntityListItem.propTypes = {
  active: React.PropTypes.bool.isRequired,
  path: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
}

export default EntityListItem
