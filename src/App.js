import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.css';
import spotify from './assets/spotify.png'

function App() {
  return (
    <div className="app-container">
      <nav className="navbar navbar-dark justify-content-between p-3">
        <div className="d-flex align-items-center">
          <img src={spotify} alt="Logo" className="logo" />
          <span className="navbar-brand h1">SpotifyRecomender</span>
        </div>
        <div>
          <button className="btn btn-outline-light me-2 nav-btn">Log In</button>
          <button className="btn btn-outline-light nav-btn">Sign Up</button>
        </div>
      </nav>

      <div className="main-content d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className="text-light title">¿Estás buscando algo nuevo para escuchar?</h1>
        <button className="btn btn-success mt-4">Empezar a escuchar</button>
      </div>
    </div>
  );
}

export default App;
