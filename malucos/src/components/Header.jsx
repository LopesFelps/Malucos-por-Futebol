// Header.jsx
// Cabeçalho com marca e navegação.
// Mostra links diferentes dependendo se o usuário está logado.

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Header(){
  const { user, logout } = useAuth();
  const loc = useLocation();

  return (
    <header className="app-header">
      {/* Marca / logo */}
      <div className="brand">
        <div className="logo">MF</div>
        <div>
          <div style={{fontWeight:800}}>Malucos por futebol</div>
          <div style={{fontSize:12, color:'var(--muted)'}}>Loja | Camisas | Bolas | Acessórios</div>
        </div>
      </div>

      {/* Navegação: se user existe, mostra links internos; caso contrário, mostra Login/Registrar */}
      <nav className="nav-links">
        { user ? (
          <>
            <Link to="/app/lista" className={loc.pathname.startsWith('/app/lista') ? 'active' : ''}>Produtos</Link>
            <Link to="/app/novo" className={loc.pathname === '/app/novo' ? 'active' : ''}>Adicionar</Link>
            {/* Botão de logout chama a função logout do contexto */}
            <button className="btn btn-ghost" onClick={logout} style={{marginLeft:12}}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/login" className={loc.pathname === '/login' ? 'active' : ''}>Login</Link>
            <Link to="/registrar" className={loc.pathname === '/registrar' ? 'active' : ''}>Registrar</Link>
          </>
        )}
      </nav>
    </header>
  );
}
