import React from 'react';
import { shallow } from 'enzyme';

import withLoading from './withLoading';

const dangerousHTML = '<div>Dangerously setting inner HTML</div>';
const makeDanger = () => ({__html: dangerousHTML});

const testComponentClass = 'testClass';
const TestComponent = (props) => (<div {...props} />);
const TestComponentWithLoading = withLoading(TestComponent);

describe('withLoading', function() {
	const testComponentWithLoading = shallow(<TestComponentWithLoading className={testComponentClass} />);

	it('matches snapshot', () => {
		expect(testComponentWithLoading).toMatchSnapshot();
	});

	it('renders a wrapped component', () => {
		expect(testComponentWithLoading.find(`.${testComponentClass}`).length).toBe(1);
	});

	it('can handle dangerouslySetInnerHTML', function() {
		const dangerousHTMLComponent = shallow(
			<TestComponentWithLoading
				dangerouslySetInnerHTML={makeDanger()}
			/>
		);
		expect(dangerousHTMLComponent.html()).toContain(dangerousHTML);
	});
});
