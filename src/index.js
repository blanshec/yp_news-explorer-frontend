/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
import './scripts/script.js';
import './index.css';
import Popup from './blocks/popup/popup';

document.querySelector('.header').addEventListener('click', (event) => {
  if (event.target.classList.contains('header__button')) {
    const popup = new Popup('');
    popup.open();
  }
});
