# 🏆 Malucos por Futebol

**Malucos por Futebol** é um projeto de uma loja virtual de produtos esportivos (voltada ao futebol), desenvolvido com **React.js**, **HTML**, **CSS** e **JavaScript puro (sem TypeScript)**.

O projeto foi criado com o objetivo de aplicar conceitos de **SPA (Single Page Application)**, **componentização**, **contexto de autenticação**, **persistência local (localStorage)** e integração com uma API pública (ViaCEP).

---

## 🚀 Tecnologias Utilizadas

- **React.js (JSX)** — Biblioteca principal para criação da interface.
- **React Router DOM** — Gerenciamento de rotas (navegação SPA).
- **CSS3** — Estilização customizada com tema escuro e responsivo.
- **JavaScript (ES6+)** — Lógica de autenticação, CRUD e integração com API.
- **ViaCEP API** — Consulta automática de endereço pelo CEP.
- **LocalStorage** — Persistência de dados (usuários e produtos) sem backend.

---

🧠 Funcionalidades

✅ Login e Registro de usuários (com persistência local)
✅ Consulta de endereço via ViaCEP
✅ Listagem, adição, edição e exclusão de produtos
✅ Imagens locais integradas ao sistema
✅ Layout responsivo com tema escuro
✅ Proteção de rotas (acesso restrito após login)
✅ Totalmente funcional sem backend

---

🧱 Desafios Técnicos e Soluções
🔸 1. Autenticação sem backend

Desafio: implementar login e persistência sem servidor.
Solução: uso do React Context API + localStorage para simular autenticação e sessão persistente.

---

🔸 2. CRUD de produtos

Desafio: permitir criar, editar e excluir produtos localmente, simulando uma API.
Solução: CRUD completo implementado em memória e salvo no localStorage.

---

🔸 3. Uso de imagens locais

Desafio: carregar imagens salvas na pasta public/ dentro do React (sem import direto).
Solução: uso de caminho relativo:

---

🔸 4. Integração com API ViaCEP

Desafio: buscar endereço automaticamente a partir do CEP digitado.
Solução: consumo da API pública https://viacep.com.br/ws/{cep}/json/ com fetch, e preenchimento automático de campos.

---

🔸 5. Estilo uniforme e legibilidade

Desafio: manter tema escuro com contraste adequado (principalmente no <select>).
Solução: customização CSS dos elementos nativos:

----

🧩 Dificuldades Enfrentadas

Garantir compatibilidade de estilo entre navegadores no <select> e <option>.

Ajustar rotas protegidas sem usar bibliotecas adicionais.

Controlar estados locais e globais sem Redux, apenas com useState e useContext.

Documentar cada parte do código com clareza, mantendo organização das pastas.

Simular backend de forma realista usando apenas localStorage.

---


💡 Resultados

O projeto final é completo, didático e funcional, ideal para fins acadêmicos e demonstrações de domínio em:

Estruturação de SPA com React;

Context API e gerenciamento de estado global;

Interação com API externa (ViaCEP);

CRUD local e persistência de dados;

Design responsivo e usabilidade em tema escuro.

---

👨‍💻 Autor

Desenvolvido por: Felipe Lopes  
📅 Data: Novembro/2025

