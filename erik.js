var prompt = require("prompt-sync")();

let status = { // Objeto e métodos criados para controlar e atualizar o status da personagem.
    energia: 100, // Variável que carrega a energia associada a vida da personagem. Se acabar a energia, acaba o jogo.
    pontuacao: 0, // Variável que carrega os pontos acumulados durante o jogo. Possível meta a ser batida a cada novo jogo.
    tempo: 0, // Tempo que o usuário levou para chegar ao final do jogo. Dependendo do caminho escolhido, pode demorar mais tempo. Possível meta a ser batida a cada novo jogo.
    
    perderEnergia: function () { // Método criado para para contagem da perda de energia.
        this.energia -= 25;
    },
    perderPontuacao: function () { // Método criado para contagem de pontos perdidos.
        this.pontuacao -= 10;
    },
    ganharPontuacao: function () { //Mátodo criado para contagem de pontos ganhos.
        this.pontuacao += 10;
    },
    contagemTempo1: function () { // Método criado para contagem de tempo nos caminhos onde a personagem faz a melhor escolha para escapar.
        this.tempo += 1;
    },
    contagemTempo2: function () { // Método criado para contagem de tempo nos caminhos onde a personagem faz a pior escolha para escapar.
        this.tempo += 2;
    },
};

let inicio = { // Objeto criado para as variáveis da fase de início do jogo.
    historia: `\t\t\t#### Encontro com a Morte! ####\n 
    "Nem sempre o que nossos olhos se encantam é a verdade absoluta" -
    dizia o anúncio na revista em que Mabê lia no consultório.\n
    A frase foi rapidamente varrida de sua mente quando no visor
    a senha de número 100 apareceu. Era a senha de Mabê.\n
    Ao sair da sala de atendimento, já passava das 9h, Mabê estava atrasada.\n
    O tão esperado encontro finalmente aconteceria - Mabê estava prestes 
    a conhecer o amor de sua vida.\n
    Tudo estava colorido. As folhas caindo lentamente com a brisa daquela 
    manhã de outono, os pássaros cantando nas árvores do parque... Porém, tudo 
    foi interrompido quando o mundo ficou preto e um forte cheiro de éter subiu
    às narinas de Mabê.\n
    Ao abrir os olhos, Mabê viu que se encontrava em um lugar úmido e escuro.
    Fora enganada, o seu encontro era na verdade com a MORTE.\n
    Agora ajude Mabê a escapar do seu cativeiro, sem ser vista pelos seus sequestradores.\n
    As mãos e os pés de Mabê estão presos com uma corda. Ela vê adiante algumas ferramentas e precisa
    se arrastar até uma delas.\n
    [canivete]
    [faca]
    [serrote]
    [martelo]
    [tesoura]
    [alicate]\n`,
    pergunta: `Qual ferramenta Mabê escolhe? `,
    opcoes: ["canivete","faca","serrote","martelo","tesoura","alicate"], // Lista onde armazena as opções.
    pontuacao: ["ganha", "ganha" , "perde", "perde", "perde", "perde"],
    caminho: [1, 2, -1, -1, -1, -1],
}

let canivete = { // Objeto criado para o caminho caso o canivete seja escolhido.
    historia: `
    Mabê é ouvida pelos sequestradores.
    "Olha só quem está tentando fugir do conforto do nosso lar!" - riu um dos bandidos mascarados.
    Mabê sente o frio da lâmina do canivete em seu bolso. E precisa decidir... \n
    [esconder canivete]
    [atacar bandidos]
    [gritar por socorro]
    [fugir pela janela]
    [sair correndo]\n
    `,
    pergunta: `O que Mabê tem que fazer? `,
    opcoes: ["esconder canivete","atacar bandidos","gritar por socorro","fugir pela janela","sair correndo"],
    pontuacao: ["ganha", "ganha" , "perde", "perde", "perde"],
    caminho: [3, 2, -1, -1, -1],
}

let corredor = { // Objeto criado para o caminho que leva ao corredor.
    historia: `
    Mabê consegue se libertar, e sai da sala correndo.\n
    Ela se depara com uma porta e uma escada, onde ela pode descer ou subir.
    E agora?\n
    [descer escada]
    [abrir porta]
    [subir escada]\n`,
    pergunta: `O que ela tem que fazer? `,
    opcoes: ["descer escada","abrir porta","subir escada"],
    pontuacao: ["ganha", "perde" , "perde"],
    caminho: [4, 3, -1],
}

let gas = { // Objeto criado para o caminho que leva a sala da tubulação de gás.
    historia: `
    Os bandidos a pegam novamente e levam para outra sala escura onde a amarram em uma tubulação.\n
    Mabê corta novamente as cordas, porém, fura a tubulação liberando uma enorme
    quantidade de gás, que aos poucos começa a encher o ambiente. O que ela faz?\n
    [quebra a janela]
    [aperta o interruptor]
    [arromba a porta]
    [sai pelo telhado]\n'`,
    pergunta: `Escolha umas das ações: `,
    opcoes: ["quebra a janela","aperta o interruptor","arromba a porta","sai pelo telhado"],
    pontuacao: ["ganha", "game over" , "perde", "perde"],
    caminho: [4, -1, -1, -1],
}

let jardim = { // Objeto criado para o caminho que leva ao jardim.
    historia: `
    Mabê chega a um jardim e ela está prestes a escapar. O que ela faz?\n
    [abre o portao]
    [pula o muro]
    [sobe na arvore]
    [se esconde nos arbustos]\n`,
    pergunta: `Escolha umas das ações: `,
    opcoes: ["abre o portao","pula o muro","sobe na arvore","se esconde nos arbustos"],
    pontuacao: ["perde", "vence" , "perde", "perde"],
    caminho: [3, -1, -1, -1],
}

let global = [inicio, canivete, corredor, gas, jardim] // Lista dos objetos de cada caminho possível.
 
function Escolha_(historia, pergunta, opcoes, pontuacao, caminho){ //Função alimentada pela história, pergunta, opções, pontuação e caminho.

    console.log(historia) 

    while (status.energia > 0) {

        let escolha = prompt(pergunta).trim().toLowerCase();
        index_ = opcoes.indexOf(escolha);


        if (index_ == -1){
            console.log(`Essa opção não existe!`);
            continue;}

        let caminho_ = global[caminho[index_]]

        if (pontuacao[index_] == "ganha"){
            console.log();
            status.ganharPontuacao(); 
            console.log(`Você ganhou +10 pontos!`);
            console.log(`Pontos: ${status.pontuacao}`);
            console.log(`Energia: ${status.energia}`);
            status.contagemTempo1();
            console.log(`Mabê está a ${status.tempo} hora(s) tentando escapar`);
            console.log();

            if (caminho[index_] >= 0){
                return Escolha_(caminho_.historia, 
                                caminho_.pergunta, 
                                caminho_.opcoes, 
                                caminho_.pontuacao, 
                                caminho_.caminho)
            }

        } else if (pontuacao[index_] == "perde") {
            console.log();
            console.log(`Ops! Essa opção prejudicou a Mabê. `);
            status.perderEnergia();
            console.log(`Você perdeu: -25 de energia! `);
            status.perderPontuacao();
            console.log(`Você perdeu: -10 pontos!`);
            console.log(`Pontos: ${status.pontuacao}`);
            console.log(`Energia: ${status.energia}`);
            status.contagemTempo2();
            console.log(`Mabê está a ${status.tempo} hora(s) tentando escapar`);
            console.log();
            
            if (caminho[index_] >= 0){
                return Escolha_(caminho_.historia, 
                                caminho_.pergunta, 
                                caminho_.opcoes, 
                                caminho_.pontuacao, 
                                caminho_.caminho)
            }

        } else if (pontuacao[index_] == "vence") {
            console.log(`
    Ao pular o muro Mabê consegue ajuda. 
    O vizinho chama a polícia, Mabê ao ouvir as sirenes acorda e percebe que era tudo um sonho.
    A sirene que ela ouvia era o som da tela do consultório chamando seu número.
    \t\t\t ### MABÊ ESTÁ LIVRE ###`);
    break;
            
        } else if (pontuacao[index_] == "game over"){
            console.log(`
            Uma grande explosão acontece. Mabê teve um Encontro com a Morte!
            \t\t\t ### GAME OVER ###`);
            break;
        }

    } 
    
    if (status.energia == 0) {console.log('#### Sua energia acabou! ### Game Over ####')}

    jogarNovamente = ''
    while (jogarNovamente != 'sim' || jogarNovamente != 'nao') {

        console.log(jogarNovamente = prompt('Deseja jogar novamente? Sim ou Nao.').trim().toLowerCase());

        if (jogarNovamente == "sim"){

            status.energia = 100; 
            status.pontuacao = 0; 
            status.tempo = 0;

            return Escolha_(global[0].historia,
                            global[0].pergunta,
                            global[0].opcoes,
                            global[0].pontuacao,
                            global[0].caminho)

        } else if (jogarNovamente == 'nao') {
            console.log('#### Jogo encerrado! ####')
            break;
        } 

    }

}

Escolha_(inicio.historia, // Inicia a função pela primeira vez.
         inicio.pergunta, 
         inicio.opcoes, 
         inicio.pontuacao, 
         inicio.caminho)



