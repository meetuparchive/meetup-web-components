import React from 'react';
import { shallow } from 'enzyme';
import Nav from './Nav';

const renderComponent = props => shallow(<Nav {...props} />);

describe('Nav', () => {
	const navSwarm = renderComponent({
		media: { isAtMediumUp: true },
		self: { status: 'active', name: 'Jeff Cleft' },
	});
	const navScript = renderComponent({
		media: { isAtLargeUp: true },
		self: { status: 'prereg' },
	});

	it('should match the snapshot for SwarmLogo', () => {
		expect(navSwarm).toMatchSnapshot();
	});

	it('should match the snapshot for ScriptLogo', () => {
		expect(navScript).toMatchSnapshot();
	});
});
