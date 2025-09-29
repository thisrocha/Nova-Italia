class Personagem {
  constructor(id, nome, descricao, imagem) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.imagem = imagem;
    this.pontos = 0;
  }
  
    adicionarPontos(valor){ 
        this.pontos = this.pontos + Number(valor); 
}
  
    resetar(){ 
        this.pontos = 0; 
    }
}

    const personagens = [
      new Personagem(0,'Verona', 'Maga com magia negra.', 'verona.png'),
      new Personagem(2,'Ferrara', 'Guerreiro protetor.', 'ferrara.png'),
      new Personagem(3,'Pádua', 'Inventor de engenhocas.', 'padua.png')
    ];


  const perguntas = [{ 

      pergunta: 'Qual atividade você prefere em seu tempo livre?',

      opcoes:[{texto:'Ler livros', pontos:[3,1,2]},
      {texto:'Treinar pesado', pontos:[1,3,2]},
      {texto:'Inventar trecos', pontos:[2,1,3]}
    ]},

    {pergunta: 'Como você resolveria um conflito?', 
        
    opcoes:[
    {texto:'Usando o conhecimento', pontos:[3,2,1]},
    {texto:'Violencia Fisica', pontos:[1,3,2]},
    {texto:'Criaria algo inesperado', pontos:[2,1,3]}
  ]},
  { pergunta: 'Qual é seu maior valor?', 
    
    opcoes:[
    {texto:'Saber', pontos:[3,1,2]},
    {texto:'Guerriar', pontos:[1,3,2]},
    {texto:'Criatividade', pontos:[2,1,3]}
  ]},
  { pergunta: 'Escolha uma cor que te representa.', 
    
    opcoes:[
    {texto:'Verde', pontos:[3,1,2]},
    {texto:'Vermelho', pontos:[1,3,2]},
    {texto:'Branco', pontos:[2,1,3]}
  ]},
  { pergunta: 'Se pudesse ter um talento, qual seria?', 
    
    opcoes:[
    {texto:'Saber todas as línguas', pontos:[3,1,2]},
    {texto:'Estratégia em batalha', pontos:[1,3,2]},
    {texto:'Criar invenções', pontos:[2,1,3]}
  ]},
  { pergunta: 'Qual animal você escolheria como companheiro?', 
    
    opcoes:[
    {texto:'Corvo', pontos:[3,1,2]},
    {texto:'Lobo', pontos:[1,3,2]},
    {texto:'Híbrido mecânico', pontos:[2,1,3]}
  ]},
  { pergunta: 'Uma frase que define você:', 
    
    opcoes:[
    {texto:'"Conhecimento é poder"', pontos:[3,1,2]},
    {texto:'"Ação fala mais"', pontos:[1,3,2]},
    {texto:'"Inventar é existir"', pontos:[2,1,3]}
  ]},
  { pergunta: 'Qual trabalho você aceitaria?', 
    
    opcoes:[
    {texto:'Bibliotecario da magia', pontos:[3,1,2]},
    {texto:'Capitão da linha de frente', pontos:[1,3,2]},
    {texto:'Dono de oficinas mecânicas', pontos:[2,1,3]}
  ]},
  { pergunta: 'Seu maior medo?', 
    
    opcoes:[
    {texto:'Esquecer algo precioso', pontos:[3,1,2]},
    {texto:'Falhar protegendo os seus', pontos:[1,3,2]},
    {texto:'Perder suas criações', pontos:[2,1,3]}
  ]},
  { pergunta: 'No fim, você quer ser lembrado por:', 
    
    opcoes:[
    {texto:'Sabedoria e legado', pontos:[3,1,2]},
    {texto:'Coragem e sacrifício', pontos:[1,3,2]},
    {texto:'Criações e Invenções', pontos:[2,1,3]}
  ]} 
];


const containerPerguntas = document.getElementById('perguntas');
const btnResultado = document.getElementById('btnResultado');
const btnReiniciar = document.getElementById('btnReiniciar');
const caixaResultado = document.getElementById('caixaResultado');


function mostrarPerguntas() {
  containerPerguntas.innerHTML = perguntas.map(function(item, i) {
    var opcoesHTML = item.opcoes.map(function(opc, j) {
      var id = "p" + i + "_o" + j;
      return `
        <label class="opcao">
          <input type="radio" name="p${i}" id="${id}" required data-pontos='${JSON.stringify(opc.pontos)}'>
          <span>${opc.texto}</span>
        </label>
      `;
    }).join("");
    return `
      <div class="cartao">
        <h3>Pergunta ${i+1}: ${item.pergunta}</h3>
        <div class="opcoes">${opcoesHTML}</div>
      </div>
    `;
  }).join("");
}


function calcularResultado() {
  personagens.forEach(function(p) { p.resetar(); });

  perguntas.forEach(function(_, i) {
    var selecionado = document.querySelector(`input[name=p${i}]:checked`);
    if (selecionado) {
      var pontos = JSON.parse(selecionado.getAttribute('data-pontos'));
      for (var k = 0; k < pontos.length; k++) {
        personagens[k].adicionarPontos(pontos[k]);
      }
    }
  });

  var personagemParecido = personagens[0];
  for (var i = 1; i < personagens.length; i++) {
    if (personagens[i].pontos > personagemParecido.pontos) personagemParecido = personagens[i];
  }
  return personagemParecido;
}


function exibirResultado() {
  var personagemParecido = calcularResultado();
  caixaResultado.style.display = 'flex';
  caixaResultado.innerHTML = `
    <div class="avatar" role="img" aria-label="Imagem do personagem" style="background-image: url('${personagemParecido.imagem}'); background-size:cover; background-position:center"></div>
    <div>
    <h2> Você se parece com:</h2>
      <h2>${personagemParecido.nome} — ${personagemParecido.pontos} pontos</h2>
      <p style="margin:6px 0 0">${personagemParecido.descricao}</p>
    </div>
  `;
}


btnResultado.addEventListener('click', function() {
  var todasRespondidas = perguntas.every(function(_, i) {
    return document.querySelector(`input[name=p${i}]:checked`);
  });
  if (!todasRespondidas) {
    alert('Tá querendo burlar o sistema?! Responda todas as perguntas guerreiro!');
    return;
  }
  exibirResultado();
});


btnReiniciar.addEventListener('click', function() {
  
  document.getElementById('formQuiz').reset();
  personagens.forEach(function(p) { p.resetar(); });
  caixaResultado.style.display = 'none';
  caixaResultado.innerHTML = '';
});

mostrarPerguntas();
