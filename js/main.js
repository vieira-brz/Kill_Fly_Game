// DEFININDO DIMENSÃO DO PALCO --------------------------------------------------------------------------------------------------------------------------->
var altura = 0;
var largura = 0;

var vidas = 1

var tempo = 10;

var moscaTempo = 1500

var nivel = window.location.search;
nivel = nivel.replace('?','');

if (nivel === 'normal') {
    moscaTempo = 1500;
} else if (nivel === 'dificil') {
    moscaTempo = 1000;
} else if (nivel === 'impossivel') {
    moscaTempo = 750;
}

// Ajusta o tamanho em relação ao dispositivo
function ajustaTamanhoPalcoJogo() {
    // Pegando altura da página
    altura = window.innerHeight;
    // Pegando largura da página
    largura = window.innerWidth;
}

ajustaTamanhoPalcoJogo()

// Variavel cronometro que a 1 intervalo de 1 segundo decrementa-se 1 segundo do valor da variavel tempo
var cronometro = setInterval(() => {
    // A cada intervalo desconta 1 segundo da variavel tempo
    tempo -=1    

    if (tempo < 0) {
        // Elimina a função de cronometro da memória da aplicação
        clearInterval(cronometro);
         // Elimina a função de criar mosca da memória da aplicação
        clearInterval(criaMosca);
        // Interrompe o jogo e vai para --> Vitória
        window.location.href = './vitoria.html';
    } else {
        // Coloca dentro da tag referente ao id cronometro, o valor do tempo, ou seja, o cronometro da aplicação
        document.getElementById('cronometro').innerHTML = tempo;
    }
}, 1000);

// CRIANDO POSIÇÕES RANDÔMICAS (Posições aleatórias de 0 à 1) -------------------------------------------------------------------------------------------->
function posicaoRandomica() {
    // Se já houver 1 mosquito --> remova automaticamente
    if (document.getElementById('mosca')) {
        // Removendo a tag HTML criada nesta função (maix abaixo)
        document.getElementById('mosca').remove();
        // Se a vida for menor que três --> interrompa
        if (vidas > 3) {
            // Interrompe o jogo e vai para --> Game Over
            window.location.href = './fimDeJogo.html';
        }
        else {
            // Senão --> prossiga
            // Se a mosca não for clicada e sumir --> Perde 1 vida --> v + unidade equivalente (1) = v1
            // 2º execução: Se a mosca não for clicada e sumir --> Perde +1 vida --> v + unidade equivalente (2) = v2
            // 3º execução: Se a mosca não for clicada e sumir --> Perde +1 vida --> v + unidade equivalente (3) = v3
            document.getElementById('v' + vidas).src = "./images/coracao_vazio.png";
            // Incrementa +1 unidade a variavel vidas, assim da próxima vez, altera-se o v2, depois v3 . . . etc
            vidas++;   
        }     
    }

    // var   = arredondamento (valor aleatório * tamanho do dispositivo) - 90(px menor que o limite, ou seja, 
    // a imagem nao ultrapassa o tamanho da tela)
    // Isso faz com que o mosquito apareça em qualquer lugar da tela toda
    // e não só de um pequeno espaço
    var posX = Math.floor(Math.random() * largura) - 90;
    var posY = Math.floor(Math.random() * altura) - 90;

    // Se posição X for menor que 0 ela recebe 0 senão ela recebe ela mesma
    posX = posX < 0 ? 0 : posX;
    // Se posição Y for menor que 0 ela recebe 0 senão ela recebe ela mesma
    posY = posY < 0 ? 0 : posY;

    // ELEMENTOS HTML ------------------------------------------------------------------------------------------------------------------------------------>
    // Criando tag imagem e atribuindo a variavel mosca
    var mosca = document.createElement('img');
    // Inserindo src na tag criada
    mosca.src = './images/mosca.png';
    // Atribuindo o nome das classes (tamanho 'espaço' lado) à tag criada
    mosca.className =  tamanhoAleatorio() + ' ' + ladoAleatorio();
    // Coordenada em px que queremos posicionar à esquerda da página
    mosca.style.left = posX + 'px';
    // Coordenada em px que queremos posicionar ao topo da página
    mosca.style.top = posY + 'px';
    // Definindo posição absoluta para a mosca
    mosca.style.position = 'absolute';
    // Definindo um Id para a mosca
    mosca.id = 'mosca';
    // Quando clicar na mosca --> execute a função
    mosca.onclick = function() {
        // Remova esta tag (mosca)
        this.remove()
    }
    // Incluindo no body
    document.body.appendChild(mosca);
}

// CRIANDO CLASSES ALEATÓRIAS DE MOSCAS ------------------------------------------------------------------------------------------------------------------>
function tamanhoAleatorio() {
    // 3 possibilidades de tamanhos (classes: 0, 1 e 2)
    var classe = Math.floor(Math.random() * 3);
    // Definindo qual classe será retornada para cada valor possível
    switch (classe) {
        case 0:
            return 'mosca1';

        case 1:
            return 'mosca2';

        case 2:
            return 'mosca3';
    }
}

// CRIANDO LADOS ALEATÓRIOS DE MOSCAS (A e B) ------------------------------------------------------------------------------------------------------------>
function ladoAleatorio() {
    // 2 possibilidades de lados (classes: ladoA e ladoB)
    var classe = Math.floor(Math.random() * 2);
    // Definindo qual classe será retornada para cada valor possível
    switch (classe) {
        case 0:
            return 'ladoA';

        case 1:
            return 'ladoB';
    }
}