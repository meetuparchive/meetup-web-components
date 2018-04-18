import React from 'react';
import { shallow } from 'enzyme';

import withLoading from './withLoading';

const dangerousHTML = '<div>Dangerously setting inner HTML</div>';
const makeDanger = () => ({__html: dangerousHTML});

// const testComponentClass = 'testClass';
const TestComponent = (props) => (<div {...props} />);
const TestComponentWithLoading = withLoading(TestComponent);

describe('withLoading', function() {
	const testComponentWithLoading = shallow(<TestComponentWithLoading isLoading />);
	const testComponentNoChildren = shallow(<TestComponentWithLoading />);
	const testComponentWithOneChild = shallow(
		<TestComponentWithLoading>
			<span>World</span>
		</TestComponentWithLoading>
	);
	const testComponentWithTwoChildren = shallow(
		<TestComponentWithLoading>
			<span>Hello</span>
			<span>World</span>
		</TestComponentWithLoading>
	);

	it('matches snapshot with isLoading', () => {
		expect(testComponentWithLoading).toMatchSnapshot();
	});

	it('matches snapshot with 0 children', () => {
		expect(testComponentNoChildren).toMatchSnapshot();
	});

	it('matches snapshot with 1 child', () => {
		expect(testComponentWithOneChild).toMatchSnapshot();
	});

	it('matches snapshot with 2 children', () => {
		expect(testComponentWithTwoChildren).toMatchSnapshot();
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
