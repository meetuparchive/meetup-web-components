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
	<Section noSeparator>
		<Chunk>
			<h2 className='text--big text--bold'>Dropdown content</h2>
		</Chunk>
		<Chunk>
			<p>
				This is a basic dropdown component.
				It accepts a `content` prop with which you
				can pass arbitrary JSX content.
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
