import { h, Component } from 'preact';
import style from './features.less';

import Label from "../../../label/label";

class LocalLabel extends Label {
  static defaultProps = {
    prefix: 'features'
  };
}

export default class Features extends Component {
  static defaultProps = {
    feature: [],
    prefix: 'features'
  };


  render(props, state) {
    const { feature, prefix } = props;

    return (
      <div class={style.features}>
        <div class={style.featureDescription}>
          <div class={style.featureHeader}>
            <div class={style.title}>
              <LocalLabel localizeKey={`${prefix}.title`}>{feature.name}</LocalLabel>
            </div>
          </div>

          <div class={style.body}>
            <LocalLabel localizeKey={`${prefix}.description`} >
              {feature.description}
            </LocalLabel>
          </div>
        </div>
      </div>
    );
  }
}
