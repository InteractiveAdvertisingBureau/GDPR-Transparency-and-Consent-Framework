import { h, Component } from 'preact';
import style from './vendors.less';
import Button from '../../../button/button';
import Switch from '../../../switch/switch';
import Label from "../../../label/label";
import Icons from "../../../../lib/icons";

class LocalLabel extends Label {
  static defaultProps = {
    prefix: 'vendors'
  };
}

export default class Vendors extends Component {
  constructor(props) {
    super(props);
    const {selectedVendorIds, vendors} = props;
    this.state = {
      enableAll: selectedVendorIds.size == vendors.length ? true :  false,
      activeVendorIds: [],
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

  handleToggle = (vendorId) => {
    var {activeVendorIds} = this.state;
    var id = activeVendorIds.indexOf(vendorId);
    if (id !== -1) {
      activeVendorIds.splice(id, 1);
    } else {
      activeVendorIds.push(vendorId);
    }
    this.setState({
      activeVendorIds: activeVendorIds
    });
  };

  isActive = (id) => {
    var {activeVendorIds} = this.state;
    return activeVendorIds.indexOf(id) !== -1;
  }

  enableAll = () => {
    var {enableAll} = this.state;
    if (enableAll) {
      this.handleRejectAll();
    } else {
      this.handleAcceptAll();
    }
    this.setState({enableAll:!enableAll});
  };

  render(props, state) {

    const {
      vendors,
      purposeId,
      selectVendor,
      selectAllVendors,
      selectedVendorIds,
      selectedPurposeIds,
      enableEdit
    } = props;

    const { editingConsents, enableAll } = this.state;

    function VendorEnable(props) {
      const {
        id,
        enableEdit,
        selectedPurposeIds,
        purposeId
      } = props;

      if (enableEdit) {
        return null;
      }
      if (selectedVendorIds.has(id) && selectedPurposeIds.has(purposeId)) {
        return <td class={style.disabled}>On</td>
      }
      return <td class={style.disabled}>Off</td>
    }

    return (
      <div class={style.vendors}>
        <div class={style.vendorHeader}>
          <table class={style.vendorList}>
            <thead>
            <tr>
              <th class={style.tableHead}>
                <LocalLabel class={style.company} localizeKey='company'>
                  Company
                </LocalLabel>
              </th>
              {(enableEdit || editingConsents) &&
              <th class={style.tableHead}>
                <div
                  class={style.enableAll}
                  onClick={this.enableAll}
                >
                  {enableAll &&
                  <LocalLabel localizeKey='rejectAll'>disable all</LocalLabel>
                  }
                  {!enableAll &&
                  <LocalLabel localizeKey='acceptAll'>enable all</LocalLabel>
                  }
                </div>
              </th>
              }
            </tr>
            </thead>
          </table>
        </div>
        <div class={style.vendorContent}>
          <table class={style.vendorList}>
            <tbody>
            {vendors.map(({ id, name, policyUrl }, index) => (
              <tr key={id} class={index % 2 === 1 ? style.even : ''}>
                <td><div class={style.vendorName}>{name}</div></td>
                <VendorEnable
                  id={id}
                  selectedPurposeIds={selectedPurposeIds}
                  purposeId={purposeId}
                  enableEdit={enableEdit}
                />
                {enableEdit &&
                <td>
                  <Switch
                    dataId={id}
                    isSelected={selectedVendorIds.has(id)}
                    onClick={this.handleSelectVendor}
                  />
                </td>
                }
                {enableEdit &&
                <td class={style.dropDown}>
                  <div
                    class={this.isActive(id) ? style.arrowUp : style.arrowDown}
                    onClick={this.handleToggle.bind(this, id)}
                    >
                      <span dangerouslySetInnerHTML={{__html: Icons['arrow']}}/>
                  </div>
                </td>
                }
                <tr class={this.isActive(id) ? null : style.hidden}>
                  <div class={style.policy}>
                    Privacy policy:
                    <a href={policyUrl}> {policyUrl}</a>
                  </div>
                </tr>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
