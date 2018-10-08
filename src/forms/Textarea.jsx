// @flow
import * as React from 'react';
import cx from 'classnames';
import autosize from 'autosize';
import CharCounter from './CharCounter';
import withErrorList from '../utils/components/withErrorList';

type Props = React.Element<HTMLTextAreaElement> & {
	/** Adds an `id` attribute to the input, and associates it with the `<label />` */
	id: string,
	/** The `name` attribute for the input */
	name: string,
	/** Error content to render */
	error?: string,
	/** What we render into the input's `<label />` */
	label?: string | React.Element<*>,
	/** The class name/s to add to the `<label />` element */
	labelClassName?: string,
	/** The smallest height the `<textarea />` can be */
	minHeight?: number,
	/** The largest height the `<textarea />` can be */
	maxHeight?: number,
	/** Callback that happens when the textarea value changes */
	onChange?: (e: Event) => void,
	/** Number of rows high the textarea is */
	rows?: number,
	/** Value of the textarea */
	value?: string,
	/** Whether to grow the height of the textarea to fit all of the textarea content without scrolling */
	autosize?: boolean,
	/** An additional piece of helpful info rendered with the field */
	helperText?: string | React.Element<*>,
	/** Whether the field is required to have a value */
	required?: boolean,
	/** What to render in order to indicate the field is required */
	requiredText?: string | React.Element<*>,
};

type State = {
	value: string,
};

/**
 * Should override value with info from state
 * @return {Object} the new state for the component
 */
export const overrideValue = (nextProps: Props): State => ({
	value: nextProps.value || '',
});

/**
 * @module Textarea
 */
export class Textarea extends React.PureComponent<Props, State> {
	static defaultProps = {
		requiredText: '*',
	};

	state = {
		value: '',
	};

	/**
	 * @param {Object} nextProps the incoming props
	 * @return {undefined} side effect only
	 */
	static getDerivedStateFromProps(nextProps: Props) {
		return overrideValue(nextProps);
	}

	/**
	 * Turns on autosize if requested
	 * @return {undefined} side effect only
	 */
	componentDidMount() {
		if (this.props.autosize) {
			autosize(this.textarea);
		}
	}

	/**
	 * @param {Object} prevProps the previous props
	 * @return {undefined} side effect only
	 */
	componentDidUpdate(prevProps: Props) {
		if (this.props.value !== prevProps.value) {
			autosize.update(this.textarea);
		}
	}

	/**
	 * called as user changes value, updates state with new value
	 * @param  {Object} e Event object
	 * @return {undefined}
	 */
	onChange = (e: SyntheticInputEvent<EventTarget>): void => {
		const { onChange } = this.props;
		const { value } = e.target;

		this.setState(() => ({
			value,
		}));

		if (onChange) {
			onChange(e);
		}
	};

	textarea: ?HTMLTextAreaElement;

	render() {
		const {
			name,
			value, // eslint-disable-line no-unused-vars
			label,
			labelClassName,
			className,
			error,
			rows,
			style = {},
			maxHeight,
			minHeight,
			maxLength,
			id,
			onChange, // eslint-disable-line no-unused-vars
			autosize,
			helperText,
			required,
			requiredText,
			disableResize,
			...other
		} = this.props;

		const classNames = {
			textarea: cx(
				'span--100',
				{
					'field--error': error,
					'textarea--autoheight': autosize,
					'textarea-no-resize': disableResize,
				},
				className
			),
			label: cx(
				'label--field',
				{
					'label--required': required,
					'flush--bottom': helperText,
				},
				labelClassName
			),
			helperText: cx('helperTextContainer', { required }),
		};

		// Character limits should be a "soft" limit.
		// Avoid passing maxLength as an HTML attribute
		if (maxLength) delete other.maxLength;

		return (
			<div className="inputContainer">
				{label && (
					<label
						className={classNames.label}
						htmlFor={id}
						data-requiredtext={required && requiredText}
					>
						{label}
					</label>
				)}
				{helperText && <div className={classNames.helperText}>{helperText}</div>}
				<textarea
					type="text"
					name={name}
					required={required}
					className={classNames.textarea}
					onChange={this.onChange}
					rows={rows}
					ref={textarea => {
						this.textarea = textarea;
					}}
					style={{ minHeight, maxHeight, ...style }}
					id={id}
					value={this.state.value}
					{...other}
				/>
				{maxLength && (
					<CharCounter
						maxLength={parseInt(maxLength, 10)}
						valueLength={parseInt(this.state.value.length, 10)}
					/>
				)}
			</div>
		);
	}
}

export default withErrorList(Textarea);
