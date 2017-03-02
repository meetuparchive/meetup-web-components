import React from 'react';
import cx from 'classnames';
import Flatpickr from 'flatpickr';

/**
 * @module FlatpickrComponent
 * inits flatpickr js date picker over a text input
*/
class FlatpickrComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value || ''
		};
		this.onChange = this.onChange.bind(this);
		this.onReady = this.onReady.bind(this);
	}

	/**
	* init the js date flatpickr component
	*/
	componentDidMount() {

		const options = {
			onChange: this.onChange,
			onReady: this.onReady,
			altInput: true,
			altFormat: 'D M d, Y', // TODO localize
			defaultDate: this.props.value,
			enableTime: typeof(this.props.dateOnly) === 'undefined' ? true : !(this.props.dateOnly)
			// we override this onReady depending if mobile or dateOnly
		};

		Object.assign(options, this.props.opts);
		this.flatpickr = new Flatpickr(this.node, options);
	}

	componentWillUnmount() {
		this.flatpickr && this.flatpickr.destroy();
	}

	/**
	* @function onChange
	* conforms to the onChange handler flatpickr expects
	*/
	onChange(selectedDates, dateStr, instance) {
		this.setState({ value: selectedDates[0] });
		this.props.callback && this.props.callback(selectedDates[0]);
	}

	// if we are rendering date and time, disable time if we are not
	// on mobile since we will draw a separate time input

	onReady(selectedDates, dateStr, instance) {
		if (this.props.dateOnly === !(instance.instanceConfig.enableTime)) {
			return;
		}
		if (this.props.dateOnly || !this.props.isMobile) {
			instance.set('enableTime', false);
		}
	}

	render() {
		const {
			callback,	// eslint-disable-line no-unused-vars
			className,
			id,
			name,
			value,		// eslint-disable-line no-unused-vars
			opts,		// eslint-disable-line no-unused-vars
			dateOnly,	// eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = cx(
			'dateTimePicker',
			className
		);

		return (
			<input
				id={id}
				type='text'
				name={name}
				defaultValue={this.state.value}
				className={classNames}
				ref={ node => this.node = node }
				{...other} />
		);
	}
}

FlatpickrComponent.propTypes = {
	name: React.PropTypes.string.isRequired,
	// required: React.PropTypes.bool,
	callback: React.PropTypes.func
};

export default FlatpickrComponent;

