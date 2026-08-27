import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"

function Header (){
    const {logout} = useAuth()
    const navigate = useNavigate()
    function handleLogout (){
        logout()
        navigate("/")

    }
    return (
       <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
  <h1 className="text-xl font-bold text-gray-800">
    Management Products
  </h1>

  <nav className="flex items-center gap-6">
    <Link
      to="/mainDashboard"
      className="text-gray-600 hover:text-blue-600 font-medium transition"
    >
      categories
    </Link>

    <Link
      to="/categories"
      className="text-gray-600 hover:text-blue-600 font-medium transition"
    >
      favorites
    </Link>

    {/* <Link
      to="/favorites"
      className="text-gray-600 hover:text-blue-600 font-medium transition"
    >
      Favorites
    </Link> */}
  </nav>

  <button
    onClick={handleLogout}
    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
  >
    Logout
  </button>
</header>
)
}

export default Header