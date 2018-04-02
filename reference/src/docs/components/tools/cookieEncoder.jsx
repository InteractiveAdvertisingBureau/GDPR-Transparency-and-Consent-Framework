import { h, Component } from 'preact';
import * as _ from 'lodash';
import classnames from 'classnames';
import style from './coder.less';
import Checkbox from '../checkbox/checkbox';
import {
	encodeField,
	encodeDataToBits,
	encodeCookieValue
} from '../../../lib/cookie/cookieutils';


export default class CookieEncoder extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedCookieVersion: 1
		};
		this.initVersion();
	}

	initVersion = () => {
		const { versionMap } = this.props;
		const { selectedCookieVersion } = this.state;
		const fieldDefinitions = versionMap[selectedCookieVersion].fields;

		// Add some default values
		const decodedObject = {};
		fieldDefinitions.map(field => this.setDefaultValues(decodedObject, field));

		this.setState({ decodedObject });
	};

	setDefaultValues = (decodedObject, { name, type, fields }) => {
		switch (type) {
			case 'bool':
				decodedObject[name] = false;
				break;
			case 'int':
				decodedObject[name] = 1;
				break;
			case 'date':
				decodedObject[name] = new Date();
				break;
			case 'list':
				decodedObject[name] = [];
				fields.map(listField => this.setDefaultValues(decodedObject[name], listField));
				break;
		}
	};

	handleInputChanged = (field, objectPath) => {
		return (e) => {
			const { name, type } = field;
			const text = e.target.value;
			const decodedObject = {
				...this.state.decodedObject
			};
			const propertyPath = _.filter([objectPath, name]).join('.');
			_.set(decodedObject, propertyPath, _.get(decodedObject, propertyPath, ''));

			switch (type) {
				case 'bool': {
					_.set(decodedObject, propertyPath, e.target.checked);
					break;
				}
				case 'int': {
					const parsedInt = parseInt(text, 10);
					if (!isNaN(parsedInt)) {
						_.set(decodedObject, propertyPath, parsedInt);
					}
					break;
				}
				case 'date': {
					const parsedDate = new Date(text);
					if (parsedDate) {
						_.set(decodedObject, propertyPath, parsedDate);
					}
					break;
				}
				case 'bits': {
					if (text.match(/^[01]+$/)) {
						_.set(decodedObject, propertyPath, text);
					}
					break;
				}
			}

			this.setState({
				decodedObject
			});
		};
	};

	handleCookieVersionChange = (field) => {
		return (event) => {
			const cookieVersion = event.target.value;
			this.setState({
				selectedCookieVersion: cookieVersion,
			});
			this.initVersion();
			this.handleInputChanged(field)(event);
		};
	};

	lookupFieldObject = (field, objectPath) => {
		const { decodedObject } = this.state;
		let fieldObject = decodedObject;
		if (!_.isNil(objectPath)) {
			fieldObject = _.get(decodedObject, objectPath);
			if (_.isNil(fieldObject)) {
				fieldObject = {};
				_.set(decodedObject, objectPath, fieldObject);
			}
		}
		return fieldObject;
	};

	renderInput = (field, objectPath) => {
		const {versionMap} = this.props;
		const { name, type, validator } = field;
		const { decodedObject } = this.state;
		const propertyPath = _.filter([objectPath, name]).join('.');
		const fieldObject = this.lookupFieldObject(field, objectPath);
		const isDisabled = validator && !validator(fieldObject);

		// Special case for 'cookieVersion' which needs to be of a defined version
		if (name === 'cookieVersion') {
			return (
				<select onChange={this.handleCookieVersionChange(field)}>
					{Object.keys(versionMap).map(version => (
						<option>{version}</option>
					))}
				</select>
			);
		}

		// Render generic fields as correct inputs
		switch (type) {
			case 'bool':
				return <Checkbox
					isDisabled={isDisabled}
					onChange={this.handleInputChanged(field, objectPath)}
					isSelected={_.get(decodedObject, propertyPath, false)}
				/>;
			case 'int':
			case 'bits':
				return <input
					disabled={isDisabled}
					onKeyUp={this.handleInputChanged(field, objectPath)}
					value={_.get(decodedObject, propertyPath, '')}
				/>;
			case 'date':
				return <input
					disabled={isDisabled}
					onChange={this.handleInputChanged(field, objectPath)}
					value={_.get(decodedObject, propertyPath, '')}
				/>;
			default:
				return '';
		}
	};

	getBitCount = ({ numBits }) => {
		const { decodedObject } = this.state;
		if (typeof numBits === 'function') {
			return numBits(decodedObject);
		}
		if (typeof numBits === 'number') {
			return numBits;
		}
		return '(variable)';
	};

	renderInputRow = (field, objectPath) => {
		const { name, type, validator } = field;
		const fieldObject = this.lookupFieldObject(field, objectPath);
		const isDisabled = validator && !validator(fieldObject);
		const indent = (objectPath || '').split('.').length * 15;

		return (
			<tr className={classnames({ [style.isDisabled]: isDisabled })}>
				<td style={{ paddingLeft: `${indent}px` }}>{name}</td>
				<td>{type}</td>
				<td>{this.getBitCount(field)}</td>
				<td>{this.renderInput(field, objectPath)}</td>
				<td className={style.encodedValue}>{type !== 'list' ? encodeField({
					input: fieldObject,
					field
				}) : ''}</td>
			</tr>
		);
	};

	renderFieldInputs = (fields, objectPath) => {
		return (
			<table>
				<thead>
				<tr>
					<th>Field</th>
					<th>Type</th>
					<th>Number Bits</th>
					<th>Value</th>
					<th>Binary</th>
				</tr>
				</thead>
				<tbody>
				{fields.reduce((rows, field) => {
					const fieldObject = this.lookupFieldObject(field, objectPath);
					rows.push(this.renderInputRow(field, objectPath));
					if (field.type === 'list') {
						const { name, listCount, validator } = field;
						if (!validator || validator(fieldObject)) {
							const listEntryCount = typeof listCount === 'function' ?
								listCount(fieldObject) : typeof listCount === 'number' ? listCount : 0;

							for (let i = 0; i < listEntryCount; i++) {
								_.forEach(field.fields, f => {
									rows.push(this.renderInputRow(f, _.filter([objectPath, name, `[${i}]`]).join('.')));
								});
							}
						}
					}
					return rows;
				}, [])}
				</tbody>
			</table>
		);
	};

	render(props, state) {
		const { title, versionMap } = props;
		const { decodedObject, selectedCookieVersion } = state;
		const fieldDefinitions = versionMap[selectedCookieVersion].fields;
		const bitString = encodeDataToBits(decodedObject, versionMap);
		const b64String = encodeCookieValue(decodedObject, versionMap);

		return (
			<div className={style.cookieEncoder}>
				<span className={style.sectionTitle}>{title}</span>
				{this.renderFieldInputs(fieldDefinitions)}
				<span className={style.sectionTitle}>Binary Cookie Value</span>
				<div className={classnames(style.encodedValue, style.cookieValue)}>{bitString}</div>
				<span className={style.sectionTitle}>Base64 Encoded Cookie Value</span>
				<div className={classnames(style.encodedValue, style.cookieValue)}>{b64String}</div>
			</div>
		);
	}
}
