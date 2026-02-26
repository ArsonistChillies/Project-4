import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
        const nav=useNavigate();
        const userId=localStorage.getItem("userId");
        const userEmail=localStorage.getItem("userEmail");

        if(!userId) return null;

        function logout(){
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        nav("/");
    }

    return(
        <nav className="navbar navbar-dark bg-success navbar-expand-lg sticky-top">

            <div className="container">

                <Link className="navbar-brand fw-bold d-flex align-items-center" to="/dashboard">
                    <span style={{fontSize: '1.5rem'}} className="me-2">🌱</span>
                    <span>GardenHub</span>
                </Link>

                <div className="d-flex align-items-center gap-2">

                    <Link className="btn btn-outline-light" to="/dashboard">
                        <i className="bi bi-house-door me-1"></i>
                        Home
                    </Link>

                    {userEmail && (
                        <span className="text-white d-none d-md-inline me-2">
                            <i className="bi bi-person-circle me-1"></i>
                            {userEmail}
                        </span>
                    )}

                    <button onClick={logout} className="btn btn-danger">
                        <i className="bi bi-box-arrow-right me-1"></i>
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );
}
