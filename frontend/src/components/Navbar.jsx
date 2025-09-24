import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">QShop</Link>
        </div>

        <div>
          <ul className="flex space-x-4">
            <li>
              <Link to="/product" className="hover:text-gray-300">
                Product
              </Link>
            </li>
            <li>
              <Link to="/order" className="hover:text-gray-300">
                Order
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar