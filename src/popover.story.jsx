import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Popover from './Popover';
import PopoverTrigger from './PopoverTrigger';
import PopoverMenu from './PopoverMenu';

storiesOf('placeholder')
	.add('Popover, active', () => (
		<div className='hasJS'>
			<Popover>
				<PopoverTrigger>Trigger</PopoverTrigger>
				<PopoverMenu />
			</Popover>
		</div>
	));

