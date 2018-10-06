import Calculator from '../src/modules/Calculator';
import { expect } from 'chai';
import 'mocha';
import sinon, { SinonSpy } from 'sinon';

describe('basic', () => {
  it('Can be instantiated', () => {
    const calc = new Calculator();
    expect(calc).is.instanceOf(Calculator);
  });

  it('Displays numbers when they are pressed', () => {
    const calc = new Calculator();
    calc.buttonPressed({
      type: 'number',
      value: '1',
    });
    expect(calc.onDisplay).to.equal('1');

    calc.buttonPressed({
      type: 'number',
      value: '0',
    });

    expect(calc.onDisplay).to.equal('10');

    calc.buttonPressed({
      type: 'number',
      value: '0',
    });

    expect(calc.onDisplay).to.equal('100');
  });

  it('Displays numbers with a decimal when "." is pressed', () => {
    const calc = new Calculator();
    calc.buttonPressed({
      type: 'number',
      value: '1',
    });
    expect(calc.onDisplay).to.equal('1');

    calc.buttonPressed({
      type: 'number',
      value: '0',
    });

    expect(calc.onDisplay).to.equal('10');

    calc.buttonPressed({
      type: 'number',
      value: '0',
    });

    expect(calc.onDisplay).to.equal('100');

    calc.buttonPressed({
      type: 'operator',
      value: '.',
    });

    expect(calc.onDisplay).to.equal('100.');

    calc.buttonPressed({
      type: 'number',
      value: '0',
    });

    expect(calc.onDisplay).to.equal('100.0');

    calc.buttonPressed({
      type: 'number',
      value: '1',
    });

    expect(calc.onDisplay).to.equal('100.01');
  });

  it('The display resets when a number is pressed after a math operator', () => {
    const calc = new Calculator();
    calc.pressButtons([
      {
        type: 'number',
        value: '1',
      },
      {
        type: 'number',
        value: '0',
      },
      {
        type: 'number',
        value: '0',
      },
      {
        type: 'operator',
        value: '.',
      },
      {
        type: 'number',
        value: '0',
      },
      {
        type: 'number',
        value: '1',
      },
    ]);

    expect(calc.onDisplay).to.equal('100.01');

    calc.pressButtons([
      {
        type: 'operator',
        value: '+',
      },
      {
        type: 'number',
        value: '1',
      }
    ]);

    expect(calc.onDisplay).to.equal('1');
  });
});

describe('Math operators', () => {
  it('Can add numbers', () => {
    const calc = new Calculator();
    calc.pressButtons([
      {
        type: 'number',
        value: '1',
      },
      {
        type: 'operator',
        value: '+',
      },
      {
        type: 'number',
        value: '1',
      },
      {
        type: 'operator',
        value: 'evaluate',
      },
    ]);

    expect(calc.onDisplay).to.equal('2');
  });

  it('Can subtract numbers', () => {
    const calc = new Calculator();
    calc.pressButtons([
      {
        type: 'number',
        value: '2',
      },
      {
        type: 'operator',
        value: '-',
      },
      {
        type: 'number',
        value: '1',
      },
      {
        type: 'operator',
        value: 'evaluate',
      },
    ]);

    expect(calc.onDisplay).to.equal('1');
  });

  it('Can multiply numbers', () => {
    const calc = new Calculator();
    calc.pressButtons([
      {
        type: 'number',
        value: '2',
      },
      {
        type: 'operator',
        value: '*',
      },
      {
        type: 'number',
        value: '2',
      },
      {
        type: 'operator',
        value: 'evaluate',
      },
    ]);

    expect(calc.onDisplay).to.equal('4');
  });

  it('Can divide numbers', () => {
    const calc = new Calculator();
    calc.pressButtons([
      {
        type: 'number',
        value: '4',
      },
      {
        type: 'operator',
        value: '/',
      },
      {
        type: 'number',
        value: '2',
      },
      {
        type: 'operator',
        value: 'evaluate',
      },
    ]);

    expect(calc.onDisplay).to.equal('2');
  });

  it('Repeated evaluations continue to add to total', () => {
    const calc = new Calculator();
    calc.pressButtons([
      {
        type: 'number',
        value: '1',
      },
      {
        type: 'operator',
        value: '+',
      },
      {
        type: 'number',
        value: '1',
      },
      {
        type: 'operator',
        value: 'evaluate',
      },
    ]);

    expect(calc.onDisplay).to.equal('2');

    for (let i = 0; i < 10; i++) {
      calc.buttonPressed({
        type: 'operator',
        value: 'evaluate',
      });
      expect(calc.onDisplay).to.equal((2 + (i + 1)).toString());
    }
  });

  it('allows multiple operators to be chained together', () => {
    const calc = new Calculator();
    calc.pressButtons([
      {
        type: 'number',
        value: '1',
      },
      {
        type: 'operator',
        value: '+',
      },
      {
        type: 'number',
        value: '1',
      },
      {
        type: 'operator',
        value: '*',
      },
      {
        type: 'number',
        value: '2',
      },
      {
        type: 'operator',
        value: '-',
      },
      {
        type: 'number',
        value: '1',
      },
      {
        type: 'operator',
        value: 'evaluate',
      },
    ]);

    expect(calc.onDisplay).to.equal('3');
  });

  it('calls update display when a button is pressed', () => {
    const calc = new Calculator();
    const callback: SinonSpy = sinon.spy();
    calc.onDisplayUpdate(callback);

    calc.pressButtons([
      {
        type: 'number',
        value: '1',
      },
      {
        type: 'operator',
        value: '+',
      },
      {
        type: 'number',
        value: '1',
      },
      {
        type: 'operator',
        value: 'evaluate',
      },
    ]);
    expect(callback.callCount).to.equal(4);
  });

  it('can be cleared', () => {
    const calc = new Calculator();
    calc.pressButtons([
      {
        type: 'number',
        value: '1',
      },
      {
        type: 'operator',
        value: '+',
      },
      {
        type: 'number',
        value: '1',
      },
      {
        type: 'operator',
        value: '*',
      },
      {
        type: 'number',
        value: '2',
      },
      {
        type: 'operator',
        value: '-',
      },
      {
        type: 'number',
        value: '1',
      },
      {
        type: 'operator',
        value: 'evaluate',
      },
    ]);

    expect(calc.onDisplay).to.equal('3');

    calc.buttonPressed({
      type: 'operator',
      value: 'clear'
    })

    expect(calc.onDisplay).to.equal(null);
  });
});
