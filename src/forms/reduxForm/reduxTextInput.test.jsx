import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { mount } from 'enzyme';
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

	const store = createStore(() => ({}));

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
		const component = mount(
			<Provider store={store}>
				<DecoratedFormComponent>
					<Field component={ReduxTextInput} {...formAttrs} />
				</DecoratedFormComponent>
			</Provider>
		);

		expect(component).toMatchSnapshot();

	});

});
