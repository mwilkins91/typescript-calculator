import Calculator from '../src/modules/Calculator';
import { expect } from 'chai';
import 'mocha';

describe('basic', () => {

  it('Can be instantiated', () => {
    const calc = new Calculator;
    expect(calc).is.instanceOf(Calculator);
  });

  

});