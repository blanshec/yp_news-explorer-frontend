import Component from '../Component';
import HeaderButton from './__button/headerButton';
import config from '../../js/constants/config';
import events from '../../js/constants/events';

export default class Header extends Component {
  constructor(props) {
    super(props.element);
    const headerButton = new HeaderButton({
      element: document.querySelector(config.elements.headerButton),
    });
  }

  render(props) {

  }
}
