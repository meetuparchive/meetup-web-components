import React from 'react';
import { shallow } from 'enzyme';
import InfoToggle, { InfoTooltipTrigger } from './InfoToggle';
import Tooltip from './Tooltip';

const MOCK_PROPS = {
	tooltipId: 'fillerId',
	id: 'otherFillerId',
};
const renderComponent = props => shallow(<InfoToggle {...MOCK_PROPS} {...props} />);

function makeRandomString() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 5; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

describe('InfoToggle', () => {
	it('should render a label', () => {
		const labelText = makeRandomString();
		const toggle = renderComponent({
			label: labelText,
		});
		const label = toggle.find('span');
		expect(label.text()).toEqual(labelText);
	});
	it('should render a tooltip', () => {
		const toggle = renderComponent();
		expect(toggle.find(Tooltip).exists()).toBeTruthy();
	});
	it('should add the tool tip id to the tooltip', () => {
		const tooltipId = makeRandomString();
		const toggle = renderComponent({
			tooltipId,
		});
		const tooltip = toggle.find(Tooltip);
		expect(tooltip.prop('id')).toEqual(tooltipId);
	});
	it('should add the trigger to the tooltip', () => {
		const trigger = <InfoTooltipTrigger />;
		const toggle = renderComponent({
			trigger,
		});
		const tooltip = toggle.find(Tooltip);
		expect(tooltip.prop('trigger')).toEqual(trigger);
	});
	it('should add an onClick prop to the trigger if provided', () => {
		const onClick = jest.fn();
		const trigger = <InfoTooltipTrigger onClick={onClick} />;
		const toggle = renderComponent({
			trigger,
			onClick,
		});
		const tooltip = toggle.find(Tooltip);
		const renderedTooltip = shallow(tooltip.prop('trigger'));
		expect(renderedTooltip.prop('onClick')).toEqual(onClick);
	});
});
