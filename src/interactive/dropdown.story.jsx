import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';
import Dropdown from './Dropdown';
import Section from '../layout/Section';
import Chunk from '../layout/Chunk';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import Button from '../forms/Button';

const dropdownContent = (
	<Section className="border--none">
		<Chunk>
			<h2 className="text--big text--bold">Dropdown content</h2>
		</Chunk>
		<Chunk className="runningText">
			<p>
				This is a basic dropdown component. It accepts a `content` prop with which
				you can pass arbitrary JSX content.
			</p>
			<p>
				<a href="#">Tab-focusable links</a> should work as if they're in normal
				document flow
			</p>
		</Chunk>
	</Section>
);

/**
 * @module DropdownWithToggle
 */
class DropdownWithToggle extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			dropdownToggled: false,
		};

		this.toggleDropdown = this.toggleDropdown.bind(this);
	}

	toggleDropdown() {
		this.setState(() => ({ dropdownToggled: !this.state.dropdownToggled }));
	}

	render() {
		return (
			<Dropdown
				align="right"
				isActive={this.state.dropdownToggled}
				manualToggle={this.toggleDropdown}
				trigger={<Button small>Open</Button>}
				content={
					<div>
						<Section>
							<Chunk>
								<h2 className="text--big text--bold">Dropdown content</h2>
							</Chunk>
							<Chunk className="runningText">
								<p>
									This dropdown handles its own toggling in a function
									called toggleDropdown.
								</p>
							</Chunk>
							<Chunk>
								<Button onClick={this.toggleDropdown}>
									Toggle dropdown
								</Button>
							</Chunk>
						</Section>
					</div>
				}
			/>
		);
	}
}

storiesOf('Interactive/Dropdown', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.add(
		'Basic Dropdown component',
		() => (
			<Dropdown
				align="right"
				trigger={<Button small>Open</Button>}
				content={dropdownContent}
			/>
		),
		{ info: { text: 'Aligned right by default' } }
	)
	.add(
		'Dropdown component (no Portal)',
		() => (
			<Dropdown
				align="right"
				noPortal
				trigger={<Button small>Open</Button>}
				content={dropdownContent}
			/>
		),
		{
			info: {
				text:
					'Use the `noPortal` prop to decide whether a the content should render in document body',
			},
		}
	)
	.add(
		'Left aligned dropdown',
		() => (
			<Dropdown
				align="left"
				trigger={<Button small>Open</Button>}
				content={dropdownContent}
			/>
		),
		{ info: { text: 'Use the `align` prop to change alignment to left' } }
	)
	.add(
		'Center aligned dropdown',
		() => (
			<Dropdown
				align="center"
				trigger={<Button small>Open</Button>}
				content={dropdownContent}
			/>
		),
		{ info: { text: 'Use the `align` prop to change alignment to center' } }
	)
	.add(
		'Dropdown above trigger',
		() => (
			<Dropdown
				direction="top"
				align="right"
				trigger={<Button small>Open</Button>}
				content={dropdownContent}
			/>
		),
		{ info: { text: 'Aligned right and appearing above the trigger' } }
	)
	.add(
		'Dropdown with offset',
		() => (
			<Dropdown
				align="right"
				offset={{ top: 8, left: 16 }}
				trigger={<Button small>Open</Button>}
				content={
					<div className="runningText padding--all">
						<p>
							This dropdown component is offset 16px from the left and 8px
							from the top
						</p>
					</div>
				}
			/>
		),
		{
			info: {
				text: 'Using an offset to fine-tune the popup alignment to the trigger',
			},
		}
	)
	.add(
		'With menu items',
		() => (
			<Dropdown
				align="center"
				minWidth="160px"
				maxWidth="250px"
				trigger={<Button small>Open</Button>}
				onSelect={(selectedItem, stateAndHelpers) => selectedItem.props.onClick()}
				menuItems={[
					<div onClick={action('item one click')}>
						Item one has text that is really long and should wrap once we
						reach max width
					</div>,
					<div onClick={action('item two click')}>Item two</div>,
					<div onClick={action('item three click')}>Item three</div>,
				]}
				noPortal // to test text-wrapping
			/>
		),
		{ info: { text: 'Use the `menuItems` prop to render a menu' } }
	)
	.add('with custom toggle functionality', () => (
		<Flex justify="flexEnd">
			<FlexItem shrink>
				<DropdownWithToggle />
			</FlexItem>
		</Flex>
	))
	.add(
		'Overflowing viewport',
		() => (
			<div
				style={{
					textAlign: 'left',
					width: '100vw',
				}}
			>
				<Dropdown
					align="right"
					trigger={<Button small>Open</Button>}
					content={
						<div className="runningText padding--all">
							<p>
								This Dropdown component's `align` prop is set to 'right',
								but because it would overflow the viewport, it gets
								switched to 'left'
							</p>
						</div>
					}
				/>
			</div>
		),
		{ info: { text: 'Aligned right by default, but switches to left' } }
	);
