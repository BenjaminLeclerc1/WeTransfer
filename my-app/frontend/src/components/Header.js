// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import "../assets/css/NavBar.css"
// function Header() {

//     const [isLoggedIn, setIsLoggedIn] = useState(true);

//     useEffect(() => {
//         // Vérifiez si le token est dans le localStorage
//         const token = localStorage.getItem('token');
//         if (token) {
//           setIsLoggedIn(true); // L'utilisateur est connecté
//         } else {
//           setIsLoggedIn(false); // L'utilisateur n'est pas connecté
//         }
//       }, []);

//       const handleLogout = () => {
//         // Supprimez le token du localStorage lors de la déconnexion
//         localStorage.removeItem('token');
//         setIsLoggedIn(false); // Mettez à jour l'état pour refléter la déconnexion
//       };
    
//   return (
//     <div>
//       <div className='navlinks'>
//         <ul className='nav-items'>
//           <li>
//             <Link to='/'>Accueil</Link>
//           </li>
//           {isLoggedIn ? (
//             <>
             
//              <li>
//                 <Link to='/filelist'>filelist</Link>
//               </li>
//               <li>
//                 <Link to='/logout' onClick={handleLogout}>Logout</Link>
//               </li>
//               {/* Vous pouvez également ajouter d'autres liens pour les utilisateurs connectés ici */}
//             </>
//           ) : (
//             <>
//               <li>
//                 <Link to='/login'>Login</Link>
//               </li>
//               <li>
//                 <Link to='/register'>Register</Link>
//               </li>
//             </>
//           )}
//           <li>
//             <Link to='/fileupload'>File Upload</Link>
//           </li>
//         </ul>
//       </div>
//     </div>
  
// //     <div>
// //     <nav className="navbar navbar-expand-lg bg-body-secondary">
// //         <div className="containerHeader container-fluid">
// //             <div className="">
// //                 <h1><a className="navbar-brand p-5" href="/">WeTransfer</a></h1>
// //                 <button className="navbar-toggler w-50" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
// //                     <span className="navbar-toggler-icon"></span>
// //                 </button>
// //             </div>
// //             <div className="collapse navbar-collapse" id="navbarSupportedContent">
// //                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
// //                     <li className="nav-item">
// //                         <a className="nav-link active" aria-current="page" href="/">Home</a>
// //                     </li>
// //                     <li className="nav-item dropdown">
// //                         <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
// //                             Options
// //                         </a>
// //                         <ul className="dropdown-menu">
// //                                 <>
// //                                     <li><a className="dropdown-item" href="/filelist">Listes des transfers</a></li>
// //                                     <li>
// //                                         <a className="dropdown-item bg-danger text-light" href='/logout' onClick={handleLogout}>Logout</a>
// //                                     </li>
// //                                     {/* Vous pouvez également ajouter d'autres liens pour les utilisateurs connectés ici */}
// //                                 </>
                          
// //                                 <>
// //                                     <li>
// //                                         <a className="dropdown-item" href='/login'>Login</a>
// //                                     </li>
// //                                     <li>
// //                                         <a className="dropdown-item" href='/register'>Register</a>
// //                                     </li>
// //                                 </>
                          
// //                             {/* <li>
// //                                 <a className="dropdown-item active bg-secondary" href="/login">Connexion</a>
// //                             </li>
// //                             <li>
// //                                 <a className="dropdown-item" href="/register">Inscription</a>
// //                             </li>
// //                             <li>
// //                                 <a className="dropdown-item" href="/logout">Deconnection</a>
// //                             </li> */}
                            
// //                         </ul>
// //                     </li>
                    
// //                 </ul>
// //             </div>
// //         </div>
// //     </nav>
// // </div>
  



//   )
// }

// export default Header





// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
// import "../assets/css/NavBar.css";


// function Header() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         setIsLoggedIn(!!token);
//     }, []);

//     // const handleLogout = () => {
//     //     localStorage.removeItem('token');
//     //     setIsLoggedIn(false);
//     // };

//     const handleLogout = () => {
//         fetch("http://localhost:3000/users/logout", { method: "POST" })
//           .then((response) => response.json())
//           .then((data) => {
//             if (data.message === "deconnected") {
//               // Remove the JWT token from localStorage
//               localStorage.removeItem("token");
    
//               // Update state to reflect logout
//               setIsLoggedIn(false);
    
//               // Redirect to the login page
//               navigate("/login");
//             }
//           })
//           .catch((error) => console.error("Error:", error));
//       };

//     return (
//         <Navbar expand="lg" bg="light" variant="light" className="shadow-sm p-3 bg-body-tertiary rounded">
//             <Container fluid>
//                 <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-4">
//                     WeTransfer
//                 </Navbar.Brand>
//                 <Navbar.Toggle aria-controls="navbarNavDropdown" />
//                 <Navbar.Collapse id="navbarNavDropdown">
//                     <Nav className="me-auto">
//                         <Nav.Link as={Link} to="/" className="text-secondary">
//                             Accueil
//                         </Nav.Link>
//                         {/* <Nav.Link as={Link} to="/fileupload" className="text-secondary">
//                             File Upload
//                         </Nav.Link> */}
                        
//                         {isLoggedIn ? (
//                             <>
//                                 <NavDropdown title="Options" id="nav-dropdown" className="text-secondary">
//                                     <NavDropdown.Item as={Link} to="/filelist">Listes des transfers</NavDropdown.Item>
//                                     <NavDropdown.Divider />
//                                     <NavDropdown.Item as={Link} to="/logout" onClick={handleLogout} className="text-danger">
//                                         Logout
//                                     </NavDropdown.Item>
//                                 </NavDropdown>
//                             </>
//                         ) : (
//                             <>
//                                 <Nav.Link as={Link} to="/login" className="text-secondary">
//                                     Login
//                                 </Nav.Link>
//                                 <Nav.Link as={Link} to="/register" className="text-secondary">
//                                     Register
//                                 </Nav.Link>
//                             </>
//                         )}
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// }

// export default Header;








import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import "../assets/css/NavBar.css";

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = (event) => {
        // Empêcher le comportement par défaut du lien
        event.preventDefault();

        fetch("http://localhost:3000/users/logout", { method: "POST" })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "deconnected") {
                    // Supprimer le token JWT du localStorage
                    localStorage.removeItem("token");
    
                    // Mettre à jour l'état pour refléter la déconnexion
                    setIsLoggedIn(false);
    
                    // Rediriger vers la page de connexion
                    navigate("/login");
                }
            })
            .catch((error) => console.error("Error:", error));
    };

    return (
        <Navbar expand="lg" bg="light" variant="light" className="shadow-sm p-3 bg-body-tertiary rounded">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-4">
                    WeTransfer
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNavDropdown" />
                <Navbar.Collapse id="navbarNavDropdown">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className="text-secondary">
                            Accueil
                        </Nav.Link>
                        
                        {isLoggedIn ? (
                            <>
                                <NavDropdown title="Options" id="nav-dropdown" className="text-secondary">
                                    <NavDropdown.Item as={Link} to="/filelist">Listes des transferts</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as="button" onClick={handleLogout} className="text-danger">
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" className="text-secondary">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register" className="text-secondary">
                                    Register
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
