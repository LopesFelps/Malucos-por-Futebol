import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Register(){
  const { login } = useAuth();
  const navigate = useNavigate();

  // Estado do formulário com campos de endereço
  const [form, setForm] = useState({
    name:'', email:'', password:'', confirm:'', cep:'', street:'', city:'', state:''
  });
  const [error, setError] = useState(null);
  const [loadingCep, setLoadingCep] = useState(false);

  // Atualiza campos do formulário (genérico)
  function handleChange(e){
    const { name, value } = e.target;
    setForm(prev => ({...prev, [name]: value}));
  }

  // Busca de CEP usando ViaCEP (API pública).
  // Observação: este fetch exige conexão com a internet quando usado.
  async function buscaCep(){
    const cep = form.cep.replace(/\D/g,'');
    if(cep.length !== 8){ setError('CEP inválido. Deve ter 8 dígitos.'); return; }
    setError(null);
    setLoadingCep(true);
    try{
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if(data.erro){ setError('CEP não encontrado.'); }
      else{
        // Auto-preenche rua, cidade e estado usando dados retornados pela API
        setForm(prev => ({...prev, street: data.logradouro || '', city: data.localidade || '', state: data.uf || ''}));
      }
    }catch(err){
      setError('Erro ao consultar ViaCEP.');
    }finally{
      setLoadingCep(false);
    }
  }

  // Ao submeter o formulário de registro, validamos e chamamos login()
  // para criar sessão automaticamente (simulado).
  function handleSubmit(e){
    e.preventDefault();
    setError(null);
    if(!form.name || !form.email || !form.password || !form.confirm){
      setError('Preencha todos os campos obrigatórios.');
      return;
    }
    if(form.password.length < 4){ setError('Senha muito curta (mínimo 4 caracteres).'); return; }
    if(form.password !== form.confirm){ setError('Senhas não coincidem.'); return; }

    // Criamos o objeto do usuário e salvamos via login() do AuthContext.
    const userObj = { name: form.name, email: form.email, address: { cep: form.cep, street: form.street, city: form.city, state: form.state } };
    login(userObj); // Salva em localStorage 'mpf_user'
    navigate('/app/lista');
  }

  return (
    <div style={{maxWidth:900, margin:'0 auto'}}>
      <div className="card">
        <h2>Registrar novo usuário</h2>
        <p style={{color:'var(--muted)'}}>Preencha seus dados. Use um CEP para auto-preencher endereço (ViaCEP).</p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
              <label>Nome</label>
              <input name="name" className="input" value={form.name} onChange={handleChange} />
            </div>
            <div>
              <label>Email</label>
              <input name="email" className="input" value={form.email} onChange={handleChange} />
            </div>

            <div>
              <label>Senha</label>
              <input name="password" type="password" className="input" value={form.password} onChange={handleChange} />
            </div>
            <div>
              <label>Confirmar Senha</label>
              <input name="confirm" type="password" className="input" value={form.confirm} onChange={handleChange} />
            </div>

            <div>
              <label>CEP</label>
              <div style={{display:'flex', gap:8}}>
                <input name="cep" className="input" value={form.cep} onChange={handleChange} />
                <button type="button" className="btn btn-ghost" onClick={buscaCep}>{loadingCep ? '...' : 'Buscar CEP'}</button>
              </div>
            </div>
            <div>
              <label>Rua</label>
              <input name="street" className="input" value={form.street} onChange={handleChange} />
            </div>

            <div>
              <label>Cidade</label>
              <input name="city" className="input" value={form.city} onChange={handleChange} />
            </div>
            <div>
              <label>Estado</label>
              <input name="state" className="input" value={form.state} onChange={handleChange} />
            </div>
          </div>

          {error && <div style={{color:'var(--danger)', marginTop:10}}>{error}</div>}

          <div style={{marginTop:12}}>
            <button className="btn btn-primary" type="submit">Registrar</button>
            <button type="button" className="btn btn-ghost" style={{marginLeft:8}} onClick={() => { window.location.href = '/login'; }}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
