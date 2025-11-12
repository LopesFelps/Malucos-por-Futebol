// Footer.jsx
// Rodapé simples com ano atual.
// Comentário explicativo para apresentação.

import React from 'react';

export default function Footer(){
  return (
    <footer className="app-footer">
      <div>© {new Date().getFullYear()} Malucos por futebol</div>
      <div style={{color:'var(--muted)', fontSize:13}}>Projeto em React — Apresentação</div>
    </footer>
  );
}
