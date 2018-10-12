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

/**
 * @module Textarea
 */
export class Textarea extends React.PureComponent<Props> {
	static defaultProps = {
		requiredText: '*',
		style: {},
		value: '',
	};

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

	textarea: ?HTMLTextAreaElement;

	render() {
		const {
			id,
			value,
			label,
			labelClassName,
			className,
			error,
			style,
			maxHeight,
			minHeight,
			maxLength,
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
					id={id}
					type="text"
					required={required}
					className={classNames.textarea}
					ref={textarea => {
						this.textarea = textarea;
					}}
					style={{ minHeight, maxHeight, ...style }}
					value={value}
					{...other}
				/>
				{maxLength && (
					<CharCounter
						maxLength={parseInt(maxLength, 10)}
						valueLength={parseInt(value.length, 10)}
					/>
				)}
			</div>
		);
	}
}

export default withErrorList(Textarea);
