import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
        const nav=useNavigate();
        const user=localStorage.getItem("user");

        if(!user) return null;

        function logout(){
        localStorage.removeItem("user");
        nav("/");
    }

    return(
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">

            <div className="container">

                <Link className="navbar-brand fw-bold" to="/dashboard">
                
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