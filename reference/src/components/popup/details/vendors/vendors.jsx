import { h, Component } from 'preact';
import style from './vendors.less';
import Button from '../../../button/button';
import Switch from '../../../switch/switch';
import Label from "../../../label/label";

class LocalLabel extends Label {
  static defaultProps = {
    prefix: 'vendors'
  };
}

export default class Vendors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingConsents: false
    };
  }

  static defaultProps = {
    vendors: [],
    selectedVendorIds: new Set(),
    selectVendor: () => {}
  };

  handleAcceptAll = () => {
    this.props.selectAllVendors(true);
  };

  handleRejectAll = () => {
    this.props.selectAllVendors(false);
  };

  handleSelectVendor = ({ dataId, isSelected }) => {
    this.props.selectVendor(dataId, isSelected);
  };

  handleMoreChoices = () => {
    this.setState({
      editingConsents: true
    });
  };

  render(props, state) {

    const {
      vendors,
      selectedVendorIds,
      enableEdit
    } = props;
    const { editingConsents } = this.state;

    return (
      <div class={style.vendors}>
        <div class={style.vendorHeader}>
          <table class={style.vendorList}>
            <thead>
            <tr>
              <th><LocalLabel localizeKey='company'>Company</LocalLabel></th>
              {(enableEdit || editingConsents) &&
              <th><LocalLabel localizeKey='offOn'>Off/On</LocalLabel></th>
              }
            </tr>
            </thead>
          </table>
        </div>
        <div class={style.vendorContent}>
          <table class={style.vendorList}>
            <tbody>
            {vendors.map(({ id, name }, index) => (
              <tr key={id} class={index % 2 === 1 ? style.even : ''}>
                <td><div class={style.vendorName}>{name}</div></td>
                {!enableEdit &&
                <td class={style.disabled}>
                  Disabled
                </td>
                }
                {enableEdit &&
                <td>
                  <Switch
                    dataId={id}
                    isSelected={selectedVendorIds.has(id)}
                    onClick={this.handleSelectVendor}
                />
                </td>
                }
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
