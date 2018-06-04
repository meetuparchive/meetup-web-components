import React from 'react';
import { storiesOf } from '@storybook/react';
import { decorateWithBasics } from '../utils/decorators';

import InfoToggle from './InfoToggle';

storiesOf('InfoToggle', module)
	.addDecorator(decorateWithBasics)
	.addWithInfo('default', () => (
		<InfoToggle
			label="Get info"
			tooltipId="testTooltip"
			tooltipContent={
				<div className="runningText padding--all">
					<p>
						This is a basic tooltip component. It accepts a `content` prop with
						which you can pass arbitrary JSX content.
					</p>
					<p>
						<a href="#">Tab-focusable links</a> should work as if they're in
						normal document flow
					</p>
				</div>
			}
		/>
	))
	.addWithInfo('with tooltipProps', () => (
		<InfoToggle
			label="`align` prop passed"
			tooltipId="testTooltip"
			tooltipContent={
				<div className="runningText padding--all">
					<p>
						This is a tooltip is being passed props that adjust the alignment of
						the popup bubble to point to the trigger.
					</p>
				</div>
			}
			tooltipProps={{ align: 'center' }}
		/>
	));
