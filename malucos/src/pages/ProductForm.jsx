// ProductForm.jsx
// Formulário para criar/editar produto.
// Permite informar a URL da imagem ou, se desejar, usar imagens locais com process.env.PUBLIC_URL.

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductForm(){
  const navigate = useNavigate();
  const { id } = useParams();

  // Estado do formulário; inclui 'img' que é o caminho/URL da imagem.
  // Para usar imagens locais, informe: process.env.PUBLIC_URL + '/images/nome.jpg'
  const [form, setForm] = useState({ name:'', category:'Camisas', price:0, qty:1, desc:'', img:'' });
  const [error, setError] = useState(null);

  // Se estivermos editando (id presente), carregamos os dados do produto
  useEffect(() => {
    if(!id) return;
    const raw = localStorage.getItem('mpf_products');
    if(raw){
      const list = JSON.parse(raw);
      const prod = list.find(p => p.id === id);
      if(prod) setForm(prod);
    }
  }, [id]);

  // Atualiza o estado do formulário
  function handleChange(e){
    const { name, value } = e.target;
    setForm(prev => ({...prev, [name]: name === 'price' || name === 'qty' ? Number(value) : value }));
  }

  // Ao salvar, atualizamos localStorage (simulando backend)
  function handleSubmit(e){
    e.preventDefault();
    setError(null);
    if(!form.name){ setError('Nome obrigatório'); return; }
    const raw = localStorage.getItem('mpf_products');
    const list = raw ? JSON.parse(raw) : [];

    if(id){
      // Edita produto existente
      const updated = list.map(p => p.id === id ? {...form, id} : p);
      localStorage.setItem('mpf_products', JSON.stringify(updated));
    }else{
      // Cria novo produto com id simples
      const newId = 'p' + Date.now();
      const item = {...form, id: newId};
      list.push(item);
      localStorage.setItem('mpf_products', JSON.stringify(list));
    }

    // Volta para a lista ao finalizar
    navigate('/app/lista');
  }

  return (
    <div style={{maxWidth:820, margin:'0 auto'}}>
      <div className="card">
        <h2>{id ? 'Editar produto' : 'Adicionar produto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
              <label>Nome</label>
              <input name="name" className="input" value={form.name} onChange={handleChange} />
            </div>
            <div>
              <label>Categoria</label>
              <select name="category" className="select input" value={form.category} onChange={handleChange}>
                <option>Camisas</option>
                <option>Bolas</option>
                <option>Acessórios</option>
                <option>Chuteiras</option>
              </select>
            </div>

            <div>
              <label>Preço (R$)</label>
              <input name="price" type="number" step="0.01" className="input" value={form.price} onChange={handleChange} />
            </div>
            <div>
              <label>Quantidade</label>
              <input name="qty" type="number" className="input" value={form.qty} onChange={handleChange} />
            </div>

            <div style={{gridColumn:'1 / -1'}}>
              <label>Descrição</label>
              <textarea name="desc" rows="4" className="input" value={form.desc} onChange={handleChange}></textarea>
            </div>

            <div style={{gridColumn:'1 / -1'}}>
              <label>Caminho/URL da imagem</label>
              <input
                name="img"
                className="input"
                value={form.img}
                onChange={handleChange}
                placeholder="Ex: process.env.PUBLIC_URL + '/images/camisa.jpg' ou https://..."
              />
              <small style={{color:'var(--muted)'}}>
                Dica: para usar imagens locais (na pasta public/images), escreva: process.env.PUBLIC_URL + '/images/nome.jpg'
              </small>
            </div>
          </div>

          {error && <div style={{color:'var(--danger)', marginTop:10}}>{error}</div>}

          <div style={{marginTop:12}}>
            <button className="btn btn-primary" type="submit">Salvar</button>
            <button type="button" className="btn btn-ghost" style={{marginLeft:8}} onClick={()=>navigate('/app/lista')}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
