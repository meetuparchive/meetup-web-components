import React from 'react';
import { shallow } from 'enzyme';

import FormSection from './FormSection';

describe('FormSection', () => {
	it('exists and contains form section wrapping elements with proper attributes', () => {
		expect(shallow(<FormSection />)).toMatchSnapshot();
	});
});
