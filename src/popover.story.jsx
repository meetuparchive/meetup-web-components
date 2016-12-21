import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Popover from './Popover';
import PopoverTrigger from './PopoverTrigger';
import PopoverMenu from './PopoverMenu';
import PopoverMenuItem from './PopoverMenuItem';

storiesOf('Popover')
	.add('Popover', () => (
		<div className='hasJS'>
			<Popover>
				<PopoverTrigger>Trigger</PopoverTrigger>
				<PopoverMenu>
					<PopoverMenuItem>One</PopoverMenuItem>
					<PopoverMenuItem>Two</PopoverMenuItem>
					<PopoverMenuItem>Three</PopoverMenuItem>
				</PopoverMenu>
			</Popover>
		</div>
	));

