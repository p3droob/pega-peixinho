const nome = prompt('Digite seu nome');
const doc = document.getElementById('stats');
let capturar = document.getElementById('capturar');
let titulo = document.getElementById('pesca');
let game = document.getElementById('game');
function verspeed () {
  return this.speed;
};

class Game {
  constructor(name) {
    this.name = name;
    this.tries = 0;
    this.chances = 3;
    this.catches = 0;
    this.level = 1;
    this.speed = 500;
    this.status = 0;
    this.types = {
      on: 0,
      lose: 1,
      win: 2,
    }
    this.number = 8;
    this.ocean = new Array(8).fill('🌊');
    this.pier = new Array(8).fill('🪑');
    this.pier[Math.floor(this.pier.length / 2)] = '🙎‍♂️';
    this.pier[this.pier.indexOf('🙎‍♂️') - 1] =  '🪣';

  }
  restart() {//reinicia
    this.ocean = new Array(8).fill('🌊');
    return true
  }

  async run() {
    titulo.innerHTML = `Pescaria de ${this.name || 'jogador não identificado'}`
    let time = 1000 * 60 * 5;
    let speed = this.speed;
    doc.innerHTML = `A pescaria começou! Você tem 3 minutos<br>Progresso:<br>> Jogadas: ${this.tries}<br>> Erros restantes: ${this.chances}/3<br>> Peixes Capturados: ${this.catches}<br>> Level: ${this.level}<br>Velocidade: ${this.speed / 1000}s`;
    game.innerHTML = `<br>${this.pier.join('')}<br>${this.ocean.join('')}`;
    //repetindo
    let intervalo = setInterval(() => {
      if (this.status == 1) {//se ja tiver perdido
        //deveria atualizar o ranking
        doc.innerHTML = `A pescaria terminou!<br>Progresso:<br>> Jogadas: ${this.tries}<br>> Erros restantes: ${this.chances}/3<br>> Peixes Capturados: ${this.catches}<br>> Level: ${this.level}<br>Velocidade: ${this.speed / 1000}s`;
        game.innerHTML = `<br>${this.pier.join('')}<br>${this.ocean.join('')}`;
        clearInterval(intervalo)
      }
      this.swim();
      doc.innerHTML = `A pescaria em andamento! Você tem 3 minutos<br>Progresso:<br>> Jogadas: ${this.tries}<br>> Erros restantes: ${this.chances}/3<br>> Peixes Capturados: ${this.catches}<br>> Level: ${this.level}<br>Velocidade: ${this.speed / 1000}s`;
      game.innerHTML = `<br>${this.pier.join('')}<br>${this.ocean.join('')}`;
      
    }, this.speed);
    setTimeout(()=> {
      //quando acabar
      clearInterval(intervalo);
        doc.innerHTML = `O tempo acabou!<br>Progresso:<br>> Jogadas: ${this.tries}<br>> Erros restantes: ${this.chances}/3<br>> Peixes Capturados: ${this.catches}<br>> Level: ${this.level}<br>Velocidade: ${this.speed / 1000}s`;
      game.innerHTML = `<br>${this.pier.join('')}<br>${this.ocean.join('')}`;
    }, time);
    capturar.addEventListener('click', () => {
      if (this.chances == 0) {
        alert('Você é burro, você perdeu num jogo muito fácil.');//avisa que você perdeu
        return;
      }
      let tryToCapture = this.capture();
      if (!tryToCapture) {
        if (this.chances > 0) {
          alert(`${this.name}, Hmm, parece que você errou, agora você tem ${this.chances} tentativas.`);
        };
        if (this.chances < 1) {
          capturar.disabled = true;
          capturar.innerHTML = ':(';//desabilita o botão
          doc.innerHTML = `A pescaria acabou, você perdeu!<br>Progresso:<br> Jogadas: ${this.tries}<br>> Erros restantes: ${this.chances}/3<br>> Peixes Capturados: ${this.catches}<br>> Level: ${this.level}<br>Velocidade: ${this.speed / 1000}s`;
          game.innerHTML = `<br>${this.pier.join('')}<br>${this.ocean.join('')}`;
          setTimeout(() => alert(`${this.name} você é burro, você perdeu num jogo muito fácil `), 900)
        }
        
      };
      doc.innerHTML = `Progresso:<br>> Jogadas: ${this.tries}<br>> Erros restantes: ${this.chances}/3<br>> Peixeis Capturados: ${this.catches}<br>> Level: ${this.level}<br>Velocidade: ${this.speed / 1000}s`;
      game.innerHTML = `<br>${this.pier.join('')}<br>${this.ocean.join('')}`;
      if (this.catches == 50) {
        alert('Você ganhou! Parabéns');
        this.status = 2;
      }
    })
  }
  capture() {//captura  o peixe
    let manIndex = this.pier.indexOf('🙎‍♂️');
    let peixeIndex = this.ocean.indexOf('🐟');
    if (peixeIndex < 0) return alert('O peixe ainda não apareceu aguarde...');


    if (manIndex !== peixeIndex) {
      this.tries++;
      this.chances--;
      if (this.chances === 0) this.status = this.types['lose'];
      return false;
      }
    if (manIndex === peixeIndex) {
      this.restart();
      this.tries++;
      this.catches++;
      this.speed = this.speed - Math.round(Math.random() * 35);
      this.level++;
      /*let level1 = Number(this.level) * Number(5)
      let level2 = Number(level1) + Number(5);
      if (this.catches >= level2) this.level++;*/
      return true;
      }
  }
  swim() {//faz o peixe nadar
    let peixeIndex = this.ocean.indexOf('🐟');
    if (peixeIndex === 0) this.restart();
    this.ocean[peixeIndex < 0 ? this.ocean.length - 1 : peixeIndex - 1] = '🐟';

    peixeIndex > 0 ? this.ocean[peixeIndex] = '🌊' : true
    this.swims += 1;

    return true

  }
}
const pescaria = new Game(nome);
pescaria.run()
