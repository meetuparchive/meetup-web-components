import React from 'react';
import { shallow } from 'enzyme';

import { CharCounter } from './CharCounter';

describe('CharCounter', () => {
	it('exists', () => {
		const component = shallow(<CharCounter maxLength={140} valueLength={80} />);
		expect(component).toMatchSnapshot();
	});

	it('uses error color when over the character limit', () => {
		const component = shallow(<CharCounter maxLength={1} valueLength={2} />);
		expect(component.prop('className')).toContain('text--error');
	});
});
