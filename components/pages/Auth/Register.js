import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <Link to="/" className="auth-logo"> Get A Pet</Link>
        <h1>Crie sua conta</h1>
        <p className="auth-subtitle">Junte-se a nós e encontre seu pet ideal</p>

        <div className="auth-form">
          <div className="form-group">
            <label>Nome</label>
            <input type="text" placeholder="Seu nome completo" />
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input type="email" placeholder="seu@email.com" />
          </div>
          <div className="form-group">
            <label>Telefone</label>
            <input type="tel" placeholder="(00) 00000-0000" />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <button className="btn-submit">Criar conta</button>
        </div>

        <p className="auth-footer">
          Já tem uma conta?{' '}
          <Link to="/login">Entrar</Link>
        </p>
      </div>

      <div className="auth-visual">
        <h2>Seja bem-vindo!</h2>
        <p>Faça parte da nossa comunidade</p>
      </div>
    </div>
  );
}

export default Register;
