# typescript-calculator

A class based calculator implementation with functions for evaluating mathematical expressions. 

## Properties

- `currentTotal`: holds the current running total of the calculator
- `currentOperator`: holds the active operator for the calculator
- `lastOperator`: holds the last operator that was pressed
- `displayShouldClear`: boolean indicating if the display should be cleared or not
- `onDisplayUpdateHandlers`: an array of functions to handle display updates
- `onDisplay`: holds the value currently displayed on the calculator
- `history`: an array holding the history of operations performed on the calculator

## Methods

- `fireDisplayUpdateHandlers`: invokes all functions in `onDisplayUpdateHandlers` array
- `onDisplayUpdate`: adds a function to the `onDisplayUpdateHandlers` array
- `offDisplayUpdate`: removes a function from the `onDisplayUpdateHandlers` array
- `numberPressed`: updates the display value of the calculator with the number pressed
- `removeHangingDecimal`: removes hanging decimal points from the display
- `evaluate`: evaluates the current mathematical expression
- `clear`: resets the calculator to its initial state

## Usage Examples

```ts
const calculator = new Calculator();
calculator.onDisplayUpdate((val) => console.log("Calculator display: ", val));
calculator.buttonPressed({ type: "number", value: "2" });
calculator.buttonPressed({ type: "operator", value: "+" });
calculator.buttonPressed({ type: "number", value: "2" });
calculator.evaluate();

// Output:
// Calculator display: 2
// Calculator display: 2
// Calculator display: 4
