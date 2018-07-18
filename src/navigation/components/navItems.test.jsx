import React from 'react';
import { shallow } from 'enzyme';

import { NavItem, LinkItem } from './NavItem';

const MOCK_PROPS = {
	linkTo: '/zombocom/',
	title: 'Just a simple title for a11y',
	label: <p>Anything is possible</p>,
	dropdownContent: <p>I am in a dropdown</p>,
	updatesLabel: 'Updates',
};
const renderComponent = props => shallow(<NavItem {...props} />);

describe('NavItem', () => {
	const navItemBasic = renderComponent({
		linkTo: MOCK_PROPS.linkTo,
		title: MOCK_PROPS.title,
	});
	const navItemWithUpdates = renderComponent({
		linkTo: MOCK_PROPS.linkTo,
		title: MOCK_PROPS.title,
		hasUpdates: true,
		updatesLabel: MOCK_PROPS.updatesLabel,
	});

	const navItemWithLabel = renderComponent({
		linkTo: MOCK_PROPS.linkTo,
		title: MOCK_PROPS.title,
		label: MOCK_PROPS.label,
	});

	const navItemWithDropdown = renderComponent({
		label: MOCK_PROPS.label,
		title: MOCK_PROPS.title,
		dropdownContent: MOCK_PROPS.dropdownContent,
	});

	const navItemWithAction = renderComponent({
		label: MOCK_PROPS.label,
		title: MOCK_PROPS.title,
		onAction: jest.fn(),
	});

	it('does *not* render count bubble, label, or dropdown if no count prop is provided', () => {
		expect(navItemBasic).toMatchSnapshot();
	});

	it('renders count bubble when a count is provided', () => {
		expect(navItemWithUpdates).toMatchSnapshot();
	});

	it('renders a label when provided', () => {
		expect(navItemWithLabel).toMatchSnapshot();
	});

	it('link component renders correct url from prop', () => {
		expect(navItemBasic.find(LinkItem)).toMatchSnapshot();
	});

	it('renders a dropdown when `dropdownContent` is passed as a prop', () => {
		expect(navItemWithDropdown).toMatchSnapshot();
	});

	it('renders an ActionItem when `onAction` is passed as a prop', () => {
		expect(navItemWithAction).toMatchSnapshot();
	});
});
