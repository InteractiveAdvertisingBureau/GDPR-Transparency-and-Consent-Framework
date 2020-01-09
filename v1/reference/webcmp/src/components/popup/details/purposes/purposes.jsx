import { h, Component } from 'preact';
import style from './purposes.less';
import Switch from '../../../switch/switch';
import Label from "../../../label/label";

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'purposes'
	};
}

export default class Purposes extends Component {
	state = {
		selectedPurposeIndex: 0
	};

	static defaultProps = {
		onShowVendors: () => {},
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

	handleSelectPurpose = ({isSelected}) => {
		const {selectedPurposeIndex} = this.state;
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


	render(props, state) {

		const {
			onShowVendors,
			purposes,
			customPurposes,
			selectedPurposeIds,
			selectedCustomPurposeIds
		} = props;

		const {selectedPurposeIndex} = state;

		const allPurposes = [...purposes, ...customPurposes];
		const selectedPurpose = allPurposes[selectedPurposeIndex];
		const selectedPurposeId = selectedPurpose && selectedPurpose.id;
		const purposeIsActive = selectedPurposeIndex < purposes.length ?
			selectedPurposeIds.has(selectedPurposeId) :
			selectedCustomPurposeIds.has(selectedPurposeId);
		const currentPurposeLocalizePrefix = `${selectedPurposeIndex >= purposes.length ? 'customPurpose' : 'purpose'}${selectedPurposeId}`;

		return (
			<div class={style.purposes}>
				<div class={style.purposeList}>
					{allPurposes.map((purpose, index) => (
						<div class={[style.purposeItem, selectedPurposeIndex === index ? style.selectedPurpose : ''].join(' ')}
							 onClick={this.handleSelectPurposeDetail(index)}
						>
							<LocalLabel localizeKey={`${index >= purposes.length ? 'customPurpose' : 'purpose'}${purpose.id}.menu`}>{purpose.name}</LocalLabel>
						</div>
					))}
				</div>
				{selectedPurpose &&
				<div class={style.purposeDescription}>
					<div class={style.purposeDetail}>
						<div class={style.detailHeader}>
							<div class={style.title}>
								<LocalLabel localizeKey={`${currentPurposeLocalizePrefix}.title`}>{selectedPurpose.name}</LocalLabel>
							</div>
							<div class={style.active}>
								<LocalLabel localizeKey={purposeIsActive ? 'active' : 'inactive'}>{purposeIsActive ? 'Active' : 'Inactive'}</LocalLabel>
								<Switch
									isSelected={purposeIsActive}
									onClick={this.handleSelectPurpose}
								/>
							</div>
						</div>
						<div class={style.body}>
							<LocalLabel localizeKey={`${currentPurposeLocalizePrefix}.description`} />
							<a class={style.vendorLink} onClick={onShowVendors}><LocalLabel localizeKey='showVendors'>Show full vendor list</LocalLabel></a>
						</div>
					</div>
				</div>
				}
			</div>
		);
	}
}
