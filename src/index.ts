import Calculator from './modules/Calculator';

declare interface ElementEvent extends Event {
  target: HTMLElement;
}

document.addEventListener('DOMContentLoaded', function () {

  const display: HTMLParagraphElement = document.querySelector('p#display');
  const calc = new Calculator();
  const calcBtns = document.querySelectorAll('.calcButton');

  const handleDisplayUpdate = (val: string) => {
    display.innerText = val ? val : '0'
  };

  calc.onDisplayUpdate(handleDisplayUpdate);

  const handleBtnClick = (e: ElementEvent) => {
    const el = e.target;
    const {
      value,
      type
    } = el.dataset;
    calc.buttonPressed({
      type,
      value
    })
  }

  calcBtns.forEach(btn => btn.addEventListener('click', handleBtnClick));

});