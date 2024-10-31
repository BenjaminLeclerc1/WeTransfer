import "../assets/css/NavBar.css"
export default function Header() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-secondary">
            <div className="container-fluid">
                <h1><a className="navbar-brand" href="/">WeTransfer</a></h1>
                <button className="navbar-toggler w-50" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Options
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/listes-des-transfers">Listes des transfers</a></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li>
                                    <a className="dropdown-item active bg-secondary" href="/login">Connexion</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/register">Inscription</a>
                                </li>
                            </ul>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}