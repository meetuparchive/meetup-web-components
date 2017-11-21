import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { InfoWrapper, StoryLink } from '../utils/storyComponents';
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
			<InfoWrapper>
				<Popover
					trigger={<Button>Open</Button>}
					menuItems={[
						<StoryLink to="somepath/" onClick={logSelection}>
							First option
						</StoryLink>,
						<StoryLink to="somepath/" onClick={logSelection}>
							Second option
						</StoryLink>,
						<StoryLink to="somepath/" onClick={logSelection}>
							Third option
						</StoryLink>,
					]}
				/>
			</InfoWrapper>
		)
	)
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
					<StoryLink to="somepath/" onClick={logSelection}>
						First option
					</StoryLink>,
					<StoryLink to="somepath/" onClick={logSelection}>
						Second option
					</StoryLink>,
					<StoryLink to="somepath/" onClick={logSelection}>
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
					<StoryLink to="somepath/" onClick={logSelection}>
						First option
					</StoryLink>,
					<StoryLink to="somepath/" onClick={logSelection}>
						Second option
					</StoryLink>,
					<StoryLink to="somepath/" onClick={logSelection}>
						Third option
					</StoryLink>,
				]}
			/>
		);
	});
