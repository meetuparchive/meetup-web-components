import React from 'react';

/**
 * @module WithToggleControl
 */
/**
 * Provides boolean isChecked prop to wrapped component.
 *
 * @param {React.element} ToggleComponent - the component to wrap
 */
export const withToggleControl = (
	ToggleComponent
) => class extends React.Component {
	/**
	 * @constructor
	 * @param {Object} - React element props
	 */
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);

		this.state = {
			isChecked: props.isChecked || false
		};

		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({
			isChecked: e.target.checked
		});
	}

	/**
	 * `isChecked` prop is provided to the wrapped component in render().
	 *
	 * When there's a change on the checkbox input, `this.state.isChecked`
	 * is updated and the component will re-render with the correct
	 * boolean prop value.
	 *
	 * @returns {React.element}
	 */
	render() {

		const {
			id,
			name
		} = this.props;

		return (
			<div>
				<label
					className='withToggleInput-label'
					htmlFor={id}
				>
					<ToggleComponent
						isChecked={this.state.isChecked}
					/>
				</label>
				<input
					type='checkbox'
					className='visibility--a11yHide'
					onChange={this.onChange}
					id={id}
					name={name} />
			</div>
		);

	}

};

withToggleControl.propTypes = {
	id: React.PropTypes.string,
	name: React.PropTypes.string
};
