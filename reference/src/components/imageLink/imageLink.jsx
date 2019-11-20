import { h, Component } from 'preact';

export default class ImageLink extends Component {

  static defaultProps = {
    className: '',
    href: '',
    src: '',
    target: null
  };

  render(props) {
    return (
      <a href={props.href} target={props.target} >
        <img class={props.className} src={props.src} />
      </a>
    );
  }
  
}