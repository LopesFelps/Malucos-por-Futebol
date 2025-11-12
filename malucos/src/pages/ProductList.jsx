// ProductList.jsx
// Lista de produtos com CRUD simulado via localStorage.
// Os produtos de exemplo apontam para imagens locais em /public/images/.
// Para usar suas fotos, coloque os arquivos em public/images/ com os nomes indicados.

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductList(){
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(null);

  // Ao montar, tentamos carregar a lista de produtos do localStorage.
  // Se não existir, criamos uma lista inicial com 4 produtos de exemplo.
  useEffect(() => {
    const raw = localStorage.getItem('mpf_products');
    if(raw){
      try{ setProducts(JSON.parse(raw)); }catch(e){ setProducts([]); }
    }else{
      // Produtos de exemplo já configurados para usar imagens locais:
      // public/images/camisa.jpg, bola.jpg, chuteira.jpg, meiao.jpg
      const sample = [
        {
          id:'p1', name:'Camisa Seleção', category:'Camisas', price:199.9, qty:10,
          desc:'Camisa oficial modelo 2024',
          img: process.env.PUBLIC_URL + '/images/camisa.jpg' // imagem local
        },
        {
          id:'p2', name:'Bola Oficial', category:'Bolas', price:129.0, qty:25,
          desc:'Bola para treino e jogo',
          img: process.env.PUBLIC_URL + '/images/bola.jpg'
        },
        {
          id:'p3', name:'Chuteira Speed', category:'Chuteiras', price:359.9, qty:5,
          desc:'Leve e confortável',
          img: process.env.PUBLIC_URL + '/images/chuteira.jpg'
        },
        {
          id:'p4', name:'Meião Oficial', category:'Acessórios', price:39.9, qty:50,
          desc:'Meião com elastano',
          img: process.env.PUBLIC_URL + '/images/meiao.jpg'
        }
      ];
      localStorage.setItem('mpf_products', JSON.stringify(sample));
      setProducts(sample);
    }
  }, []);

  // Função para salvar produtos em estado e localStorage
  function save(newList){
    setProducts(newList);
    localStorage.setItem('mpf_products', JSON.stringify(newList));
  }

  // Excluir produto (com confirmação)
  function handleDelete(id){
    if(!window.confirm('Confirma exclusão do produto?')) return;
    const filtered = products.filter(p => p.id !== id);
    save(filtered);
    setMessage('Produto excluído com sucesso.');
    setTimeout(()=>setMessage(null),3000);
  }

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14}}>
        <h2>Produtos — Malucos por futebol</h2>
        <Link to="/app/novo"><button className="btn btn-primary">Adicionar novo</button></Link>
      </div>

      {message && <div style={{color:'var(--muted)'}}>{message}</div>}

      <div className="product-grid">
        {products.map(p => (
          <div className="product-card card" key={p.id}>
            <div className="product-thumb">
              {/* Se imagem existir, mostramos via <img>; caso contrário, nome da categoria */}
              { p.img ? <img src={p.img} alt={p.name} /> : <div style={{padding:12, color:'var(--muted)'}}>{p.category}</div> }
            </div>

            <div style={{fontWeight:700}}>{p.name}</div>
            <div style={{color:'var(--muted)', fontSize:13}}>{p.desc}</div>

            <div style={{marginTop:'auto', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <div style={{fontWeight:800}}>R$ {Number(p.price).toFixed(2)}</div>
                <div style={{fontSize:12, color:'var(--muted)'}}>Estoque: {p.qty}</div>
              </div>

              <div style={{display:'flex', flexDirection:'column', gap:8}}>
                <Link to={`/app/editar/${p.id}`}><button className="btn btn-ghost">Editar</button></Link>
                <button className="btn btn-danger" onClick={()=>handleDelete(p.id)}>Excluir</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
