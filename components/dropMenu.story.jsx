
import React from 'react';
import { DropMenu, DropMenuTrigger, DropMenuOptions, DropMenuOption } from './DropMenu';
import { storiesOf } from '@kadira/storybook';

storiesOf('DropMenu', module)
	.add('Default', () => (
	<DropMenu>
		<DropMenuTrigger tabIndex={0}>Trigger dropdown</DropMenuTrigger>
		<DropMenuOptions>
			<DropMenuOption>
				Option One
			</DropMenuOption>
			<DropMenuOption>
				Option Two
			</DropMenuOption>
			<DropMenuOption>
				Option Three
			</DropMenuOption>
		</DropMenuOptions>
	</DropMenu>
	));
