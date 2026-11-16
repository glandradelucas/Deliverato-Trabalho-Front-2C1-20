// =============================================
//  SCRIPT DO SITE DELIVERATO
//  Tem as coisas de todas as paginas.
//  Os restaurantes e produtos ficam no dados.js
// =============================================


// ---------- MODO ESCURO ----------
// se a pessoa deixou escuro antes, a pagina ja abre escura
if (localStorage.getItem("tema") == "escuro") {
  document.body.classList.add("escuro");
}


// =============================================
//  FUNCOES QUE EU USO EM VARIAS PAGINAS
// =============================================

// transforma 27.9 em "R$ 27,90"
function dinheiro(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

// pega o usuario que entrou (se nao entrou, volta null)
function pegarUsuario() {
  if (localStorage.getItem("logado") != "sim") {
    return null;
  }
  return JSON.parse(localStorage.getItem("usuario"));
}

// pega o carrinho salvo no navegador
function pegarCarrinho() {
  let carrinho = localStorage.getItem("carrinho");
  if (carrinho == null) {
    return { loja: "", itens: [] };
  }
  return JSON.parse(carrinho);
}

function salvarCarrinho(carrinho) {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// pega a lista de pedidos ja feitos
function pegarPedidos() {
  let pedidos = localStorage.getItem("pedidos");
  if (pedidos == null) {
    return [];
  }
  return JSON.parse(pedidos);
}

// procura o restaurante pelo id (ex: "subway")
function acharRestaurante(id) {
  for (let i = 0; i < RESTAURANTES.length; i++) {
    if (RESTAURANTES[i].id == id) {
      return RESTAURANTES[i];
    }
  }
  return null;
}

// procura o produto dentro do restaurante
function acharProduto(restaurante, id) {
  for (let i = 0; i < restaurante.produtos.length; i++) {
    if (restaurante.produtos[i].id == id) {
      return restaurante.produtos[i];
    }
  }
  return null;
}

// procura o cupom pelo id
function acharCupom(id) {
  for (let i = 0; i < CUPONS.length; i++) {
    if (CUPONS[i].id == id) {
      return CUPONS[i];
    }
  }
  return null;
}

// ve se o restaurante esta aberto agora
function estaAberto(restaurante) {
  let hora = new Date().getHours();
  return hora >= restaurante.abre && hora < restaurante.fecha;
}

// foto do produto (fica na pasta img/produtos com o id do produto)
function fotoProduto(produto) {
  return '<img src="img/produtos/' + produto.id + '.png" alt="">';
}

// MASCARA DO EMAIL: so aceita @gmail.com
function emailValido(email) {
  return email.endsWith("@gmail.com") && email.length > 10 && !email.includes(" ");
}

// MASCARA DO CEP: deixa no formato 00000-000
function mascaraCep(campo) {
  campo.addEventListener("input", function () {
    let numeros = campo.value.replace(/\D/g, ""); // tira tudo que nao e numero
    numeros = numeros.substring(0, 8);
    if (numeros.length > 5) {
      campo.value = numeros.substring(0, 5) + "-" + numeros.substring(5);
    } else {
      campo.value = numeros;
    }
  });
}

// junta o endereco em um texto so
function textoEndereco(e) {
  let texto = e.rua + ", " + e.numero;
  if (e.complemento != "") {
    texto = texto + " - " + e.complemento;
  }
  texto = texto + ", " + e.bairro + ", CEP " + e.cep + " - Belo Horizonte, MG";
  return texto;
}

// coloca um produto no carrinho
function adicionarNoCarrinho(idLoja, idProduto) {
  let carrinho = pegarCarrinho();

  // o carrinho so pode ter coisa de uma loja, se for outra loja comeca de novo
  if (carrinho.loja != idLoja) {
    carrinho = { loja: idLoja, itens: [] };
  }

  let achou = false;
  for (let i = 0; i < carrinho.itens.length; i++) {
    if (carrinho.itens[i].id == idProduto) {
      carrinho.itens[i].qtd = carrinho.itens[i].qtd + 1;
      achou = true;
    }
  }
  if (achou == false) {
    carrinho.itens.push({ id: idProduto, qtd: 1 });
  }

  salvarCarrinho(carrinho);
  atualizarNumeroCarrinho();
}

// faz as contas do carrinho
function calcularValores() {
  let carrinho = pegarCarrinho();
  let restaurante = acharRestaurante(carrinho.loja);

  let subtotal = 0;
  let taxa = 0;
  if (restaurante != null) {
    for (let i = 0; i < carrinho.itens.length; i++) {
      let produto = acharProduto(restaurante, carrinho.itens[i].id);
      subtotal = subtotal + produto.preco * carrinho.itens[i].qtd;
    }
    taxa = restaurante.taxaEntrega;
  }

  // cupom escolhido (no comeco e o de boas-vindas)
  let cupom = localStorage.getItem("cupom");
  if (cupom == null) {
    cupom = "boasvindas";
  }

  let desconto = 0;
  if (cupom == "boasvindas" && pegarPedidos().length == 0) {
    desconto = subtotal * 0.3;
  }
  if (cupom == "promomc" && carrinho.loja == "mcdonalds") {
    desconto = subtotal * 0.2;
  }
  if (cupom == "hipotetico" && pegarPedidos().length >= 10) {
    desconto = subtotal * 0.5;
  }
  desconto = Math.round(desconto * 100) / 100;

  return {
    subtotal: subtotal,
    taxa: taxa,
    desconto: desconto,
    total: subtotal + taxa - desconto,
    cupom: cupom,
  };
}

// abre uma janelinha na tela
function abrirJanela(conteudo, classe) {
  let fundo = document.createElement("div");
  fundo.className = "modal-fundo aberto";
  fundo.innerHTML = '<div class="modal ' + classe + '"><button class="fechar">&times;</button>' + conteudo + "</div>";
  document.body.appendChild(fundo);

  fundo.querySelector(".fechar").onclick = function () {
    fundo.remove();
  };
}

function fecharJanela() {
  document.querySelector(".modal-fundo").remove();
}


// =============================================
//  HEADER (TOPO) - aparece em todas as paginas
// =============================================

let iconeCarrinho =
  '<svg viewBox="0 0 24 24"><path fill="#000" d="M1 2.5c0-.55.45-1 1-1h2.2c.47 0 .88.33.98.79L5.6 4.5H21a1 1 0 0 1 .97 1.24l-1.8 7.2a2 2 0 0 1-1.94 1.51H8.1l.4 2h10.3a1 1 0 1 1 0 2H7.68a1 1 0 0 1-.98-.8L3.39 3.5H2c-.55 0-1-.45-1-1Z"/>' +
  '<circle fill="#000" cx="9" cy="21" r="1.8"/><circle fill="#000" cx="17.5" cy="21" r="1.8"/></svg>';

let usuario = pegarUsuario();
let menu = "";
if (usuario != null) {
  menu =
    '<div class="ola">Olá, ' + usuario.nome + "!</div>" +
    '<a href="perfil.html">Meu perfil</a>' +
    '<a href="pedido.html">Meus pedidos</a>' +
    '<a href="restaurantes.html">Restaurantes</a>' +
    '<a href="carrinho.html">Carrinho</a>' +
    '<button type="button" id="btnSair">Sair</button>';
} else {
  menu =
    '<a href="login.html">Entrar</a>' +
    '<a href="cadastro.html">Criar conta</a>' +
    '<a href="restaurantes.html">Restaurantes</a>';
}

document.getElementById("topo").outerHTML =
  '<header class="cabecalho">' +
  '  <a href="index.html" class="logo"><img src="img/deliverato-logo.png" alt="Deliverato"></a>' +
  '  <nav class="acoes">' +
  '    <a href="carrinho.html" class="btn-header btn-carrinho" title="Carrinho">' + iconeCarrinho + '<span class="badge vazio">0</span></a>' +
  '    <div class="menu-usuario">' +
  '      <button type="button" class="btn-header btn-user"><img src="img/user.png" alt=""><img src="img/seta.png" alt="" class="seta"></button>' +
  '      <div class="dropdown">' + menu + "</div>" +
  "    </div>" +
  '    <button type="button" class="btn-header btn-tema" title="Modo claro/escuro"><img src="img/sun.png" alt=""></button>' +
  '    <button type="button" class="btn-header btn-idioma"><img src="img/idioma.png" alt=""><span>PT</span></button>' +
  "  </nav>" +
  "</header>";

// abre e fecha o menu do usuario
document.querySelector(".btn-user").onclick = function () {
  document.querySelector(".dropdown").classList.toggle("aberto");
};

// botao sair
if (document.getElementById("btnSair") != null) {
  document.getElementById("btnSair").onclick = function () {
    localStorage.removeItem("logado");
    window.location.href = "index.html";
  };
}

// botao do sol: liga e desliga o modo escuro
document.querySelector(".btn-tema").onclick = function () {
  document.body.classList.toggle("escuro");
  if (document.body.classList.contains("escuro")) {
    localStorage.setItem("tema", "escuro");
  } else {
    localStorage.setItem("tema", "claro");
  }
};

// numero em cima do carrinho
function atualizarNumeroCarrinho() {
  let carrinho = pegarCarrinho();
  let quantidade = 0;
  for (let i = 0; i < carrinho.itens.length; i++) {
    quantidade = quantidade + carrinho.itens[i].qtd;
  }
  let numero = document.querySelector(".badge");
  numero.textContent = quantidade;
  if (quantidade == 0) {
    numero.classList.add("vazio");
  } else {
    numero.classList.remove("vazio");
  }
}
atualizarNumeroCarrinho();


// =============================================
//  RODAPE - aparece em todas as paginas
// =============================================

document.getElementById("rodape").outerHTML =
  '<footer class="rodape">' +
  '  <div class="container">' +
  "    <div>" +
  "      <h3>Fale Conosco:</h3>" +
  '      <ul class="contatos">' +
  '        <li><img src="img/whatsapp.png" alt="WhatsApp"> +55 (31) 99994-3552</li>' +
  '        <li><img src="img/phone-call.png" alt="Telefone"> +55 (31) 9994-3552</li>' +
  '        <li><img src="img/email.png" alt="E-mail"> televendas@deliverato.com.br</li>' +
  "      </ul>" +
  "    </div>" +
  '    <div class="direita">' +
  "      <h3>REDES SOCIAIS:</h3>" +
  '      <div class="redes">' +
  '        <a href="#"><img src="img/instagram.png" alt="Instagram"></a>' +
  '        <a href="#"><img src="img/facebook-app-symbol_1.png" alt="Facebook"></a>' +
  '        <a href="#"><img src="img/tiktok.png" alt="TikTok"></a>' +
  '        <a href="#"><img src="img/x.png" alt="X"></a>' +
  "      </div>" +
  '      <p class="endereco">ONDE ESTAMOS: RUA SÃO VICENTE - VENDA NOVA - 31510-080</p>' +
  '      <p class="copy">© DELIVERATO - TODOS OS DIREITOS RESERVADOS</p>' +
  "    </div>" +
  "  </div>" +
  "</footer>";


// =============================================
//  PAGINA: RESTAURANTES (restaurantes.html)
// =============================================

let paginaAtual = 1;

function mostrarRestaurantes() {
  let porPagina = 4;
  let totalPaginas = Math.ceil(RESTAURANTES.length / porPagina);
  let inicio = (paginaAtual - 1) * porPagina;
  let fim = inicio + porPagina;
  if (fim > RESTAURANTES.length) {
    fim = RESTAURANTES.length;
  }

  let html = "";
  for (let i = inicio; i < fim; i++) {
    let r = RESTAURANTES[i];

    let status = '<span class="aberto">Aberto</span>';
    if (estaAberto(r) == false) {
      status = '<span class="fechado">Fechado</span>';
    }

    html = html +
      '<a class="card-restaurante" href="restaurante.html" onclick="localStorage.setItem(\'loja\', \'' + r.id + '\')" style="--cor:' + r.cor + "; --destaque:" + r.destaque + '; --cor-texto:#000">' +
      '  <div class="principal">' +
      '    <img src="' + r.logo + '" alt="' + r.nome + '">' +
      "    <div>" +
      "      <h3>" + r.nome + "</h3>" +
      '      <span class="pill-status">Status: ' + status + "</span>" +
      '      <div class="linha-info"><img src="img/clock.png" alt=""> ' + r.tempo + "</div>" +
      '      <div class="linha-info"><span class="estrela">★</span> ' + String(r.avaliacao).replace(".", ",") + " (" + r.numAvaliacoes.toLocaleString("pt-BR") + " avaliações)</div>" +
      "    </div>" +
      "  </div>" +
      '  <div class="seta-card"><img src="img/setamaior.png" alt=""></div>' +
      "</a>";
  }

  document.getElementById("lista").innerHTML = html;
  document.getElementById("numPagina").textContent = paginaAtual + " / " + totalPaginas;
  document.getElementById("anterior").disabled = paginaAtual == 1;
  document.getElementById("proxima").disabled = paginaAtual == totalPaginas;
}

if (document.getElementById("lista") != null) {
  mostrarRestaurantes();

  document.getElementById("anterior").onclick = function () {
    paginaAtual = paginaAtual - 1;
    mostrarRestaurantes();
  };
  document.getElementById("proxima").onclick = function () {
    paginaAtual = paginaAtual + 1;
    mostrarRestaurantes();
  };

  mascaraCep(document.getElementById("cep"));
}


// =============================================
//  PAGINA: UM RESTAURANTE (restaurante.html)
// =============================================

if (document.getElementById("gradeProdutos") != null) {
  // pega a loja que a pessoa clicou (foi salva no localStorage)
  let idLoja = localStorage.getItem("loja");
  let restaurante = acharRestaurante(idLoja);

  // se a loja do link nao existir, volta para a lista de restaurantes
  if (restaurante == null) {
    window.location.href = "restaurantes.html";
  } else {
    document.title = restaurante.nome + " - Deliverato";
    document.getElementById("paginaRestaurante").style.setProperty("--cor", restaurante.cor);
    document.getElementById("paginaRestaurante").style.setProperty("--cor-texto", restaurante.corTexto);
    document.getElementById("bannerLogo").src = restaurante.logoBanner;
    document.getElementById("miniLogo").src = restaurante.logoMini;
    document.getElementById("nomeRestaurante").textContent = restaurante.nome;
    document.getElementById("notaRestaurante").textContent = String(restaurante.avaliacao).replace(".", ",");
    document.getElementById("descricaoRestaurante").textContent = restaurante.descricao;

    let aberto = "Aberto";
    if (estaAberto(restaurante) == false) {
      aberto = "Fechado";
    }
    document.getElementById("detalhesRestaurante").textContent =
      aberto + " · " + restaurante.tempo + " · Entrega " + dinheiro(restaurante.taxaEntrega);

    // monta os cards dos produtos
    let html = "";
    for (let i = 0; i < restaurante.produtos.length; i++) {
      let p = restaurante.produtos[i];
      html = html +
        '<article class="card-produto">' +
        '  <div class="topo-card">' + fotoProduto(p) + "</div>" +
        '  <div class="faixa"><span>' + p.nome + "</span><span>" + dinheiro(p.preco) + "</span></div>" +
        '  <div class="botoes">' +
        '    <button class="btn-cinza" onclick="verDetalhes(\'' + restaurante.id + "', '" + p.id + "')\">DETALHES DO PEDIDO</button>" +
        '    <button class="btn-cinza" onclick="adicionarNoCarrinho(\'' + restaurante.id + "', '" + p.id + "')\">ADICIONAR AO CARRINHO</button>" +
        "  </div>" +
        "</article>";
    }
    document.getElementById("gradeProdutos").innerHTML = html;
  }
}

// janela com a descricao do produto
function verDetalhes(idLoja, idProduto) {
  let restaurante = acharRestaurante(idLoja);
  let p = acharProduto(restaurante, idProduto);

  abrirJanela(
    '<div class="detalhe-produto">' +
    "  <h2>" + p.nome + "</h2>" +
    '  <div class="imagem">' + fotoProduto(p) + "</div>" +
    "  <p>" + p.descricao + "</p>" +
    '  <p class="preco">' + dinheiro(p.preco) + "</p>" +
    '  <div class="acoes-modal">' +
    '    <button class="btn-laranja" onclick="adicionarNoCarrinho(\'' + idLoja + "', '" + idProduto + "'); fecharJanela()\">ADICIONAR AO CARRINHO</button>" +
    "  </div>" +
    "</div>",
    ""
  );
}


// =============================================
//  PAGINA: CARRINHO (carrinho.html)
// =============================================

function mostrarCarrinho() {
  let carrinho = pegarCarrinho();
  let restaurante = acharRestaurante(carrinho.loja);
  let caixa = document.getElementById("caixaItens");

  if (restaurante == null || carrinho.itens.length == 0) {
    // carrinho vazio
    caixa.innerHTML =
      '<div class="topo">' +
      '  <div class="avatar-restaurante"></div>' +
      '  <div><h1>NOME DO RESTAURANTE</h1><a href="restaurantes.html" class="link-laranja">Adicionar mais itens</a></div>' +
      "</div>" +
      '<div class="carrinho-vazio">' +
      "  <p>Seu carrinho está vazio. Que tal escolher um prato que sai barato?</p>" +
      '  <a href="restaurantes.html" class="btn-laranja">VER RESTAURANTES</a>' +
      "</div>";
  } else {
    let html =
      '<div class="topo">' +
      '  <div class="avatar-restaurante" style="background:' + restaurante.cor + '"><img src="' + restaurante.logoMini + '" alt=""></div>' +
      '  <div><h1>' + restaurante.nome + '</h1><a href="restaurante.html" onclick="localStorage.setItem(\'loja\', \'' + restaurante.id + '\')" class="link-laranja">Adicionar mais itens</a></div>' +
      "</div>" +
      '<p class="sub-titulo">Itens adicionados:</p>';

    for (let i = 0; i < carrinho.itens.length; i++) {
      let item = carrinho.itens[i];
      let p = acharProduto(restaurante, item.id);
      html = html +
        '<div class="item-carrinho">' +
        '  <div class="foto">' + fotoProduto(p) + "</div>" +
        '  <div class="dados">' +
        '    <div class="linha">' +
        "      <h4>" + p.nome + "</h4>" +
        '      <div class="controle-item">' +
        '        <button class="lixeira" onclick="mudarQuantidade(\'' + p.id + "', -999)\"><img src=\"img/trash.png\" alt=\"Remover\"></button>" +
        '        <div class="qtd">' +
        '          <button onclick="mudarQuantidade(\'' + p.id + "', -1)\">−</button>" +
        "          <span>" + item.qtd + "</span>" +
        '          <button onclick="mudarQuantidade(\'' + p.id + "', 1)\">+</button>" +
        "        </div>" +
        "      </div>" +
        "    </div>" +
        '    <p class="valor">' + dinheiro(p.preco * item.qtd) + "</p>" +
        '    <div class="resumo-qtd"><b>' + item.qtd + "</b> " + p.nome + "</div>" +
        "  </div>" +
        "</div>";
    }
    caixa.innerHTML = html;
  }

  // endereco
  let usuario = pegarUsuario();
  if (usuario != null) {
    document.getElementById("enderecoEntrega").textContent = textoEndereco(usuario.endereco);
  } else {
    document.getElementById("enderecoEntrega").textContent = "Entre na sua conta para escolher o endereço";
  }

  // valores
  let valores = calcularValores();
  document.getElementById("vItens").textContent = dinheiro(valores.subtotal);
  document.getElementById("vTaxa").textContent = dinheiro(valores.taxa);
  document.getElementById("vDesconto").textContent = "- " + dinheiro(valores.desconto);
  document.getElementById("linhaDesconto").hidden = valores.desconto == 0;
  document.getElementById("vTotal").textContent = dinheiro(valores.total);

  // cupom
  let cupom = acharCupom(valores.cupom);
  if (cupom != null) {
    document.getElementById("cupomUso").innerHTML = "<b>Cupom em uso:</b>" + cupom.nome + "<br>" + cupom.descricao;
  } else {
    document.getElementById("cupomUso").innerHTML = "<b>Cupom em uso:</b>Nenhum cupom";
  }
}

// muda a quantidade de um item (-999 tira o item)
function mudarQuantidade(idProduto, quanto) {
  let carrinho = pegarCarrinho();
  let novosItens = [];
  for (let i = 0; i < carrinho.itens.length; i++) {
    let item = carrinho.itens[i];
    if (item.id == idProduto) {
      item.qtd = item.qtd + quanto;
    }
    if (item.qtd > 0) {
      novosItens.push(item);
    }
  }
  carrinho.itens = novosItens;
  salvarCarrinho(carrinho);
  atualizarNumeroCarrinho();
  mostrarCarrinho();
}

// janela dos cupons
function abrirCupons() {
  let escolhido = calcularValores().cupom;
  let emUso = "";
  let disponiveis = "";
  let bloqueados = "";

  for (let i = 0; i < CUPONS.length; i++) {
    let c = CUPONS[i];
    let texto = "<div><b>" + c.nome + "</b><small>" + c.descricao + "</small></div>";

    // o hipotetico so libera com 10 compras e o de boas-vindas so vale na primeira
    if ((c.id == "hipotetico" && pegarPedidos().length < 10) || (c.id == "boasvindas" && pegarPedidos().length > 0)) {
      bloqueados = bloqueados + '<div class="cupom">' + texto + '<button class="btn-branco" disabled>BLOQUEADO</button></div>';
    } else if (c.id == escolhido) {
      emUso = emUso + '<div class="cupom">' + texto + '<button class="btn-laranja">USANDO</button></div>';
    } else {
      disponiveis = disponiveis + '<div class="cupom">' + texto + '<button class="btn-branco" onclick="usarCupom(\'' + c.id + "')\">USAR</button></div>";
    }
  }

  let html =
    "<h2>TODOS SEUS CUPONS</h2>" +
    '<div class="grupo-cupom"><h3>EM USO</h3>' + emUso + "</div>" +
    '<div class="grupo-cupom"><h3>DISPONÍVEIS</h3>' + disponiveis + "</div>";
  if (bloqueados != "") {
    html = html + '<div class="grupo-cupom bloqueados"><h3>BLOQUEADOS</h3>' + bloqueados + '<img src="img/lock.png" alt="" class="cadeado"></div>';
  }

  abrirJanela(html, "modal-cupons");
}

function usarCupom(id) {
  localStorage.setItem("cupom", id);
  fecharJanela();
  mostrarCarrinho();
}

if (document.getElementById("caixaItens") != null) {
  mostrarCarrinho();

  document.getElementById("btnCupons").onclick = abrirCupons;

  document.getElementById("btnMaisItens").onclick = function () {
    let carrinho = pegarCarrinho();
    if (carrinho.loja != "") {
      localStorage.setItem("loja", carrinho.loja);
      window.location.href = "restaurante.html";
    } else {
      window.location.href = "restaurantes.html";
    }
  };

  document.getElementById("btnLimpar").onclick = function () {
    salvarCarrinho({ loja: "", itens: [] });
    atualizarNumeroCarrinho();
    mostrarCarrinho();
  };

  document.getElementById("btnContinuar").onclick = function () {
    if (pegarCarrinho().itens.length == 0) {
      return;
    }
    if (pegarUsuario() == null) {
      window.location.href = "login.html";
    } else {
      window.location.href = "pagamento.html";
    }
  };
}


// =============================================
//  PAGINA: LOGIN E CADASTRO (login.html e cadastro.html)
// =============================================

// salva o usuario e entra no site
function entrar(email, nome) {
  let usuario = JSON.parse(localStorage.getItem("usuario"));

  // se for outro email, cria um usuario novo com um endereco padrao
  if (usuario == null || usuario.email != email) {
    usuario = {
      nome: nome,
      email: email,
      endereco: {
        cep: "30180-090",
        rua: "Rua Conselheiro Antônio Guerra",
        numero: "329",
        bairro: "Centro",
        complemento: "",
        referencia: "",
      },
    };
  }

  localStorage.setItem("usuario", JSON.stringify(usuario));
  localStorage.setItem("logado", "sim");
  window.location.href = "index.html";
}

if (document.getElementById("formAuth") != null) {
  let campoEmail = document.getElementById("email");
  let campoSenha = document.getElementById("senha");
  let erroEmail = document.getElementById("emailErro");
  let erroSenha = document.getElementById("senhaErro");

  // deixa o email sem espaco e em letra minuscula
  campoEmail.oninput = function () {
    campoEmail.value = campoEmail.value.replace(" ", "").toLowerCase();
  };

  document.getElementById("formAuth").onsubmit = function (evento) {
    evento.preventDefault(); // nao deixa a pagina recarregar

    let tudoCerto = true;

    if (emailValido(campoEmail.value) == false) {
      erroEmail.textContent = "Não pode! O e-mail precisa ser @gmail.com";
      erroEmail.classList.add("visivel");
      campoEmail.classList.add("erro");
      tudoCerto = false;
    } else {
      erroEmail.classList.remove("visivel");
      campoEmail.classList.remove("erro");
    }

    if (campoSenha.value == "") {
      erroSenha.textContent = "Digite uma senha";
      erroSenha.classList.add("visivel");
      campoSenha.classList.add("erro");
      tudoCerto = false;
    } else {
      erroSenha.classList.remove("visivel");
      campoSenha.classList.remove("erro");
    }

    if (tudoCerto) {
      let email = campoEmail.value;
      let nome = email.replace("@gmail.com", "");
      entrar(email, nome);
    }
  };

  // botoes Google, Facebook e Apple: entram direto
  let botoesSociais = document.querySelectorAll("[data-social]");
  for (let i = 0; i < botoesSociais.length; i++) {
    botoesSociais[i].onclick = function () {
      let rede = botoesSociais[i].dataset.social;
      entrar("cliente." + rede.toLowerCase() + "@gmail.com", "Cliente " + rede);
    };
  }
}


// =============================================
//  PAGINA: PAGAMENTO (pagamento.html)
// =============================================

if (document.getElementById("formPagamento") != null) {
  let carrinho = pegarCarrinho();

  if (pegarUsuario() == null) {
    window.location.href = "login.html";
  } else if (carrinho.itens.length == 0) {
    window.location.href = "carrinho.html";
  } else {
    let restaurante = acharRestaurante(carrinho.loja);
    let valores = calcularValores();

    document.getElementById("pgAvatar").style.background = restaurante.cor;
    document.getElementById("pgAvatar").innerHTML = '<img src="' + restaurante.logoMini + '" alt="">';
    document.getElementById("pgNome").textContent = "Pedido no " + restaurante.nome;

    // foto do primeiro produto do pedido
    document.getElementById("pgFoto").src = "img/produtos/" + carrinho.itens[0].id + ".png";

    let lista = "";
    for (let i = 0; i < carrinho.itens.length; i++) {
      let p = acharProduto(restaurante, carrinho.itens[i].id);
      lista = lista + "<li>" + p.nome + " <b>" + carrinho.itens[i].qtd + "</b> — " + dinheiro(p.preco * carrinho.itens[i].qtd) + "</li>";
    }
    document.getElementById("pgItens").innerHTML = lista;

    document.getElementById("pgSubtotal").textContent = dinheiro(valores.subtotal);
    document.getElementById("pgTaxa").textContent = dinheiro(valores.taxa);
    if (valores.desconto > 0) {
      document.getElementById("pgDesconto").textContent = "- " + dinheiro(valores.desconto);
    } else {
      document.getElementById("pgDesconto").textContent = dinheiro(0);
    }
    document.getElementById("pgTotal").textContent = dinheiro(valores.total);
  }

  // botao PAGAR AGORA
  document.getElementById("formPagamento").onsubmit = function (evento) {
    evento.preventDefault();

    let carrinho = pegarCarrinho();
    let restaurante = acharRestaurante(carrinho.loja);
    let valores = calcularValores();
    let usuario = pegarUsuario();

    // guarda os produtos do pedido
    let itens = [];
    for (let i = 0; i < carrinho.itens.length; i++) {
      let p = acharProduto(restaurante, carrinho.itens[i].id);
      itens.push({ nome: p.nome, preco: p.preco, qtd: carrinho.itens[i].qtd });
    }

    let pedido = {
      numero: Math.floor(Math.random() * 90000000) + 10000000,
      data: new Date().toLocaleString("pt-BR"),
      hora: new Date().getTime(),
      loja: restaurante.nome,
      tempoMax: restaurante.tempoMax,
      itens: itens,
      subtotal: valores.subtotal,
      taxa: valores.taxa,
      desconto: valores.desconto,
      total: valores.total,
      pagamento: document.querySelector('input[name="pagamento"]:checked').value,
      cliente: usuario.nome,
      endereco: textoEndereco(usuario.endereco),
    };

    let pedidos = pegarPedidos();
    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    // o cupom de boas-vindas so vale uma vez
    if (valores.cupom == "boasvindas") {
      localStorage.setItem("cupom", "");
    }

    // esvazia o carrinho e vai para o pedido
    salvarCarrinho({ loja: "", itens: [] });
    window.location.href = "pedido.html";
  };
}


// =============================================
//  PAGINA: ACOMPANHAR PEDIDO (pedido.html)
// =============================================

if (document.getElementById("conteudoPedido") != null) {
  let pedidos = pegarPedidos();
  let caixa = document.getElementById("conteudoPedido");

  if (pegarUsuario() == null) {
    window.location.href = "login.html";
  } else if (pedidos.length == 0) {
    caixa.innerHTML =
      '<div class="caixa bloco" style="text-align:center">' +
      "  <h3>Você ainda não fez nenhum pedido</h3>" +
      '  <p style="margin:14px 0 22px">Escolha um restaurante e faça seu primeiro pedido com 30% de desconto!</p>' +
      '  <a href="restaurantes.html" class="btn-laranja">VER RESTAURANTES</a>' +
      "</div>";
  } else {
    // mostra o ultimo pedido
    let pedido = pedidos[pedidos.length - 1];

    // em que etapa o pedido esta (muda com o tempo)
    let segundos = (new Date().getTime() - pedido.hora) / 1000;
    let etapa = 0;
    let textoStatus = "Pedido aceito";
    if (segundos > 10) {
      etapa = 1;
      textoStatus = "Sob preparo";
    }
    if (segundos > 40) {
      etapa = 2;
      textoStatus = "Saiu para entrega";
    }
    if (segundos > 70) {
      etapa = 3;
      textoStatus = "Entregue! Bom apetite";
    }

    // previsao de entrega = hora do pedido + tempo maximo
    let previsao = new Date(pedido.hora + pedido.tempoMax * 60000);
    let horaPrevisao = previsao.toLocaleTimeString("pt-BR").substring(0, 5);

    // lista dos produtos
    let itens = "";
    for (let i = 0; i < pedido.itens.length; i++) {
      let item = pedido.itens[i];
      itens = itens + "<li>• " + item.nome + " <b>" + item.qtd + "</b> " + dinheiro(item.preco * item.qtd) + "</li>";
    }

    // as 4 etapas
    let iconeChef = '<svg viewBox="0 0 24 24"><path class="icone-svg" d="M12 2.5a4.6 4.6 0 0 1 4.2 2.7 4.3 4.3 0 0 1 1.3 8.4V20a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 20v-6.4a4.3 4.3 0 0 1 1.3-8.4A4.6 4.6 0 0 1 12 2.5Zm-3.5 15v2h7v-2h-7Z"/></svg>';
    let iconeCheck = '<svg viewBox="0 0 24 24"><path class="icone-svg" d="M12 1.5a10.5 10.5 0 1 1 0 21 10.5 10.5 0 0 1 0-21Zm4.6 6.4-6 6-2.6-2.6-1.5 1.5 4.1 4.1 7.5-7.5-1.5-1.5Z"/></svg>';
    let icones = [iconeCarrinho, iconeChef, '<img src="img/motorcycle.png" alt="" class="icone-preto">', iconeCheck];
    let nomesEtapas = ["Pedido Aceito", "Pedido em preparo", "Enviado para entrega", "Entregue"];

    let etapasHtml = "";
    for (let i = 0; i < 4; i++) {
      let classe = "etapa";
      if (i < etapa || etapa == 3) {
        classe = "etapa feita";
      } else if (i == etapa) {
        classe = "etapa atual";
      }
      etapasHtml = etapasHtml +
        '<div class="' + classe + '">' + icones[i] + '<div class="bola"></div><p class="nome-etapa">' + nomesEtapas[i] + "</p></div>";
    }

    // nome e icone da forma de pagamento
    let nomePagamento = "Cartão de crédito";
    let iconePagamento = "img/mastercard.png";
    if (pedido.pagamento == "debito") {
      nomePagamento = "Cartão de débito";
      iconePagamento = "img/visa.png";
    }
    if (pedido.pagamento == "pix") {
      nomePagamento = "Pix";
      iconePagamento = "img/pix.png";
    }
    if (pedido.pagamento == "nupay") {
      nomePagamento = "NuPay";
      iconePagamento = "img/nubank.png";
    }

    let desconto = "";
    if (pedido.desconto > 0) {
      desconto = '<p style="color:var(--verde-status)">Desconto: - ' + dinheiro(pedido.desconto) + "</p>";
    }

    caixa.innerHTML =
      '<div class="caixa bloco bloco-numero">' +
      "  <div><h3>PEDIDO:</h3><p>#" + pedido.numero + "</p></div>" +
      "  <div><h3>DATA:</h3><p>" + pedido.data + "</p></div>" +
      "</div>" +
      '<div class="caixa bloco">' +
      '  <div class="entrega-topo">' +
      "    <div><h2>Entrega 1 de 1</h2><p>Pedido feito na loja: <b>" + pedido.loja + "</b></p></div>" +
      "    <ul>" + itens + "</ul>" +
      "  </div>" +
      '  <div class="trilha">' +
      '    <div class="barra"><span style="width:' + (etapa / 3) * 100 + '%"></span></div>' +
      etapasHtml +
      "  </div>" +
      '  <div class="status-pedido">' +
      "    <p><b>Status:</b> " + textoStatus + "</p>" +
      "    <p>Previsão de entrega: <b>" + horaPrevisao + "</b></p>" +
      "  </div>" +
      '  <p class="legenda-rodape">Acompanhe seu pedido e fique ligado no status.</p>' +
      "</div>" +
      '<div class="bloco-junto">' +
      '  <div class="bloco"><h3>ENDEREÇO:</h3><p class="end"><b>' + pedido.cliente + "</b>" + pedido.endereco + "</p></div>" +
      '  <div class="bloco"><h3>FORMA DE PAGAMENTO</h3><div class="forma-pg"><img src="' + iconePagamento + '" alt=""> ' + nomePagamento + "</div></div>" +
      '  <div class="bloco valores-pedido">' +
      "    <h3>VALOR:</h3>" +
      "    <p>Total do produto: " + dinheiro(pedido.subtotal) + "</p>" +
      "    <p>Frete: " + dinheiro(pedido.taxa) + "</p>" +
      desconto +
      '    <p class="total">Total do pedido: ' + dinheiro(pedido.total) + "</p>" +
      "  </div>" +
      "</div>";
  }
}


// =============================================
//  PAGINA: PERFIL (perfil.html)
// =============================================

function mostrarPerfil() {
  let usuario = pegarUsuario();
  document.getElementById("nomeUsuario").textContent = usuario.nome;
  document.getElementById("emailUsuario").textContent = usuario.email;
  document.getElementById("eCep").value = usuario.endereco.cep;
  document.getElementById("eNumero").value = usuario.endereco.numero;
  document.getElementById("eRua").value = usuario.endereco.rua;
  document.getElementById("eComplemento").value = usuario.endereco.complemento;
  document.getElementById("eBairro").value = usuario.endereco.bairro;
  document.getElementById("eReferencia").value = usuario.endereco.referencia;
}

if (document.getElementById("formConta") != null) {
  if (pegarUsuario() == null) {
    window.location.href = "login.html";
  } else {
    mostrarPerfil();
  }

  mascaraCep(document.getElementById("eCep"));

  // DADOS DA CONTA: muda nome e email
  document.getElementById("formConta").onsubmit = function (evento) {
    evento.preventDefault();
    let usuario = pegarUsuario();
    let novoNome = document.getElementById("novoNome").value;
    let novoEmail = document.getElementById("novoEmail").value;
    let erro = document.getElementById("novoEmailErro");

    if (novoEmail != "") {
      if (emailValido(novoEmail) == false) {
        erro.textContent = "Não pode! O e-mail precisa ser @gmail.com";
        erro.classList.add("visivel");
        return;
      }
      usuario.email = novoEmail;
    }
    erro.classList.remove("visivel");

    if (novoNome != "") {
      usuario.nome = novoNome;
    }

    localStorage.setItem("usuario", JSON.stringify(usuario));
    document.getElementById("novoNome").value = "";
    document.getElementById("novoEmail").value = "";
    mostrarPerfil();
  };

  // SEGURANCA: so limpa o campo (nao tem banco de dados)
  document.getElementById("formSenha").onsubmit = function (evento) {
    evento.preventDefault();
    document.getElementById("novaSenha").value = "";
  };

  // ALTERAR O ENDERECO
  document.getElementById("endereco").onsubmit = function (evento) {
    evento.preventDefault();
    let erro = document.getElementById("eErro");
    let cep = document.getElementById("eCep").value;
    let numero = document.getElementById("eNumero").value;
    let rua = document.getElementById("eRua").value;
    let bairro = document.getElementById("eBairro").value;

    if (cep.length != 9 || numero == "" || rua == "" || bairro == "") {
      erro.textContent = "Preencha CEP, rua, número e bairro.";
      erro.classList.add("visivel");
      return;
    }
    erro.classList.remove("visivel");

    let usuario = pegarUsuario();
    usuario.endereco = {
      cep: cep,
      numero: numero,
      rua: rua,
      complemento: document.getElementById("eComplemento").value,
      bairro: bairro,
      referencia: document.getElementById("eReferencia").value,
    };
    localStorage.setItem("usuario", JSON.stringify(usuario));
  };
}
