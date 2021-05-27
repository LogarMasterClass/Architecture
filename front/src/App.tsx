class SingleTom {
  private counter: number = 1;
  private static instace: SingleTom;

  private constructor() {}

  static getInstance(): SingleTom {
    if (!SingleTom.instace) {
      SingleTom.instace = new SingleTom();
    }
    return SingleTom.instace;
  }

  helloWord() {
    console.log(`olá mundo!` + this.counter);
    this.counter++;
  }
}

// factory
interface IPagamento {
  pagar(): string;
}

class PagamentoEmCartao implements IPagamento {
  pagar(): string {
    return this.pagarEmCartao();
  }  
  pagarEmCartao() {
    return 'toma cartão';
  }
}

class PagamentoEmDinheiro implements IPagamento {
  pagar(): string {
    return "toma dinheiro";
  }  
}

class PagamentoComPix implements IPagamento {
  pagar(): string {
    return "toma pix";
  }  
}

class pagamentoFactory {
  private constructor() {};

  static factory(tipoPagamento?: string): IPagamento {
    if (tipoPagamento) {
      switch(tipoPagamento) {
        case 'dinheiro':
          return new PagamentoEmDinheiro();
        case 'cartao':
          return new PagamentoEmCartao();
        case 'pix':
          return new PagamentoComPix();
      }
    }
    return new PagamentoEmDinheiro();
  }
}

interface Passaro {
  bica(): void;  
}

interface PassaroQueVoam extends Passaro {
  voa(): void;  
}

class Pardao implements PassaroQueVoam {
  bica(): void {}
  voa(): void {}
}

class Pinguim implements Passaro {
  bica(): void {}
}


function App() {

  function olaMundo() {
    let a = SingleTom.getInstance();
    let b = SingleTom.getInstance();
    let c = SingleTom.getInstance();
    a.helloWord();
    b.helloWord();
    c.helloWord();
  }

  function pagarConta (tipo?: string) {
    const pagamento: IPagamento = pagamentoFactory.factory(tipo);
    console.log(pagamento.pagar());
  }

  return (
    <div className="App">
      <h1>Olá Mundo</h1>
      <button onClick={() => pagarConta('pix')}>pagamento</button>
    </div>
  );
}

export default App;
