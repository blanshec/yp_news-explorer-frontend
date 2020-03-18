// eslint-disable-next-line import/extensions
import '../../js/script.js';
import './index.css';


if (!localStorage.getItem('username')) {
  window.location.replace('/');
}
