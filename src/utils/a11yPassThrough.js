import cx from 'classnames';

export default className =>
	cx({
		'visibility--a11yHide': /--a11yHide/.test(className),
		'visibility--a11yShow': /--a11yShow/.test(className),
	});
