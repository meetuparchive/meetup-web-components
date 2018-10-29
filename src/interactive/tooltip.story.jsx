import React from 'react';
import { storiesOf } from '@storybook/react';
import Tooltip from './Tooltip';
import Button from '../forms/Button';
import { withKnobs, text, object, select, boolean } from '@storybook/addon-knobs';
import { decorateWithBasics } from '../utils/decorators';
import { withInfo } from '@storybook/addon-info';

const dropdownContent = (
	<div className="runningText padding--all">
		<p>
			This is a basic tooltip component. It accepts a `content` prop with which you
			can pass arbitrary JSX content.
		</p>
		<p>
			<a href="#">Tab-focusable links</a> should work as if they're in normal
			document flow
		</p>
	</div>
);

const align = (alignment = 'right') =>
	select('align', ['left', 'center', 'right'], alignment);

/**
 * @module ManualToggleDropdown
 */
class ManualToggleDropdown extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			tooltipOpen: true,
		};

		this.toggleDropdown = this.toggleDropdown.bind(this);
	}

	toggleDropdown() {
		this.setState(() => ({ tooltipOpen: !this.state.tooltipOpen }));
	}

	closeDropdown = () => {
		this.setState(() => ({ tooltipOpen: false }));
	};

	render() {
		return (
			<Tooltip
				manualToggle
				isActive={this.state.tooltipOpen}
				align={align()}
				id={text('tooltipId', 'testTooltip')}
				trigger={
					<Button onClick={this.toggleDropdown} small>
						Click to toggle
					</Button>
				}
				content={dropdownContent}
				withClose={boolean('withClose', true)}
				onClose={this.closeDropdown}
			/>
		);
	}
}

storiesOf('Interactive/Tooltip', module)
	.addDecorator(withKnobs)
	.addDecorator(decorateWithBasics)
	.addDecorator(withInfo)
	.add(
		'Basic Tooltip component',
		() => (
			<div
				style={{
					marginTop: '800px',
					width: '500px',
					height: '1000px',
					marginLeft: '600px',
				}}
			>
				<Tooltip
					align={align()}
					id={text('tooltipId', 'testTooltip')}
					trigger={<Button small>Open</Button>}
				>
					{dropdownContent}
				</Tooltip>
			</div>
		),
		{ info: { text: 'Aligned right by default' } }
	)
	.add(
		'Tooltip above trigger',
		() => (
			<div style={{ textAlign: 'center' }}>
				<Tooltip
					direction={text('direction', 'top')}
					align={align()}
					id={text('tooltipId', 'testTooltip')}
					trigger={<Button small>Open</Button>}
					content={dropdownContent}
				/>
			</div>
		),
		{ info: { text: 'Aligned right and appearing above the trigger' } }
	)
	.add(
		'Opened Tooltip component',
		() => (
			<div style={{ textAlign: 'center' }}>
				<Tooltip
					isActive
					align={align()}
					id={text('tooltipId', 'testTooltip')}
					trigger={<Button small>Open</Button>}
					content={dropdownContent}
				/>
			</div>
		),
		{ info: { text: 'Aligned center and opened by default' } }
	)
	.add(
		'Tooltip component (no Portal)',
		() => (
			<div style={{ textAlign: 'center' }}>
				<Tooltip
					noPortal={boolean('noPortal', true)}
					align={align()}
					id={text('tooltipId', 'testTooltip')}
					trigger={<Button small>Open</Button>}
					content={dropdownContent}
				/>
			</div>
		),
		{
			info: {
				text:
					'Use the `noPortal` prop to decide whether a the content should render in document body',
			},
		}
	)
	.add(
		'Left aligned tooltip',
		() => (
			<div style={{ textAlign: 'center' }}>
				<Tooltip
					align={align('left')}
					id={text('tooltipId', 'testTooltip')}
					trigger={<Button small>Open</Button>}
					content={dropdownContent}
				/>
			</div>
		),
		{ info: { text: 'Use the `align` prop to change alignment to left' } }
	)
	.add(
		'Center aligned tooltip',
		() => (
			<div style={{ textAlign: 'center' }}>
				<Tooltip
					align={align('center')}
					id={text('tooltipId', 'testTooltip')}
					trigger={<Button small>Open</Button>}
					content={dropdownContent}
				/>
			</div>
		),
		{ info: { text: 'Use the `align` prop to change alignment to center' } }
	)
	.add(
		'Tooltip with offset',
		() => (
			<div style={{ textAlign: 'center' }}>
				<Tooltip
					isActive
					offset={object('offset', { top: 8, left: 16 })}
					align={align()}
					id={text('tooltipId', 'testTooltip')}
					trigger={<Button small>Open</Button>}
					content={
						<div className="runningText padding--all">
							<p>
								This tooltip component is offset 16px from the left and
								8px from the top
							</p>
						</div>
					}
				/>
			</div>
		),
		{
			info: {
				text: 'Using an offset to fine-tune the popup alignment to the trigger',
			},
		}
	)
	.add(
		'Tooltip with close button',
		() => (
			<div style={{ textAlign: 'center' }}>
				<Tooltip
					isActive
					withClose={boolean('withClose', true)}
					align={align('center')}
					id={text('tooltipId', 'testTooltip')}
					trigger={<Button small>Open</Button>}
					content={dropdownContent}
				/>
			</div>
		),
		{ info: { text: "Provides it's own close button" } }
	)
	.add('manualToggle', () => <ManualToggleDropdown />, {
		info: { text: 'rely on the `isActive` prop to open and close the tooltip' },
	})
	.add(
		'Overflowing viewport',
		() => (
			<div style={{ textAlign: 'left', width: '100vw' }}>
				<Tooltip
					isActive
					align={align()}
					id={text('tooltipId', 'testTooltip')}
					trigger={<Button small>Open</Button>}
					content={
						<div className="runningText padding--all">
							<p>
								This Tooltip component's `align` prop is set to 'right',
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
