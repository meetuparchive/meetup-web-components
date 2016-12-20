import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Button from './Button';

storiesOf('placeholder')
	.add('Simple', () => (
		<Button onClick={action('clicked')}>Button Label</Button>
	))
	.add('Popover, active', () => (
		<Popover isActive>
			<PopoverTrigger>Trigger</PopoverTrigger>
			<PopoverMenu>
				<PopoverMenuOption>Option one</PopoverMenuOption>
				<PopoverMenuOption>Option two</PopoverMenuOption>
				<PopoverMenuOption>Option three</PopoverMenuOption>
			</PopoverMenu>
		</Popover>
	));

