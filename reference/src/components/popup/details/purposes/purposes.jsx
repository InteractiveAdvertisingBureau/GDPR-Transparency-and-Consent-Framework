import { h, Component } from 'preact';
import style from './purposes.less';
import Switch from '../../../switch/switch';
import Label from "../../../label/label";
import Vendors from './../vendors/vendors';

class LocalLabel extends Label {
  static defaultProps = {
    prefix: 'purposes'
  };
}

export default class Purposes extends Component {
  state = {
    showVendors: false,
    selectedPurposeIndex: 0
  };

  static defaultProps = {
    purposes: [],
    customPurposes: [],
    selectedPurposeIds: new Set(),
    selectedCustomPurposeIds: new Set()
  };

  handleSelectPurposeDetail = index => {
    return () => {
      this.setState({
        selectedPurposeIndex: index
      });
    };
  };

  handleSelectPurpose = ({isSelected, dataId}) => {
    var {selectedPurposeIndex} = this.props;
    if (dataId !== undefined) {
      selectedPurposeIndex = dataId;
    }
    const {
      purposes,
      customPurposes,
      selectPurpose,
      selectCustomPurpose
    } = this.props;
    const allPurposes = [...purposes, ...customPurposes];
    const id = allPurposes[selectedPurposeIndex].id;

    if (selectedPurposeIndex < purposes.length) {
      selectPurpose(id, isSelected);
    }
    else {
      selectCustomPurpose(id, isSelected);
    }
  };

  handleShowVendors = () => {
    this.setState({
      showVendors: !this.state.showVendors
    });
  };

  getVendorsForPurpose = (vendors, selectedPurposeId) => {
    var purposeVendors = [];
    for (var i = 0; i < vendors.length; i++) {
      var vendor = vendors[i];
      if (vendor.purposeIds.indexOf(selectedPurposeId) !== -1) {
        purposeVendors.push(vendor);
      }
    }
    return purposeVendors;
  }

  render(props, state) {
    const {
      selectedPurposeIndex,
      purposes,
      customPurposes,
      selectedPurposeIds,
      selectedCustomPurposeIds,
      vendors,
      selectVendor,
      selectedVendorIds
    } = props;

    const allPurposes = [...purposes, ...customPurposes];
    const selectedPurpose = allPurposes[selectedPurposeIndex];
    const selectedPurposeId = selectedPurpose && selectedPurpose.id;
    const purposeIsActive = selectedPurposeIndex < purposes.length ?
      selectedPurposeIds.has(selectedPurposeId) :
      selectedCustomPurposeIds.has(selectedPurposeId);
    // const currentPurposeLocalizePrefix = `${selectedPurposeIndex >= purposes.length ? 'customPurpose' : 'purpose'}${selectedPurposeId}`;
    const currentPurposeLocalizePrefix = `purpose${selectedPurposeId}`;
    const showDivider = selectedPurposeId !== allPurposes.length;

    const {showVendors} = this.state;

    // get the vendor list for this purpose
    var purposeVendors = this.getVendorsForPurpose(vendors, selectedPurposeId);

    return (
      <div class={style.purposes}>
        <div class={style.purposeDescription}>
          <div class={style.purposeDetail}>
            <div class={style.detailHeader}>
              <div class={style.title}>
                <LocalLabel localizeKey={`${currentPurposeLocalizePrefix}.title`}>{selectedPurpose.name}</LocalLabel>
              </div>
              <div class={style.active}>
                <Switch
                  isSelected={purposeIsActive}
                  onClick={this.handleSelectPurpose}
                />
              </div>
            </div>

            <div class={style.body}>
              <LocalLabel localizeKey={`${currentPurposeLocalizePrefix}.description`} />
              <div class={style.showVendors}>
                <a onClick={this.handleShowVendors}>
                  {showVendors &&
                  <LocalLabel localizeKey={`${currentPurposeLocalizePrefix}.hideVendors`}>Hide Companies</LocalLabel>
                  }
                  {!showVendors &&
                  <LocalLabel localizeKey={`${currentPurposeLocalizePrefix}.showVendors`}>Show Companies</LocalLabel>
                  }
                </a>
              </div>
              {showVendors &&
              <div class={style.vendor}>
                <Vendors
                  purposeId={selectedPurposeId}
                  selectedPurposeIds={selectedPurposeIds}
                  enableEdit={false}
                  vendors={purposeVendors}
                  selectVendor={selectVendor}
                  selectedVendorIds={selectedVendorIds}
                />
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
