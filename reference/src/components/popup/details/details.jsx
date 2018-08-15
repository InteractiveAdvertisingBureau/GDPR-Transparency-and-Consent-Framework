import { h, Component } from 'preact';
import style from './details.less';
import Button from '../../button/button';
import CloseButton from '../../closebutton/closebutton';
import Purposes from './purposes/purposes';
import Vendors from './vendors/vendors';
import Panel from '../../panel/panel';
import Label from "../../label/label";
import event_logger from '../../../lib/event_logger';

const SECTION_PURPOSES = 0;
const SECTION_VENDORS = 1;

class LocalLabel extends Label {
  static defaultProps = {
    prefix: 'details'
  };
}

export default class Details extends Component {
  state = {
    selectedPanelIndex: SECTION_PURPOSES
  };

  handleShowVendors = () => {
    this.setState({
      selectedPanelIndex: SECTION_VENDORS
    });
  };

  handleBack = () => {
    const { onCancel } = this.props;
    const { selectedPanelIndex } = this.state;
    this.setState({
      selectedPanelIndex: Math.max(0, selectedPanelIndex - 1)
    });
    if (selectedPanelIndex === SECTION_PURPOSES) {
      onCancel();
    }
  };

  handleSave = () => {
    const { onSave } = this.props;
    event_logger("cmp_save_and_exit");
    onSave();
  }


  handleSelectAllPurposes = () => {
    const {selectAllPurposes} = this.props.store;
    event_logger("cmp_enable_all_purposes");
    selectAllPurposes(true);
  }

  render(props, state) {
    const {
      onCancel,
      onSave,
      store
    } = props;
    const { selectedPanelIndex } = state;

    const {
      vendorList = {},
      customPurposeList = {},
      vendorConsentData,
      publisherConsentData,
      publisherName,
      selectAllPurposes,
      selectPurpose,
      selectCustomPurpose,
      selectAllVendors,
      selectVendor
    } = store;

    const { selectedPurposeIds, selectedVendorIds } = vendorConsentData;
    const { selectedCustomPurposeIds } = publisherConsentData;
    const { purposes = [], vendors = [] } = vendorList;
    const { purposes: customPurposes = [] } = customPurposeList;
    const allPurposes = [...purposes, ...customPurposes];

    var publisherConsentHead = publisherName || 'Publisher';

    return (
      <div class={style.details}>
        <div class={style.header}>
          {publisherName && publisherName.length > 0 &&
          <div class={style.item, style.left}>
            <span class={style.name}>{publisherName}</span>
          </div>
          }
          <div class={style.item, style.right}>
            <Button class={style.button} onClick={this.handleSelectAllPurposes}>
              <LocalLabel localizeKey='savePurposes'>Enable all purposes</LocalLabel>
            </Button>
          </div>
        </div>

        <div class={style.body}>
          <LocalLabel localizeKey='subtitle' class={style.subtitle}>We value your privacy</LocalLabel>
          <LocalLabel localizeKey='description' class={style.message}>In order to run a successful website, we and certain third parties are setting cookies and accessing and storing information on your device for various purposes. Various third parties are also collecting data to show you personalized content and ads. Some third parties require your consent to collect data to serve you personalized content and ads.
          </LocalLabel>
          {customPurposes && customPurposes.length > 0 &&
          <Panel selectedIndex={selectedPanelIndex}>
            <table class={style.table}>
              <tbody>
                <tr>
                  <th class={style.head}>
                    {publisherConsentHead}
                  </th>
                </tr>
                {customPurposes.map((purpose, index) => (
                  <tr class={style.row}>
                    <td>
                      <Purposes
                        selectedPurposeIndex={index + purposes.length}
                        purposes={purposes}
                        customPurposes={customPurposes}
                        selectedPurposeIds={selectedPurposeIds}
                        selectedCustomPurposeIds={selectedCustomPurposeIds}
                        selectPurpose={selectPurpose}
                        selectCustomPurpose={selectCustomPurpose}
                        selectVendor={selectVendor}
                        vendors={vendors}
                        selectedVendorIds={selectedVendorIds}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Vendors
              enableEdit={true}
              enableAllVendors={false}
              selectedVendorIds={selectedVendorIds}
              selectAllVendors={selectAllVendors}
              selectVendor={selectVendor}
              vendors={vendors}
            />
          </Panel>
          }

          <Panel selectedIndex={selectedPanelIndex}>
            <table class={style.table}>
              <tbody>
                <tr>
                  <th class={style.head}>
                    Third-party Vendors
                  </th>
                </tr>
                {purposes.map((purpose, index) => (
                  <tr class={style.row}>
                    <td>
                      <Purposes
                        selectedPurposeIndex={index}
                        purposes={purposes}
                        customPurposes={customPurposes}
                        selectedPurposeIds={selectedPurposeIds}
                        selectedCustomPurposeIds={selectedCustomPurposeIds}
                        selectPurpose={selectPurpose}
                        selectCustomPurpose={selectCustomPurpose}
                        selectVendor={selectVendor}
                        vendors={vendors}
                        selectedVendorIds={selectedVendorIds}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Vendors
              enableEdit={true}
              enableAllVendors={false}
              selectedVendorIds={selectedVendorIds}
              selectAllVendors={selectAllVendors}
              selectVendor={selectVendor}
              vendors={vendors}
            />
          </Panel>

        </div>
        <div class={style.footer}>
          <a class={style.showVendor} onClick={this.handleShowVendors}>
            <LocalLabel localizeKey='showVendor'>Show full vendor list</LocalLabel>
          </a>
          <a class={style.cancel} onClick={this.handleBack}><LocalLabel localizeKey='cancel'>Back</LocalLabel></a>
          <Button class={style.save} onClick={this.handleSave}><LocalLabel localizeKey='save'>Save and Exit</LocalLabel></Button>
        </div>
      </div>
    );
  }
}
