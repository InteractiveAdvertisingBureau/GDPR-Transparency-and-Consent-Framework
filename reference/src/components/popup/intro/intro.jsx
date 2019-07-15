import { h, Component } from 'preact';
import style from './intro.less';
import Button from '../../button/button';
import Label from '../../label/label';
import CloseButton from '../../closebutton/closebutton';

class LocalLabel extends Label {
  static defaultProps = {
    prefix: 'intro'
  };
}

const HOST_PARTS = ((window && window.location && window.location.hostname) || '').split('.');
const DOMAIN = HOST_PARTS.length > 0 ? HOST_PARTS.slice(-2).join('.') : '';

export default class Intro extends Component {

  static defaultProps = {};

  render(props, state) {

    const {
      onAcceptAll,
      onRejectAll,
      onShowPurposes,
      onShowVendors,
      publisherName
    } = props;

    return (

      <div class={style.intro}>
        {(!!publisherName && publisherName.length > 0) &&
        <div class={style.logo}>
          <span class={style.name}>{publisherName}</span>
        </div>
        }
        <div class={style.title}>
          <LocalLabel localizeKey='title'>We value your privacy</LocalLabel>
        </div>
        <div class={style.description}>
          <LocalLabel localizeKey='description'>
            In order to run a successful website, we and certain third party partners are setting cookies and accessing/storing information on your device for purposes such as personalizing content/ads and measuring/analyzing traffic. Some parties may rely on offline data matching, device linking, and geographic location data to offer those services. Click below to consent to the use of this technology across the web. You can change your mind and change your consent choices at anytime by returning to this site.
          </LocalLabel>
        </div>
        <div class={style.options}>
          <Button
            invert={true}
            class={style.rejectAll}
            onClick={onRejectAll}
          >
            <LocalLabel localizeKey='rejectAll'>I do not accept</LocalLabel>
          </Button>
          <Button
            class={style.acceptAll}
            onClick={onAcceptAll}
          >
            <LocalLabel localizeKey='acceptAll'>I accept</LocalLabel>
          </Button>
        </div>
        <div class={style.bottom}>
          <a class={style.showPurposes} onClick={onShowPurposes}>
            <LocalLabel localizeKey='showPurposes'>Show Purposes</LocalLabel>
          </a>
          <div class={style.divider} />
          <a class={style.showVendor} onClick={onShowVendors}>
            <LocalLabel localizeKey='showVenders'>See full vendor list</LocalLabel>
          </a>
        </div>

      </div>
    );
  }
}
