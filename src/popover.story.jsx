import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { decorateWithLocale } from './utils/decorators';
import Popover from './Popover';
import PopoverOption from './PopoverOption';

const logSelection = e => {
	action(`Selected option ${e.target}`);
};

storiesOf('MenuButton', module)
	.addDecorator(decorateWithLocale)
	.add('default', () => {
		return (
			<Popover
				trigger={<Button>Open</Button>}
				options={[
					<PopoverOption to='somepath/' onClick={logSelection}>First option</MenuButtonOption>,
					<PopoverOption to='somepath/' onClick={logSelection}>Second option</MenuButtonOption>,
					<PopoverOption to='somepath/' onClick={logSelection}>Third option</MenuButtonOption>,
				]}
			/>
		);
	});
