const RESTAURANTES = [
  {
    id: "starbucks",
    nome: "Starbucks",
    logo: "img/starbucks.png",
    logoBanner: "img/starbucks.png",
    logoMini: "img/starbucks.png",
    cor: "#00753e",
    destaque: "#1db233",
    corTexto: "#ffffff",
    tipo: "cafeteria",
    abre: 7,
    fecha: 22,
    tempo: "30 - 40 min",
    tempoMax: 40,
    avaliacao: 4.3,
    numAvaliacoes: 3567,
    distancia: 3.4,
    taxaEntrega: 6.99,
    descricao:
      "Cafés especiais feitos na hora, bebidas geladas cheias de sabor e aquele lanchinho que combina com qualquer momento do dia. Do espresso encorpado ao Frappuccino cremoso, a Starbucks leva a experiência da cafeteria até você, quentinha e no capricho.",
    produtos: [
      {
        id: "sb-latte",
        nome: "Caffè Latte",
        preco: 16.9,
        descricao:
          "Espresso encorpado com leite vaporizado e uma fina camada de espuma. Clássico, cremoso e equilibrado. Tamanho Grande (473 ml).",
      },
      {
        id: "sb-cappuccino",
        nome: "Cappuccino",
        preco: 16.5,
        descricao:
          "Espresso com leite vaporizado e uma camada alta e aerada de espuma de leite. Leve e intenso ao mesmo tempo.",
      },
      {
        id: "sb-frappuccino",
        nome: "Frappuccino de Caramelo",
        preco: 22.9,
        descricao:
          "Café batido com gelo, leite e calda de caramelo, finalizado com chantilly e fios de caramelo por cima.",
      },
      {
        id: "sb-chocolate",
        nome: "Chocolate Quente",
        preco: 15.9,
        descricao:
          "Leite vaporizado com calda de chocolate meio amargo, coberto com chantilly e raspas de chocolate.",
      },
      {
        id: "sb-paodequeijo",
        nome: "Pão de Queijo (4 un.)",
        preco: 12.9,
        descricao:
          "Pãezinhos de queijo mineiros, crocantes por fora e macios por dentro. Saem quentinhos do forno.",
      },
      {
        id: "sb-muffin",
        nome: "Muffin de Blueberry",
        preco: 13.5,
        descricao:
          "Bolinho fofinho recheado com mirtilos e coberto com uma farofinha doce e crocante.",
      },
    ],
  },
  {
    id: "mcdonalds",
    nome: "McDonalds",
    logo: "img/mcdonalds.png",
    logoBanner: "img/mcdonalds.png",
    logoMini: "img/mcdonalds.png",
    cor: "#ee1d23",
    destaque: "#ffc107",
    corTexto: "#ffffff",
    tipo: "fast-food",
    abre: 10,
    fecha: 23,
    tempo: "25 - 30 min",
    tempoMax: 30,
    avaliacao: 4.0,
    numAvaliacoes: 3067,
    distancia: 1.8,
    taxaEntrega: 4.99,
    descricao:
      "Os clássicos que todo mundo ama: hambúrgueres suculentos, McFritas sequinhas e sobremesas geladas para fechar com chave de ouro. Peça seu Big Mac favorito e receba tudo rapidinho, do jeito que sai do balcão, com a promoção exclusiva de McDonalds no Deliverato.",
    produtos: [
      {
        id: "mc-bigmac",
        nome: "Big Mac",
        preco: 27.9,
        descricao:
          "Dois hambúrgueres, alface, queijo, molho especial, cebola e picles no pão com gergelim. O mais famoso da casa.",
      },
      {
        id: "mc-quarterao",
        nome: "Quarterão com Queijo",
        preco: 28.9,
        descricao:
          "Hambúrguer de carne 100% bovina, duas fatias de queijo cheddar, cebola, picles, ketchup e mostarda.",
      },
      {
        id: "mc-mcchicken",
        nome: "McChicken",
        preco: 22.9,
        descricao:
          "Peito de frango empanado e crocante, alface e maionese no pão com gergelim.",
      },
      {
        id: "mc-cheddar",
        nome: "Cheddar McMelt",
        preco: 26.5,
        descricao:
          "Hambúrguer bovino com molho cremoso de cheddar e cebola grelhada no pão escuro.",
      },
      {
        id: "mc-fritas",
        nome: "McFritas Média",
        preco: 12.9,
        descricao:
          "Batatas fritas douradas e sequinhas, com aquele salzinho na medida certa.",
      },
      {
        id: "mc-mcflurry",
        nome: "McFlurry Ovomaltine",
        preco: 16.9,
        descricao:
          "Sorvete de baunilha batido com pedaços crocantes de Ovomaltine.",
      },
    ],
  },
  {
    id: "burgerking",
    nome: "Burger King",
    logo: "img/burgerking.png",
    logoBanner: "img/burgerking.png",
    logoMini: "img/burgerking.png",
    cor: "#8c2500",
    destaque: "#ffc107",
    corTexto: "#ffffff",
    tipo: "fast-food",
    abre: 10,
    fecha: 23,
    tempo: "20 - 30 min",
    tempoMax: 30,
    avaliacao: 4.67,
    numAvaliacoes: 6767,
    distancia: 2.6,
    taxaEntrega: 5.49,
    descricao:
      "Hambúrgueres grelhados no fogo de verdade, com aquele sabor de churrasco que só o Burger King tem. Whopper, Mega Stacker, frango crocante e batata frita quentinha, tudo bem servido para matar a fome de quem não tem medo de um lanche caprichado.",
    produtos: [
      {
        id: "bk-whopper",
        nome: "Whopper",
        preco: 29.9,
        descricao:
          "Carne grelhada no fogo como churrasco, tomate, alface, cebola, picles, ketchup e maionese no pão com gergelim.",
      },
      {
        id: "bk-whopperduplo",
        nome: "Whopper Duplo",
        preco: 36.9,
        descricao:
          "Duas carnes grelhadas no fogo com todos os ingredientes do Whopper. Para quem está com muita fome.",
      },
      {
        id: "bk-stacker",
        nome: "Mega Stacker",
        preco: 34.9,
        descricao:
          "Camadas de carne grelhada, queijo derretido, bacon crocante e o molho especial Stacker.",
      },
      {
        id: "bk-chicken",
        nome: "Chicken Crispy",
        preco: 21.9,
        descricao:
          "Filé de frango empanado super crocante, alface e maionese no pão macio.",
      },
      {
        id: "bk-fritas",
        nome: "Batata Frita Média",
        preco: 12.5,
        descricao:
          "Batatas fritas crocantes, servidas quentinhas e bem sequinhas.",
      },
      {
        id: "bk-sundae",
        nome: "Sundae de Chocolate",
        preco: 10.9,
        descricao:
          "Sorvete de baunilha cremoso coberto com calda quente de chocolate.",
      },
    ],
  },
  {
    id: "habibs",
    nome: "Habib's",
    logo: "img/habibs.png",
    logoBanner: "img/habibs.png",
    logoMini: "img/habibs.png",
    cor: "#c2c2c2",
    destaque: "#e50021",
    corTexto: "#111111",
    tipo: "fast-food",
    abre: 9,
    fecha: 24,
    tempo: "20 - 30 min",
    tempoMax: 30,
    avaliacao: 4.2,
    numAvaliacoes: 9167,
    distancia: 1.2,
    taxaEntrega: 3.99,
    descricao:
      "Esfihas abertas e fechadas saindo do forno, kibes crocantes e beirutes recheados para dividir com a família. O Habib's traz o sabor da culinária árabe com preço que cabe no bolso, perfeito para aquele pedido grande sem gastar muito.",
    produtos: [
      {
        id: "hb-esfihacarne",
        nome: "Esfiha de Carne",
        preco: 3.99,
        descricao:
          "Massa fininha e macia com recheio de carne moída temperada com tomate, cebola e especiarias árabes.",
      },
      {
        id: "hb-esfihaqueijo",
        nome: "Esfiha de Queijo",
        preco: 4.49,
        descricao:
          "Esfiha aberta coberta com bastante queijo derretido e gratinado.",
      },
      {
        id: "hb-esfihacalabresa",
        nome: "Esfiha de Calabresa",
        preco: 4.49,
        descricao:
          "Calabresa fatiada com cebola e queijo sobre a massa tradicional da casa.",
      },
      {
        id: "hb-kibe",
        nome: "Kibe Frito",
        preco: 5.49,
        descricao:
          "Kibe de carne com trigo, frito na hora, crocante por fora e suculento por dentro.",
      },
      {
        id: "hb-beirute",
        nome: "Beirute de Rosbife",
        preco: 32.9,
        descricao:
          "Sanduíche no pão sírio com rosbife, queijo, alface, tomate e molho especial.",
      },
      {
        id: "hb-esfihachocolate",
        nome: "Esfiha de Chocolate",
        preco: 5.99,
        descricao:
          "Esfiha doce coberta com chocolate cremoso. A sobremesa perfeita para fechar o pedido.",
      },
    ],
  },
  {
    id: "subway",
    nome: "Subway",
    logo: "img/subway-mini.png",
    logoBanner: "img/subway.png",
    logoMini: "img/subway-mini.png",
    cor: "#103a20",
    destaque: "#f2b700",
    corTexto: "#ffffff",
    tipo: "fast-food",
    abre: 10,
    fecha: 23,
    tempo: "25 - 35 min",
    tempoMax: 35,
    avaliacao: 4.67,
    numAvaliacoes: 5214,
    distancia: 2.1,
    taxaEntrega: 5.99,
    descricao:
      "Sanduíches montados do seu jeito, com pão assado na hora, recheios fresquinhos e muita salada. No Subway você escolhe o pão, o queijo, os vegetais e o molho para criar um lanche leve, gostoso e do tamanho da sua fome.",
    produtos: [
      {
        id: "sw-bmt",
        nome: "Italian B.M.T. 15cm",
        preco: 27.9,
        descricao:
          "Salame, pepperoni e presunto no pão de sua escolha, com queijo, salada fresquinha e molho a gosto.",
      },
      {
        id: "sw-teriyaki",
        nome: "Frango Teriyaki 15cm",
        preco: 26.9,
        descricao:
          "Tiras de frango com molho teriyaki adocicado, queijo e salada no pão de sua escolha.",
      },
      {
        id: "sw-churrasco",
        nome: "Steak Churrasco 15cm",
        preco: 29.9,
        descricao:
          "Carne bovina em tiras com molho barbecue, queijo derretido e cebola roxa.",
      },
      {
        id: "sw-atum",
        nome: "Atum 15cm",
        preco: 24.9,
        descricao:
          "Atum temperado com maionese, alface, tomate, pepino e azeitona no pão integral.",
      },
      {
        id: "sw-veggie",
        nome: "Veggie Delite 15cm",
        preco: 19.9,
        descricao:
          "Só vegetais: alface, tomate, pepino, pimentão, cebola roxa e azeitona, com o molho que você preferir.",
      },
      {
        id: "sw-cookies",
        nome: "Cookies (3 un.)",
        preco: 11.9,
        descricao:
          "Cookies macios com gotas de chocolate, assados todos os dias na loja.",
      },
    ],
  },
];

const CUPONS = [
  {
    id: "boasvindas",
    nome: "Boas-vindas de Alfredo Horse",
    descricao: "30% de desconto na primeira compra",
    tipo: "porcentagem",
    valor: 30,
    regra: "primeira-compra",
  },
  {
    id: "promomc",
    nome: "Promoção imperdível do McDonalds",
    descricao:
      "Mega promoção imperdível Mc Donalds, se saboreie com nossos melhores lanches: 20% off em pedidos do McDonalds",
    tipo: "porcentagem",
    valor: 20,
    regra: "mcdonalds",
  },
  {
    id: "hipotetico",
    nome: "Alfredo Horse hipotético",
    descricao:
      "Disponível após dez compras! 50% de desconto em qualquer pedido",
    tipo: "porcentagem",
    valor: 50,
    regra: "dez-compras",
  },
];
