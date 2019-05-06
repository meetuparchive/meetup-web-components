import cx from 'classnames';

// needed to allow for a11y cases for screen readers with mutli step forms where inputs are
// conditionally rendered
export default className =>
	cx({
		'visibility--a11yHide': className.includes('visibility--a11yHide'),
		'visibility--a11yShow': className.includes('visiblity--a11yShow'),
	});
