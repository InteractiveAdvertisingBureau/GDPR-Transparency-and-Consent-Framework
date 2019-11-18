import { h, Component } from 'preact';

export default class ImageLink extends Component {

  static defaultProps = {
    className: '',
    href: '',
    src: ''
  };

  render(props) {
    return (
      <a href={props.href}>
        <img
          class={props.className}
          src={props.src} />
      </a>
    );
  }
  
}