import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { InfoWrapper } from '../utils/storyComponents';
import { decorateWithLocale } from '../utils/decorators';
import Dropdown from './Dropdown';
import Section from '../layout/Section';
import Chunk from '../layout/Chunk';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import Button from '../forms/Button';

const dropdownContent = (
	<Section className='border--none'>
		<Chunk>
			<h2 className='text--big text--bold'>Dropdown content</h2>
		</Chunk>
		<Chunk className='runningText'>
			<p>
				This is a basic dropdown component.
				It accepts a `content` prop with which you
				can pass arbitrary JSX content.
			</p>
			<p>
				<a href='#'>Tab-focusable links</a> should
				work as if they're in normal document flow
			</p>
		</Chunk>
	</Section>
);

storiesOf('Dropdown', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'Basic Dropdown component',
		'Aligned right by default',
		() => (
			<InfoWrapper>
				<Flex justify='flexEnd'>
					<FlexItem shrink>
						<Dropdown
							align='right'
							trigger={
								<Button small>Open</Button>
							}
							content={dropdownContent}
						/>
					</FlexItem>
				</Flex>
			</InfoWrapper>
		)
	)
	.addWithInfo(
		'Left aligned dropdown',
		'Use the `align` prop to change alignment to left',
		() => (
			<InfoWrapper>
				<Dropdown
					align='left'
					trigger={
						<Button small>Open</Button>
					}
					content={dropdownContent}
				/>
			</InfoWrapper>
		)
	);
