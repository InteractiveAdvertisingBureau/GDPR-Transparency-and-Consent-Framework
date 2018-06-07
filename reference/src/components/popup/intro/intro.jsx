import { h, Component } from 'preact';
import style from './intro.less';
import Button from '../../button/button';
import Label from '../../label/label';
import CloseButton from '../../closebutton/closebutton';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'intro'
	};
}

const HOST_PARTS = ((window && window.location && window.location.hostname) || '').split('.');

export default class Intro extends Component {

	static defaultProps = {};

	render(props, state) {

		const {
			onAcceptAll,
			onShowPurposes,
			onClose
		} = props;

		return (
			<div class={style.intro}>
				<CloseButton
					class={style.close}
					onClick={onClose}
				/>
				<div class={style.title}>
					<LocalLabel localizeKey='title'>A privacy reminder</LocalLabel>
				</div>
				<div class={style.introWrap}>
					<div class={style.description}>
						<LocalLabel localizeKey='description'>
							We use your data to help bring you personalised content, relevant ads, social media features, and to better understand how you use our website. To do this, we sometimes share this data with social media, advertising, and analytics partners, who may in turn combine it with other data you've given them. Visit our Privacy Policy for more information on our data collection practices.
						</LocalLabel>
					</div>
					<div class={style.acceptBtnWrap}>
						<Button
							class={style.acceptAll}
							onClick={onAcceptAll}
						>
							<LocalLabel localizeKey='acceptAll'>Accept</LocalLabel>
						</Button>
					</div>
				</div>
				<div class={style.option}>
					<span
						class={style.rejectAll}
						onClick={onShowPurposes}
					>
						<LocalLabel localizeKey='showPurposes'>Settings</LocalLabel>
					</span>
				</div>
			</div>
		);
	}
}
