import React from "react";
import { storiesOf } from '@storybook/react';
import Tooltip from "./Tooltip";
import Button from "../forms/Button";

const dropdownContent = (
	<div className="runningText padding--all">
		<p>
			This is a basic tooltip component. It accepts a `content` prop with
			which you can pass arbitrary JSX content.
		</p>
		<p>
			<a href="#">Tab-focusable links</a> should work as if they're in normal
			document flow
		</p>
	</div>
);

/**
 * @module ManualToggleDropdown
 */
class ManualToggleDropdown extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			tooltipOpen: true
		};

		this.toggleDropdown = this.toggleDropdown.bind(this);
	}

	toggleDropdown() {
		this.setState(() => ({ tooltipOpen: !this.state.tooltipOpen }));
	}

	render() {

		return (
			<Tooltip
				manualToggle
				isActive={this.state.tooltipOpen}
				minWidth="0"
				maxWidth="384px"
				align="right"
				id="testTooltip"
				trigger={<Button onClick={this.toggleDropdown} small>Click to toggle</Button>}
				content={dropdownContent}
			/>
		);
	}
}

storiesOf("Tooltip", module)
	.addWithInfo(
		"Basic Tooltip component",
		"Aligned right by default",
		() => (
			<div
				style={{
					marginTop: "800px",
					width: "500px",
					height: "1000px",
					marginLeft: "600px"
				}}
			>
				<Tooltip
					minWidth="0"
					maxWidth="384px"
					align="right"
					id="testTooltip"
					trigger={<Button small>Open</Button>}
					content={dropdownContent}
				/>
			</div>
		)
	)
	.addWithInfo(
		"Tooltip above trigger",
		"Aligned right and appearing above the trigger",
		() => (
			<div style={{textAlign: 'center'}}>
				<Tooltip
					direction="top"
					minWidth="0"
					maxWidth="384px"
					align="right"
					id="testTooltip"
					trigger={<Button small>Open</Button>}
					content={dropdownContent}
				/>
			</div>
		)
	)
	.addWithInfo(
		"Opened Tooltip component",
		"Aligned center and opened by default",
		() => (
			<div style={{textAlign: 'center'}}>
				<Tooltip
					isActive
					minWidth="0"
					maxWidth="384px"
					align="center"
					id="testTooltip"
					trigger={<Button small>Open</Button>}
					content={dropdownContent}
				/>
			</div>
		)
	)
	.addWithInfo(
		"Tooltip component (no Portal)",
		"Use the `noPortal` prop to decide whether a the content should render in document body",
		() => (
			<div style={{textAlign: 'center'}}>
				<Tooltip
					noPortal
					minWidth="0"
					maxWidth="384px"
					align="right"
					id="testTooltip"
					trigger={<Button small>Open</Button>}
					content={dropdownContent}
				/>
			</div>
		)
	)
	.addWithInfo(
		"Left aligned tooltip",
		"Use the `align` prop to change alignment to left",
		() => (
			<div style={{textAlign: 'center'}}>
				<Tooltip
					align="left"
					minWidth="0"
					maxWidth="384px"
					id="testTooltip"
					trigger={<Button small>Open</Button>}
					content={dropdownContent}
				/>
			</div>
		)
	)
	.addWithInfo(
		"Center aligned tooltip",
		"Use the `align` prop to change alignment to left",
		() => (
			<div style={{textAlign: 'center'}}>
				<Tooltip
					align="center"
					minWidth="0"
					maxWidth="384px"
					id="testTooltip"
					trigger={<Button small>Open</Button>}
					content={dropdownContent}
				/>
			</div>
		)
	)
	.addWithInfo(
		"Tooltip with offset",
		"Using an offset to fine-tune the popup alignment to the trigger",
		() => (
			<div style={{textAlign: 'center'}}>
				<Tooltip
					isActive
					offset={{top: 8, left: 16}}
					minWidth="0"
					maxWidth="384px"
					align="right"
					id="testTooltip"
					trigger={<Button small>Open</Button>}
					content={
						<div className="runningText padding--all">
							<p>
								This tooltip component is offset 16px from the left and 8px from the top
							</p>
						</div>
					}
				/>
			</div>
		)
	)
	.addWithInfo(
		"manualToggle",
		"rely on the `isActive` prop to open and close the tooltip",
		() => (
			<ManualToggleDropdown/>
		)
	)
	.addWithInfo(
		"Overflowing viewport",
		"Aligned right by default, but switches to left",
		() => (
			<div style={{textAlign: 'left'}}>
				<Tooltip
					isActive
					minWidth="0"
					maxWidth="384px"
					align="right"
					id="testTooltip"
					trigger={<Button small>Open</Button>}
					content={
						<div className="runningText padding--all">
							<p>
								This Tooltip component's `align` prop is set to 'right', but because
								it would overflow the viewport, it gets switched to 'left'
							</p>
						</div>
					}
				/>
			</div>
		)
	);
