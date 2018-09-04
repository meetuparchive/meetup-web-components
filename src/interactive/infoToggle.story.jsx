import React from 'react';
import { storiesOf } from '@storybook/react';
import { decorateWithBasics } from '../utils/decorators';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import InfoToggle from './InfoToggle';

class ManualInfoToggle extends React.PureComponent {
	state = {
		tooltipOpen: false,
	};

	toggleTooltip = () => {
		this.setState(prevState => ({ tooltipOpen: !prevState.tooltipOpen }));
	};

	closeTooltip = () => {
		this.setState(() => ({ tooltipOpen: false }));
	};

	render() {
		return (
			<InfoToggle
				label="label"
				tooltipId="info-tooltip"
				tooltipContent={
					<div className="runningText padding--all">
						<p>
							This is a tooltip is being passed props that adjust the
							alignment of the popup bubble to point to the trigger.
						</p>
					</div>
				}
				onClick={this.toggleTooltip}
				tooltipProps={{
					align: 'right',
					withClose: true,
					manualToggle: true,
					isActive: this.state.tooltipOpen,
					onClose: this.closeTooltip,
				}}
			/>
		);
	}
}

storiesOf('Interactive/InfoToggle', module)
	.addDecorator(withKnobs)
	.addDecorator(decorateWithBasics)
	.addDecorator(withInfo)
	.add('default', () => {
		const defaultContent = (
			<div className="runningText padding--all">
				<p>
					{text(
						'content',
						`This is a basic tooltip component. It accepts a content prop with which you can pass arbitrary JSX content.`
					)}
				</p>
				<p>
					<a href="#">Tab-focusable links</a> should work as if they're in
					normal document flow
				</p>
			</div>
		);

		return (
			<InfoToggle
				label={text('label', 'Get Info')}
				tooltipId={text('tooltipId', 'toolTipId')}
				tooltipContent={defaultContent}
				tooltipProps={object('tooltipProps', {})}
				onClick={action('Info Toggle Click (optional)')}
			/>
		);
	})
	.add('with tooltipProps', () => (
		<InfoToggle
			label="`align` prop passed"
			tooltipId="testTooltip"
			tooltipContent={
				<div className="runningText padding--all">
					<p>
						This is a tooltip is being passed props that adjust the alignment
						of the popup bubble to point to the trigger.
					</p>
				</div>
			}
			tooltipProps={{ align: select('align', ['left', 'right', 'center'], 'left') }}
		/>
	))
	.add('with manualToggle', () => <ManualInfoToggle />);
