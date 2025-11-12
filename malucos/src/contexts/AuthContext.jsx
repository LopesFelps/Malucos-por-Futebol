import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Hook para consumir o contexto em outros arquivos: const { user, login, logout } = useAuth();
export function useAuth(){
  return useContext(AuthContext);
}

// Provider que envolve a aplicação e fornece funções de login/logout e o objeto user.
// Os dados do usuário são salvos no localStorage com a chave 'mpf_user'.
export function AuthProvider({ children }){
  const [user, setUser] = useState(null);

  // Ao montar o provider, tentamos ler a sessão salva no localStorage.
  // Aqui fica salvo os dados do login (nome/email) quando o usuário efetua login.
  useEffect(() => {
    const raw = localStorage.getItem('mpf_user');
    if(raw){
      try{
        setUser(JSON.parse(raw)); // Converte string para objeto e seta como usuário autenticado
      }catch(e){
        // Se a string estiver corrompida, removemos do storage
        localStorage.removeItem('mpf_user');
      }
    }
  }, []);

  // Exemplo de userObj: { name: 'João', email: 'joao@ex.com' }
  function login(userObj){
    localStorage.setItem('mpf_user', JSON.stringify(userObj)); // Persistência local
    setUser(userObj); // Atualiza contexto
  }

  // Logout remove os dados do localStorage e limpa o estado.
  function logout(){
    localStorage.removeItem('mpf_user');
    setUser(null);
  }

  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
