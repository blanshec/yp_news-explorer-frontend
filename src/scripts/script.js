/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import Popup from '../blocks/popup/popup';

document.querySelector('.header').addEventListener('click', (event) => {
  if (event.target.classList.contains('header__button')) {
    const popup = new Popup(event.target);
    popup.open();
    // eslint-disable-next-line no-alert
    alert('hello');
  }
});
