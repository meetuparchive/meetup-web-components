// @flow
declare type FlatpickrInstance = {};
type Hook = (
	dates: Array<Date>,
	currentDateString: string,
	self: FlatpickrInstance, // Flatpickr instance
	data?: any
) => void;
type DateOption = Date | string | number;
type DateRangeLimit<D = DateOption> = { from: D, to: D };
type DateLimit<D = DateOption> = D | DateRangeLimit<D> | ((date: Date) => boolean);
/* Plugins. See https://chmln.github.io/flatpickr/plugins/ */
type Plugin = (fp: FlatpickrInstance) => FlatpickrOptions;

declare type FlatpickrOptions = {
	/* Allows the user to enter a date directly input the input field. By default, direct entry is disabled. */
	allowInput: boolean,
	/* Exactly the same as date format, but for the altInput field */
	altFormat: string,

	/* Show the user a readable date (as per altFormat), but return something totally different to the server.*/
	altInput: boolean,

	/* This class will be added to the input element created by the altInput option.  Note that altInput already inherits classes from the original input. */
	altInputClass: string,

	/* Whether to enable animations, such as month transitions */
	animate: boolean,

	/* Instead of body, appends the calendar to the specified node instead. */
	appendTo: HTMLElement,

	/* Defines how the date will be formatted in the aria-label for calendar days, using the same tokens as dateFormat. If you change this, you should choose a value that will make sense if a screen reader reads it out loud. */
	/* Defaults to "F j, Y" */
	ariaDateFormat: string,

	/*
    Whether clicking on the input should open the picker.
    Set it to false if you only want to open the calendar programmatically
  */
	clickOpens: boolean,

	/* Whether calendar should close after date selection */
	closeOnSelect: boolean,

	/*
    If "mode" is "multiple", this string will be used to join
    selected dates together for the date input value.
  */
	conjunction: string,

	/*
    A string of characters which are used to define how the date will be displayed in the input box.
    See https://chmln.github.io/flatpickr/formatting
  */
	dateFormat: string,

	/* The initial selected date(s). */
	defaultDate: DateOption | Array<DateOption>,

	/* Initial value of the hour element, when no date is selected */
	defaultHour: number,

	/* Initial value of the minute element, when no date is selected */
	defaultMinute: number,

	/* Initial value of the seconds element, when no date is selected */
	defaultSeconds: number,

	/*
    Disables certain dates, preventing them from being selected.
    See https://chmln.github.io/flatpickr/examples/#disabling-specific-dates */
	disable: Array<DateLimit<DateOption>>,

	/* Set this to true to always use the non-native picker on mobile devices.
By default, Flatpickr utilizes native datetime widgets unless certain options (e.g. disable) are used. */
	disableMobile: boolean,

	/* Disables all dates except these specified. See https://chmln.github.io/flatpickr/examples/#disabling-all-dates-except-select-few */
	enable: Array<DateLimit<DateOption>>,

	/* Enables seconds selection in the time picker.
 */
	enableSeconds: boolean,

	/* Enables the time picker */
	enableTime: boolean,

	errorHandler: (e: Error) => void,

	/* Allows using a custom date formatting function instead of the built-in. Generally unnecessary.  */
	formatDate: (date: Date, format: string) => string,

	/* If "weekNumbers" are enabled, this is the function that outputs the week number for a given dates, optionally along with other text  */
	getWeek: (date: Date) => string | number,

	/*   Adjusts the step for the hour input (incl. scrolling) */
	hourIncrement: number,

	/* By default, clicking anywhere outside of calendar/input will close the calendar.
  Clicking on elements specified in this option will not close the calendar */
	ignoredFocusElements: Array<HTMLElement>,

	/* Displays the calendar inline */
	inline: boolean,

	/* The locale, either as a string (e.g. "ru", "en") or as an object.
  See https://chmln.github.io/flatpickr/localization/ */
	locale: string,

	/* The maximum date that a user can pick to (inclusive). */
	maxDate: DateOption,

	/* The maximum time that a user can pick to (inclusive). */
	maxTime: DateOption,

	/* The minimum date that a user can start picking from (inclusive). */
	minDate: DateOption,

	/* The minimum time that a user can start picking from (inclusive). */
	minTime: DateOption,

	/* Adjusts the step for the minute input (incl. scrolling)
  Defaults to 5 */
	minuteIncrement: number,

	/* Date selection mode, defaults to "single" */
	mode: 'single' | 'multiple' | 'range' | 'time',

	/* HTML for the right arrow icon, used to switch months. */
	nextArrow: string,

	/* Hides the day selection in calendar.
Use it along with "enableTime" to create a time picker. */
	noCalendar: boolean,

	now?: DateOption,

	/* Fires when the selected dates have changed - when a date is picked or cleared, by user or programmatically */
	onChange: Hook | Array<Hook>,

	/* Fires when the calendar is closed */
	onClose: Hook | Array<Hook>,

	/* Fires for every day cell in the calendar, where the fourth argument is the html element of the cell. See https://chmln.github.io/flatpickr/events/#ondaycreate*/
	onDayCreate: Hook | Array<Hook>,

	/* Fires before the calendar instance is destroyed */
	onDestroy: Hook | Array<Hook>,

	/* Fires when valid keyboard input for calendar is detected */
	onKeyDown: Hook | Array<Hook>,

	/* Fires after the month has changed */
	onMonthChange: Hook | Array<Hook>,

	/* Fires after the calendar is opened */
	onOpen: Hook | Array<Hook>,

	/* Fires after the configuration for the calendar is parsed */
	onParseConfig: Hook | Array<Hook>,

	/* Fires once the calendar instance is ready */
	onReady: Hook | Array<Hook>,

	/* Like onChange, but fires immediately after any date changes */
	onValueUpdate: Hook | Array<Hook>,

	/* Fires after the year has changed */
	onYearChange: Hook | Array<Hook>,

	onPreCalendarPosition: Hook | Array<Hook>,

	/* A custom datestring parser */
	parseDate: (date: string, format: string) => Date,

	/* Plugins. See https://chmln.github.io/flatpickr/plugins/ */
	plugins: Array<Plugin>,

	/* How the calendar should be positioned with regards to the input. Defaults to "auto" */
	position: 'auto' | 'above' | 'below',

	/*
    The element off of which the calendar will be positioned.
    Defaults to the date input
  */
	positionElement: Element,

	/* HTML for the left arrow icon, used to switch months. */
	prevArrow: string,

	/* Whether to display the current month name in shorthand mode, e.g. "Sep" instead "September" */
	shorthandCurrentMonth: boolean,

	/* Creates a wrapper to position the calendar. Use this if the input is inside a scrollable element */
	static: boolean,

	showMonths?: number,

	/* Displays time picker in 24 hour mode without AM/PM selection when enabled.*/
	time_24hr: boolean,

	/* Display week numbers left of the calendar. */
	weekNumbers: boolean,

	/* See https://chmln.github.io/flatpickr/examples/#flatpickr-external-elements */
	wrap: boolean,
};
