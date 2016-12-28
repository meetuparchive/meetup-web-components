import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Popover from './Popover';
import PopoverTrigger from './PopoverTrigger';
import PopoverMenu from './PopoverMenu';
import PopoverMenuItem from './PopoverMenuItem';

const logSelection = e => {
	action(`Selected option ${e.target}`);
};

storiesOf('Popover')
	.add('Popover', () => (
		<div className='hasJS'>
			<Popover>
				<PopoverTrigger>Trigger</PopoverTrigger>
				<PopoverMenu>
					<PopoverMenuItem onClick={logSelection}>One</PopoverMenuItem>
					<PopoverMenuItem onClick={logSelection}>Two</PopoverMenuItem>
					<PopoverMenuItem onClick={logSelection}>Three</PopoverMenuItem>
				</PopoverMenu>
			</Popover>
		</div>
	));

