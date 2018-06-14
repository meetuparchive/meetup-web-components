// @flow
import * as React from 'react';
import cx from 'classnames';
import withErrorList from '../utils/components/withErrorList';

import Flatpickr from 'react-flatpickr';

import { LocalDate, nativeJs } from 'js-joda';
import { convert } from 'js-joda';

type Props = {
	...React.ElementProps<'input'>,
	labelClassName: string,
	datepickerOptions: FlatpickrOptions,
	error: string | React$Node | boolean,
	helperText: string | React$Node,
	required: boolean,
	requiredText: string | React$Node,
	onChange?: (LocalDate, ?string, ?FlatpickrInstance) => void,
	value?: LocalDate,
};

/*
 * Single date picker component.
 * Wraps [react-flatpickr](github.com/coderhaoxin/react-flatpickr)
 *
 * For full documentation of available `datePickerOptions`, see:
 * https://chmln.github.io/flatpickr/options/
 */
export class CalendarComponent extends React.Component<Props> {
	static defaultProps = {
		requiredText: '*',
		datepickerOptions: {},
	};
	getPickrValue: (?LocalDate) => ?Date;
	constructor(props: Props) {
		super(props);

		// need an instance-specific memoized function for getting a vanilla JS
		// date from the current LocalDate props.value
		let lastArg;
		let lastReturn;
		this.getPickrValue = (value): ?Date => {
			if (value === lastArg) {
				return lastReturn;
			}
			lastArg = value;
			lastReturn = this.props.value && convert(this.props.value).toDate();
			return lastReturn;
		};
	}

	/*
	 * the Flatpickr component always passes an array of recently selected
	 * dates to its onChange handler, with the most recent in first position of
	 * the array. We are only interested in the most-recently-selected value
	 */
	onFlatPickerChange = (
		selectedDates: Array<Date>,
		dateString: string,
		flatpickrInstance: {}
	) => {
		const [selectedDate] = selectedDates;
		const { onChange } = this.props;
		if (!onChange) {
			return;
		}
		onChange(LocalDate.from(nativeJs(selectedDate)), dateString, flatpickrInstance);
	};

	render() {
		const {
			id,
			name,
			label,
			labelClassName,
			helperText,
			error,
			datepickerOptions,
			className,
			onChange, // eslint-disable-line no-unused-vars
			required,
			requiredText,
			value,
			...other
		} = this.props;

		const classNames = {
			label: cx(
				{
					'label--required': required,
					'flush--bottom': helperText,
				},
				labelClassName
			),
			helperText: cx('helperTextContainer', { required }),
			field: cx(
				'input--dateTimePicker select--reset',
				{ 'field--error': Boolean(error) },
				className
			),
		};

		const options = {
			altInput: true,
			altFormat: 'D M d, Y',
			nextArrow: `<span class="svg svg--chevron-right">
				<svg preserveAspectRatio="xMinYMin meet" width="12" height="12" viewBox="0 0 12 12" className="svg-icon valign--middle" role="img">
				<use xlink:href="#icon-chevron-right" />
				</svg>
			</span>`,
			prevArrow: `<span class="svg svg--chevron-left">
				<svg preserveAspectRatio="xMinYMin meet" width="12" height="12" viewBox="0 0 12 12" className="svg-icon valign--middle" role="img">
				<use xlink:href="#icon-chevron-left" />
				</svg>
			</span>`,
			...datepickerOptions,
		};

		return (
			<span>
				{label && (
					<label
						htmlFor={id || name}
						className={classNames.label}
						data-requiredtext={required && requiredText}
					>
						{label}
					</label>
				)}
				{helperText && <div className={classNames.helperText}>{helperText}</div>}
				<Flatpickr
					id={id || name}
					options={options}
					aria-label="Use arrow keys to navigate the calendar"
					className={classNames.field}
					onChange={this.onFlatPickerChange}
					value={this.getPickrValue(value)}
					{...other}
				/>
			</span>
		);
	}
}

CalendarComponent.defaultProps = {
	requiredText: '*',
	datepickerOptions: {},
};

export default withErrorList(CalendarComponent);
