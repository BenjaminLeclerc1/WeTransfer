import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Vérifiez si le token est dans le localStorage
        const token = localStorage.getItem('token');
        if (token) {
          setIsLoggedIn(true); // L'utilisateur est connecté
        } else {
          setIsLoggedIn(false); // L'utilisateur n'est pas connecté
        }
      }, []);

      const handleLogout = () => {
        // Supprimez le token du localStorage lors de la déconnexion
        localStorage.removeItem('token');
        setIsLoggedIn(false); // Mettez à jour l'état pour refléter la déconnexion
      };
    
  return (
    <div>
      <div className='navlinks'>
        <ul className='nav-items'>
          <li>
            <Link to='/'>Accueil</Link>
          </li>
          {isLoggedIn ? (
            <>
             
             <li>
                <Link to='/filelist'>filelist</Link>
              </li>
              <li>
                <Link to='/logout' onClick={handleLogout}>Logout</Link>
              </li>
              {/* Vous pouvez également ajouter d'autres liens pour les utilisateurs connectés ici */}
            </>
          ) : (
            <>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/register'>Register</Link>
              </li>
            </>
          )}
          <li>
            <Link to='/fileupload'>File Upload</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home
