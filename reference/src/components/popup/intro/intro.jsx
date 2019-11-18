import { h, Component } from 'preact';
import style from './intro.less';
import Button from '../../button/button';
import Label from '../../label/label';
import CloseButton from '../../closebutton/closebutton';
import ImageLink from '../../imageLink/imageLink';

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
              In order to run a successful website, we and certain third party partners are setting cookies and accessing/storing information about your interest on your device (mobile) for purposes that may include: 1) Information storage and access 2) Personalization 3) Ad selection, delivery, reporting 4) Content selection, delivery, reporting 5) Measurement. Some parties may rely on offline data matching, device linking, and geographic location data to offer those services. Click below to consent to the use of this technology across the web. You can change your mind and change your consent choices at anytime by returning to this site.
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
            <LocalLabel localizeKey='showPurposes'>Manage my preferences</LocalLabel>
          </a>
          <div class={style.divider} />
          <a class={style.showVendor} onClick={onShowVendors}>
            <LocalLabel localizeKey='showVenders'>See full vendor list</LocalLabel>
          </a>
        </div>
        <div class={style.footer}>
          <ImageLink
            className={style.footerLogo}
            href='https://sharethis.com/privacy/'
            src='https://s18955.pcdn.co/wp-content/uploads/2019/06/ShareThisLogo2x-1.png' />
        </div>

      </div>
    );
  }
}
