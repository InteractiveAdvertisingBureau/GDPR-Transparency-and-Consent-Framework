import { h, Component } from 'preact';
import style from './popup.less';
import Intro from './intro/intro';
import Details from './details/details';
import Panel from '../panel/panel';
import event_logger from '../../lib/event_logger'


const SECTION_INTRO = 0;
const SECTION_DETAILS = 1;

export default class Popup extends Component {
  state = {
    selectedPanelIndex: SECTION_INTRO
  };

  onAcceptAll = () => {
    event_logger("cmp_accepted_all");
    const { store, onSave } = this.props;
    store.selectAllVendors(true);
    store.selectAllPurposes(true);
    store.selectAllCustomPurposes(true);
    onSave();
  };

  onRejectAll = () => {
    event_logger("cmp_rejected_all");
    const { store, onSave } = this.props;
    store.selectAllVendors(false);
    store.selectAllPurposes(false);
    store.selectAllCustomPurposes(false);
    onSave();
  };

  handleClose = () => {
    const {store} = this.props;
    store.toggleFooterShowing(true);
  }

  onCancel = () => {
    this.setState({
      selectedPanelIndex: SECTION_INTRO
    });
  };

  handleShowDetails = () => {
    event_logger("cmp_customize_purposes");
    this.setState({
      selectedPanelIndex: SECTION_DETAILS
    });
  };

  render(props, state) {
    const { store, onShowPurposes } = props;
    const { selectedPanelIndex } = state;
    var { isConsentToolShowing, publisherName } = store;

    return (
      <div
        class={style.popup}
        style={{ display: isConsentToolShowing ? 'flex' : 'none' }}
      >
        <div
          class={style.overlay}
          onClick={this.handleClose}
        />
        <div class={style.content}>
          <Panel selectedIndex={selectedPanelIndex}>
            <Intro
              publisherName={publisherName}
              onAcceptAll={this.onAcceptAll}
              onShowPurposes={this.handleShowDetails}
              onRejectAll={this.onRejectAll}
            />
            <Details
              onSave={this.props.onSave}
              onCancel={this.onCancel}
              store={this.props.store}
              onRejectAll={this.onRejectAll} />
          </Panel>
        </div>
      </div>
    );
  }
}
