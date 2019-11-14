import { Component } from 'preact';

export default class ImageLink extends Component {

    static defaultProps = {
        href: '',
        className: '',
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
