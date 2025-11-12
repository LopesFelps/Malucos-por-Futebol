// Aqui inicializamos o React e o BrowserRouter, montando o App no elemento #root.

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';

// Pegamos o elemento com id 'root' (presente em public/index.html)
const container = document.getElementById('root');
const root = createRoot(container);

// Renderizamos o App dentro do BrowserRouter (para habilitar rotas)
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
