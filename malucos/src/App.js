// App.js
// Mantido como .js conforme solicitado.
// Responsável por montar o layout principal (Header/Footer) e as rotas da aplicação.

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Importamos componentes/páginas em arquivos .jsx
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProductList from './pages/ProductList.jsx';
import ProductForm from './pages/ProductForm.jsx';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';

// Componente que define as rotas da aplicação.
// Observação: usamos useAuth para proteger rotas que exigem login.
function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Rota raiz redireciona para login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/registrar" element={<Register />} />

      {/* Rotas protegidas — exigem usuário autenticado */}
      <Route path="/app/lista" element={ user ? <ProductList /> : <Navigate to="/login" replace /> } />
      <Route path="/app/novo" element={ user ? <ProductForm /> : <Navigate to="/login" replace /> } />
      <Route path="/app/editar/:id" element={ user ? <ProductForm /> : <Navigate to="/login" replace /> } />

      {/* Qualquer outra rota volta para /login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  // AuthProvider envolve toda a aplicação para disponibilizar autenticação via contexto.
  return (
    <AuthProvider>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
