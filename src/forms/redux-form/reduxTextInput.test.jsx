import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { shallow } from 'enzyme';
import ReduxTextInput from './ReduxTextInput';

describe('ReduxTextInput', function() {

	const formName = 'testForm',
		formAttrs = {
			label: 'Super Hero',
			name: 'superhero',
			value: 'Wonder Woman and Robin',
			maxLength: 20,
			required: true,
			error: 'Did you mean Batman and Robin?'
		};

	// eslint-disable-next-line require-jsdoc
	class FormComponent extends React.Component {
		render() {
			return <form name={formName}>{this.props.children}</form>;
		}
	}

	const DecoratedFormComponent = reduxForm({
		form: formName,
	})(FormComponent);

	it('renders a required HTML <input> with expected attributes for mock data', () => {
		const component = shallow(
			<DecoratedFormComponent>
				<Field component={ReduxTextInput} {...formAttrs} />
			</DecoratedFormComponent>
		);

		expect(component).toMatchSnapshot();

	});

});
