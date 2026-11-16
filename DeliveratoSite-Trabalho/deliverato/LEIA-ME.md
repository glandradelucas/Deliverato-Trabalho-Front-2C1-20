# Deliverato - "O Seu Prato Sai Barato"

Site de delivery feito só com HTML, CSS e JavaScript (sem frameworks, sem display grid).
Para abrir, é só dar dois cliques no `index.html`.

## Páginas
| Arquivo | O que é |
|---|---|
| index.html | Página inicial |
| restaurantes.html | Lista de restaurantes (filtros, CEP, paginação) |
| restaurante.html | Página de produtos da marca que a pessoa clicou (a escolha fica salva no localStorage) |
| carrinho.html | Carrinho + janela de cupons |
| login.html / cadastro.html | Entrar e criar conta (só aceita e-mail @gmail.com) |
| pagamento.html | Forma de pagamento |
| pedido.html | Acompanhar pedido (o status anda sozinho) |
| perfil.html | Foto, nome, e-mail, senha e endereço |

## Onde mexer
- `css/style.css` → todo o visual
- `js/dados.js` → restaurantes, produtos (nome, preço, descrição) e cupons
- `js/componentes.js` → header (com carrinho), rodapé, modo escuro, idioma, carrinho
- um arquivo `.js` para cada página

## Fotos dos produtos
Coloque as fotos em `img/produtos/` com o nome do id do produto (o id está em `js/dados.js`).
Exemplo: `img/produtos/sw-bmt.png` para o Italian B.M.T. do Subway.
Enquanto não tiver a foto, aparece a imagem padrão (`quadrosla.png`).

## Observações
- Os dados (login, carrinho, pedidos) ficam salvos no navegador (localStorage).
- O pagamento é só simulação: nenhum dado sai do computador.
