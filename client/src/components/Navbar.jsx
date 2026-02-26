import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
        const nav=useNavigate();
        const userId=localStorage.getItem("userId");

        if(!userId) return null;

        function logout(){
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        nav("/");
    }

    return(
        <nav className="navbar navbar-dark bg-success navbar-expand-lg">

            <div className="container">

                <Link className="navbar-brand fw-bold" to="/dashboard">
                🌱 GardenHub
                </Link>

                <div>

                    <Link className="btn btn-outline-light me-2" to="/dashboard">
                    Home
                    </Link>

                    <button onClick={logout} className="btn btn-danger">
                    Logout
                    </button>

                </div>

            </div>

        </nav>

    );
}