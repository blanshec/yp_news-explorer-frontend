
export default class Popup {
  constructor(popup) {
    this.popupElement = popup;
  }

  open() {
    this.popupElement.classList.remove('popup_inactive');
    const button = this.popupElement.querySelector('');
    button.setAttribute('disabled', true);
    button.classList.add('.popup__button_disabled');
  }
}
