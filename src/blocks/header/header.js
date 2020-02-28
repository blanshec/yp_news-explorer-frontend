import Component from '../Component';
import HeaderButton from './__button/headerButton';
import config from '../../scripts/config';
import events from '../../scripts/events';

export default class Header extends Component {
  constructor(props) {
    super(props.element);
    const headerButton = new HeaderButton({
      element: document.querySelector(config.elements.headerButton),
    });
  }
}
