import { memo } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <ul>
      <li>
        <Link to="/cssinjs">CSS in JS</Link>
      </li>
      <li>
        <Link to="/antd">Antd</Link>
      </li>
      <li>
        <Link to="/bailu">Bailu</Link>
      </li>
    </ul>
  )
}

export default memo(Home)
