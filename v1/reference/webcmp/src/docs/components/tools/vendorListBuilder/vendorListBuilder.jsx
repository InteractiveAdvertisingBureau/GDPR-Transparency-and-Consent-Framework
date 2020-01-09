import { h, Component } from 'preact';
import style from './vendorListBuilder.less';
import Switch from '../../../../components/switch/switch';

const PRIMARY_COLOR = '#2abbb0';
const GLOBAL_LIST_LOCATION = 'https://vendorlist.consensu.org/vendorlist.json';

export default class VendorListBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			isError: false
		};
	}

	fetchGlobalVendorList = () => {
		fetch(GLOBAL_LIST_LOCATION)
			.then(res => res.json())
			.then(list => {
				const {vendorListVersion, lastUpdated, vendors, purposes} = list;
				this.setState({
					vendorList: list,
					vendorListVersion,
					lastUpdated,
					vendors,
					purposes,
					selectedPurposeIds: new Set(purposes.map(({id}) => id)),
					selectedVendorIds: new Set(vendors.map(({id}) => id)),
					isLoading: false,
					isError: false
				});
			})
			.catch(() => {
				this.setState({
					isLoading: false,
					isError: true
				});
			});
	};

	handleSelectPurpose = id => {
		return event => {
			const {selectedPurposeIds} = this.state;
			if (selectedPurposeIds.has(id)) {
				selectedPurposeIds.delete(id);
			}
			else {
				selectedPurposeIds.add(id);
			}
			this.setState({selectedPurposeIds});
		};
	};
	handleSelectAllPurposes = all => {
		return event => {
			const {purposes} = this.state;
			if (all) {
				this.setState({selectedPurposeIds: new Set(purposes.map(({id}) => id))});
			}
			else {
				this.setState({selectedPurposeIds: new Set()});
			}
		};
	};

	handleSelectVendor = id => {
		return event => {
			const {selectedVendorIds} = this.state;
			if (selectedVendorIds.has(id)) {
				selectedVendorIds.delete(id);
			}
			else {
				selectedVendorIds.add(id);
			}
			this.setState({selectedVendorIds});
		};
	};
	handleSelectAllVendors = all => {
		return event => {
			const {vendors} = this.state;
			if (all) {
				this.setState({selectedVendorIds: new Set(vendors.map(({id}) => id))});
			}
			else {
				this.setState({selectedVendorIds: new Set()});
			}
		};
	};

	generateList = () => {
		const {
			vendorList,
			vendorListVersion,
			purposes,
			vendors,
			selectedPurposeIds,
			selectedVendorIds
		} = this.state;

		const json = JSON.stringify(Object.assign({}, vendorList, {
			version,
			purposes: purposes.filter(({id}) => selectedPurposeIds.has(id)),
			vendors: vendors.filter(({id}) => selectedVendorIds.has(id))
		}), null, 2);

		const dataUrl = `data:text/csv;charset=utf-8,${encodeURIComponent(json)}`;

		const downloadLink = document.createElement('a');
		downloadLink.download = 'vendorlist.json';
		downloadLink.href = dataUrl;
		downloadLink.click();
	};

	componentWillMount() {
		this.fetchGlobalVendorList();
	}

	render(props, state) {

		const {
			isLoading,
			isError,
			vendorListVersion,
			lastUpdated,
			purposes,
			vendors,
			selectedPurposeIds,
			selectedVendorIds
		} = state;

		return (
			<div class={style.vendorListBuilder}>
				{isLoading ?
					<div class={style.loader}>
						Loading Global Vendor List...
					</div> :
					<div class={style.body}>
						{isError ?
							<div class={style.error}>
								Failed loading the global vendor list from: {GLOBAL_LIST_LOCATION}
							</div> :
							<div class={style.builder}>
								<div class={style.controls}>
									<div class={style.version}>
										<span class={style.field}>Vendor List Version:</span>
										<span>{vendorListVersion}</span>
									</div>
									<div >
										<span className={style.field}>Last Updated:</span>
										<span>{lastUpdated}</span>
									</div>
									<div class={style.generate}>
										<button class={style.button} onClick={this.generateList}>Generate List</button>
									</div>
								</div>
								<div class={style.purposes}>
									<span class={style.field}>Purposes:</span>
									<table>
										<thead>
										<tr>
											<th>ID</th>
											<th>Name</th>
											<th class={style.include}>
												<a onClick={this.handleSelectAllPurposes(true)}>All</a> / <a onClick={this.handleSelectAllPurposes(false)}>None</a>
											</th>
										</tr>
										</thead>
										<tbody>
										{purposes.map(({id, name}) => (
											<tr key={id}>
												<td>{id}</td>
												<td>{name}</td>
												<td class={style.include}>
													<Switch
														color={PRIMARY_COLOR}
														isSelected={selectedPurposeIds.has(id)}
														onClick={this.handleSelectPurpose(id)}
													/>
												</td>
											</tr>
										))}
										</tbody>
									</table>
								</div>
								<div class={style.vendors}>
									<span class={style.field}>Vendors:</span>
									<table>
										<thead>
										<tr>
											<th>ID</th>
											<th>Name</th>
											<th class={style.include}>
												<a onClick={this.handleSelectAllVendors(true)}>All</a> / <a onClick={this.handleSelectAllVendors(false)}>None</a>
											</th>
										</tr>
										</thead>
										<tbody>
										{vendors.map(({id, name}) => (
											<tr key={id}>
												<td>{id}</td>
												<td>{name}</td>
												<td class={style.include}>
													<Switch
														color={PRIMARY_COLOR}
														isSelected={selectedVendorIds.has(id)}
														onClick={this.handleSelectVendor(id)}
													/>
												</td>
											</tr>
										))}
										</tbody>
									</table>
								</div>
								<div class={style.generate}>
									<button class={style.button} onClick={this.generateList}>Generate List</button>
								</div>
							</div>
						}
					</div>
				}
			</div>
		);
	}
}
