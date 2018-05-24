import React from 'react';
import { shallow } from 'enzyme';
import InfoToggle from './InfoToggle';

const wrapper = shallow(<InfoToggle label="Get info" tooltipId="tooltipTestId" />);

describe('InfoToggle', () => {
	it('should render', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
