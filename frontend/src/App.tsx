import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import Header from './components/Header';

function App() {

  return (
    <div>
      <Header/>

      <div className='container mt-5 w-50'>
        <form action="" className='sendContainer'>
          <h1>Ajouter des fichiers</h1>
          <div className='inputContainer mb-3 w-50'>
            <label htmlFor="youremail">Envoyer à</label>
            <input type="email" name="youremail" id="youremail" placeholder='Envoyer à' />
          </div>
          <div className='inputContainer mb-3 w-50'>
            <label htmlFor="youremail">Votre adresse Email</label>
            <input type="email" name="myemail" id="myemail" placeholder='Votre adresse e-mail'/>
          </div>
          <div className="inputContainer mb-3 w-50">
            <label htmlFor="message">Titre</label>
            <input type="email" name="title" id="title"  placeholder='Titre'/>
          </div>
          {/* <!-- Button trigger modal --> */}
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Importer vos fichiers
          </button>

          {/* <!-- Modal --> */}
          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">Choississez vos fichiers</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <input type="file" name="sendfile" id="sendfile" />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-success">Valider le fichier</button>
                </div>
              </div>
            </div>
          </div>
          <button type="button" className='mb-3 mt-3 w-100'>Envoyer</button>
        </form>
      </div>
    </div>
  )
}

export default App
