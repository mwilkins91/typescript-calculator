// UI buttons for calculator
interface button {
  type: string; //'number' | 'operator' | 'action'
  value: string;
}

// Math operations
const add = (a: number, b: number): number => a + b;
const subtract = (a: number, b: number): number => a - b;
const divide = (a: number, b: number): number => a / b;
const multiply = (a: number, b: number): number => a * b;

// map symbols to math operations
const operations = {
  '+': add,
  '-': subtract,
  '*': multiply,
  '/': divide
}

class Calculator {
  currentTotal: number; // What the current running total is
  currentOperator: string; // What the active operator is
  lastOperator: string; // The last operator that was pressed
  displayShouldClear: boolean;
  onDisplayUpdateHandlers: [Function];
  onDisplay: string;

  constructor() {
    this.onDisplayUpdateHandlers = [() => console.log('Starting Display Handlers...')];
    this.clear();
  }

  fireDisplayUpdateHandlers() {
    this.onDisplayUpdateHandlers.forEach(func => func(this.onDisplay));
  }

  onDisplayUpdate(func: Function) {
    this.onDisplayUpdateHandlers.push(func);
  }

  offDisplayUpdate(func: Function): boolean {
    const index = this.onDisplayUpdateHandlers.indexOf(func);
    if (index > -1) {
      this.onDisplayUpdateHandlers.splice(index, 1);
      return true;
    }
    return false;
  }

  numberPressed(btn: button) {
    if (this.displayShouldClear) {
      this.clear()
      this.displayShouldClear = false;
    }

    if (this.currentOperator && this.onDisplay) {
      if (this.onDisplay.indexOf('.') === this.onDisplay.length) {
        this.onDisplay = this.onDisplay.slice(0, this.onDisplay.length - 1);
      }

      if (this.currentTotal) {
        const operation = operations[this.currentOperator];
        const result = operation(this.currentTotal, parseFloat(this.onDisplay));
        this.currentTotal = result;
      } else {
        this.currentTotal = parseFloat(this.onDisplay);
      }

      this.onDisplay = null;

      this.lastOperator = this.currentOperator;
      this.currentOperator = null;
    }

    if (this.onDisplay === null) {
      this.onDisplay = btn.value;
      this.fireDisplayUpdateHandlers();
      return;
    }

    if (this.onDisplay === '0' && btn.value === '0') {
      return;
    }

    this.onDisplay = this.onDisplay + btn.value;
    this.fireDisplayUpdateHandlers();
    return;
  }

  evaluate() {
    if (!this.currentOperator && !this.lastOperator) return;
    if (this.onDisplay.indexOf('.') === this.onDisplay.length) {
      this.onDisplay = this.onDisplay.slice(0, this.onDisplay.length - 1);
    }
    const operation = operations[this.currentOperator || this.lastOperator];
    const result = operation(this.currentTotal, parseFloat(this.onDisplay));
    this.currentTotal = null;
    this.onDisplay = result.toString();
    this.fireDisplayUpdateHandlers();
    this.displayShouldClear = true;
    return result;
  }

  clear() {
    this.onDisplay = null;
    this.fireDisplayUpdateHandlers();
    this.currentTotal = null;
    this.currentOperator = null;
    this.lastOperator = null;
    this.displayShouldClear = true;
  }

  actionPressed(btn: button) {
    switch (btn.value) {
      case 'evaluate':
        this.evaluate();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        this.currentOperator = btn.value;
        this.displayShouldClear = false;
        break;
      case 'clear':
        this.clear();
        break;
      case '.':
        if (
          typeof this.onDisplay === 'string' &&
          !this.onDisplay.includes('.') &&
          this.onDisplay.length > 0 &&
          !this.displayShouldClear
        ) {
          const newVal = this.onDisplay + '.';
          this.onDisplay = newVal;
          this.fireDisplayUpdateHandlers();
        } else if (this.displayShouldClear || this.onDisplay === null) {
          const newVal = '0.';
          this.onDisplay = newVal;
          this.fireDisplayUpdateHandlers();
          this.displayShouldClear = false;
        }
        break;
      default:
        break;
    }
  }

  buttonPressed(btn: button) {
    switch (btn.type) {
      case 'number':
        this.numberPressed(btn);
        break;
      case 'operator':
        this.actionPressed(btn);
        break;
      default:
        throw new Error('Button type not recognized!');
    }
    return;
  }
}

export default Calculator;
