import React from "react";
import { storiesOf, action } from '@storybook/react';
import { decorateWithBasics } from "../utils/decorators";
import Dropdown from "./Dropdown";
import Section from "../layout/Section";
import Chunk from "../layout/Chunk";
import Flex from "../layout/Flex";
import FlexItem from "../layout/FlexItem";
import Button from "../forms/Button";

const dropdownContent = (
	<Section className="border--none">
		<Chunk>
			<h2 className="text--big text--bold">Dropdown content</h2>
		</Chunk>
		<Chunk className="runningText">
			<p>
				This is a basic dropdown component. It accepts a `content` prop with
				which you can pass arbitrary JSX content.
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
			dropdownToggled: false
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
				minWidth="0"
				maxWidth="384px"
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
									This dropdown handles its own toggling in a function called
									toggleDropdown.
								</p>
							</Chunk>
							<Chunk>
								<Button onClick={this.toggleDropdown}>Toggle dropdown</Button>
							</Chunk>
						</Section>
					</div>
				}
			/>
		);
	}
}

storiesOf("Dropdown", module)
	.addDecorator(decorateWithBasics)
	.addWithInfo(
		"Basic Dropdown component",
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
				<Dropdown
					minWidth="0"
					maxWidth="384px"
					align="right"
					trigger={<Button small>Open</Button>}
					content={dropdownContent}
				/>
			</div>
		)
	)
	.addWithInfo(
		"Dropdown component (no Portal)",
		"Use the `noPortal` prop to decide whether a the content should render in document body",
		() => (
			<Dropdown
				minWidth="0"
				maxWidth="384px"
				align="right"
				noPortal
				trigger={<Button small>Open</Button>}
				content={dropdownContent}
			/>
		)
	)
	.addWithInfo(
		"Left aligned dropdown",
		"Use the `align` prop to change alignment to left",
		() => (
			<Dropdown
				align="left"
				minWidth="0"
				maxWidth="384px"
				trigger={<Button small>Open</Button>}
				content={dropdownContent}
			/>
		)
	)
	.addWithInfo(
		"Center aligned dropdown",
		"Use the `align` prop to change alignment to left",
		() => (
			<Dropdown
				align="center"
				minWidth="0"
				maxWidth="384px"
				trigger={<Button small>Open</Button>}
				content={dropdownContent}
			/>
		)
	)
	.addWithInfo(
		"With menu items",
		"Use the `menuItems` prop to render a menu",
		() => (
			<Dropdown
				align="center"
				minWidth="160px"
				maxWidth="250px"
				trigger={<Button small>Open</Button>}
				menuItems={[
					<div onClick={action('item one click')}>Item one has text that is really long and should wrap once we reach max width</div>,
					<div onClick={action('item two click')}>Item two</div>,
					<div onClick={action('item three click')}>Item three</div>
				]}
				noPortal // to test text-wrapping
			/>
		)
	)
	.addWithInfo("with custom toggle functionality", () => (
		<Flex justify="flexEnd">
			<FlexItem shrink>
				<DropdownWithToggle />
			</FlexItem>
		</Flex>
	));
