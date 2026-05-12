import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo"> Get A Pet</div>
        <div className="nav-links">
          <Link to="/login">Entrar</Link>
          <Link to="/register" className="btn-register">Cadastrar</Link>
        </div>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <span className="badge">Adote com amor </span>
          <h1>Encontre seu<br /><span>companheiro</span> perfeito</h1>
          <p>Conectamos pets que precisam de um lar com famílias cheias de amor. Adote, não compre.</p>
          <div className="hero-actions">
            <Link to="/register" className="btn-primary">Começar agora</Link>
            <Link to="/login" className="btn-secondary">Já tenho conta</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="pet-card">
          
            <p className="pet-name">Rex</p>
            <p className="pet-info">Golden Retriever • 2 anos</p>
            <span className="pet-tag">Disponível</span>
          </div>
          <div className="pet-card pet-card--offset">
            <p className="pet-name">Luna</p>
            <p className="pet-info">Siamês • 1 ano</p>
            <span className="pet-tag">Disponível</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
