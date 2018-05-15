import { h, Component } from 'preact';
import style from './details.less';
import Button from '../../button/button';
import CloseButton from '../../closebutton/closebutton';
import Purposes from './purposes/purposes';
import Vendors from './vendors/vendors';
import Panel from '../../panel/panel';
import Label from "../../label/label";

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

  render(props, state) {
    const {
      onCancel,
      onSave,
      onClose,
      store
    } = props;
    const { selectedPanelIndex } = state;

    const {
      vendorList = {},
      customPurposeList = {},
      vendorConsentData,
      publisherConsentData,
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

    return (
      <div class={style.details}>
        <div class={style.header}>
          <div class={style.item, style.left}>
            <img class={style.logo}
              localizeKey='logo'
              src='https://s18955.pcdn.co/wp-content/uploads/2016/12/ShareThisLogo1x.png'
            >
            </img>
          </div>
          <div class={style.item, style.center}>
            <LocalLabel class={style.title} localizeKey='title'>Privacy Settings</LocalLabel>
          </div>
          <div class={style.item, style.right}>
            <Button class={style.button} onClick={selectAllPurposes}>
              <LocalLabel localizeKey='savePurposes'>Enable all purposes</LocalLabel>
            </Button>
          </div>
        </div>

        <div class={style.body}>
          <h2 class={style.subtitle}>We value your privacy</h2>
          <p class={style.message}>In order to run a successful website, we and certain third parties are setting cookies and accessing and storing information on your device for various purposes. Various third parties are also collecting data to show you personalized content and ads. Some third parties require your consent to collect data to serve you personalized content and ads.
          </p>
          <Panel selectedIndex={selectedPanelIndex}>
            <table class={style.table}>
              <tbody>
                {allPurposes.map((purpose, index) => (
                  <tr>
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
          <a class={style.cancel} onClick={this.handleBack}><LocalLabel localizeKey='back'>Back</LocalLabel></a>
          <Button class={style.save} onClick={onSave}><LocalLabel localizeKey='save'>Save and Exit</LocalLabel></Button>
        </div>
      </div>
    );
  }
}
