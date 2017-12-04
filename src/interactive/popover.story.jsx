import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { StoryLink } from '../utils/storyComponents';
import { decorateWithInfo } from '../utils/decorators';
import Popover from './Popover';
import Button from '../forms/Button';

const logSelection = e => {
	action(`Selected option ${e.target}`);
};

storiesOf('Popover', module)
	.addWithInfo(
		'default - Button trigger with Link menu items',
		'This is the basic usage with the component. ',
		() => (
			<Popover
				trigger={<Button>Open</Button>}
				menuItems={[
					<StoryLink onClick={logSelection}>
						First option
					</StoryLink>,
					<StoryLink onClick={logSelection}>
						Second option
					</StoryLink>,
					<StoryLink onClick={logSelection}>
						Third option
					</StoryLink>,
				]}
			/>
		)
	)
	.addDecorator(decorateWithInfo)
	.add('DIV trigger with SPAN menu items', () => {
		return (
			<Popover
				trigger={<div>Open</div>}
				menuItems={[
					<span className="first-option" onClick={logSelection}>
						First option
					</span>,
					<span className="second-option" onClick={logSelection}>
						Second option is super duper long
					</span>,
					<span className="third-option" onClick={logSelection}>
						Third option
					</span>,
				]}
			/>
		);
	})
	.add('Left aligned menu items', () => {
		return (
			<Popover
				trigger={<Button>Open</Button>}
				align="left"
				menuItems={[
					<StoryLink onClick={logSelection}>
						First option
					</StoryLink>,
					<StoryLink onClick={logSelection}>
						Second option
					</StoryLink>,
					<StoryLink onClick={logSelection}>
						Third option
					</StoryLink>,
				]}
			/>
		);
	})
	.add('Right aligned menu items', () => {
		return (
			<Popover
				trigger={<Button>Open</Button>}
				align="right"
				menuItems={[
					<StoryLink onClick={logSelection}>
						First option
					</StoryLink>,
					<StoryLink onClick={logSelection}>
						Second option
					</StoryLink>,
					<StoryLink onClick={logSelection}>
						Third option
					</StoryLink>,
				]}
			/>
		);
	});
