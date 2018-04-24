import React from "react";
import { storiesOf } from '@storybook/react';
import { decorateWithBasics } from "../utils/decorators";
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

storiesOf("Tooltip", module)
	.addDecorator(decorateWithBasics)
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
		"Opened Tooltip component",
		"Aligned right and opened by default",
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
			<Tooltip
				noPortal
				minWidth="0"
				maxWidth="384px"
				align="right"
				id="testTooltip"
				trigger={<Button small>Open</Button>}
				content={dropdownContent}
			/>
		)
	)
	.addWithInfo(
		"Left aligned tooltip",
		"Use the `align` prop to change alignment to left",
		() => (
			<Tooltip
				align="left"
				minWidth="0"
				maxWidth="384px"
				id="testTooltip"
				trigger={<Button small>Open</Button>}
				content={dropdownContent}
			/>
		)
	)
	.addWithInfo(
		"Center aligned tooltip",
		"Use the `align` prop to change alignment to left",
		() => (
			<Tooltip
				align="center"
				minWidth="0"
				maxWidth="384px"
				id="testTooltip"
				trigger={<Button small>Open</Button>}
				content={dropdownContent}
			/>
		)
	);
