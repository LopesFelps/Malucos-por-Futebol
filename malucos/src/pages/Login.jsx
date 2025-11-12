// Login.jsx
// Tela de login com validações simples.
// Explica onde os dados são salvos (localStorage via AuthContext).

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Login(){
  // Pegamos a função login do contexto para salvar usuário
  const { login } = useAuth();
  const navigate = useNavigate();

  // Estados locais do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // handleSubmit: valida e "loga" o usuário simuladamente.
  function handleSubmit(e){
    e.preventDefault();
    setError(null);

    // Validações básicas
    if(!email || !password){
      setError('Preencha e-mail e senha.');
      return;
    }

    // Aqui fica salvo os dados do login: chamamos login(userObj) do AuthContext,
    // que persiste o usuário no localStorage com a chave 'mpf_user'.
    const userObj = { name: 'Usuário Demo', email };
    login(userObj);

    // Redireciona para a lista de produtos após "login"
    navigate('/app/lista');
  }

  return (
    <div style={{maxWidth:720, margin:'0 auto'}}>
      <div className="card">
        <h2>Entrar — Malucos por futebol</h2>
        <p style={{color:'var(--muted)'}}>Acesso simulado para apresentação.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Email</label>
            <input className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@exemplo.com" />
          </div>
          <div className="form-row">
            <label>Senha</label>
            <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="********" />
          </div>

          {error && <div style={{color:'var(--danger)', marginBottom:10}}>{error}</div>}

          <div style={{display:'flex', gap:8}}>
            <button className="btn btn-primary" type="submit">Entrar</button>
            <Link to="/registrar"><button type="button" className="btn btn-ghost">Registrar</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}
