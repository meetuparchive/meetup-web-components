import PropTypes from 'prop-types';
import React from 'react';

import Button from '../forms/Button';
import Tooltip from './Tooltip';

const InfoTooltipTrigger = () => (
	<Button reset>
		<span className="infoToggle-trigger align--center" role="img">
			?
		</span>
	</Button>
);

const InfoToggle = ({
	className,
	label,
	tooltipId,
	tooltipProps,
	tooltipContent,
	...other
}) => {
	return (
		<div className={className} {...other}>
			<span>{label}</span>
			<Tooltip
				id={tooltipId}
				trigger={<InfoTooltipTrigger />}
				content={tooltipContent}
				{...tooltipProps}
			/>
		</div>
	);
};

InfoToggle.defaultProps = {
	tooltipProps: {
		align: 'right',
	},
};

InfoToggle.propTypes = {
	/** The content that's rendered inside the tooltip's content bubble */
	tooltipContent: PropTypes.element,

	/** The label rendered next to the Tooltip's trigger */
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

	/** The unique identifier for the Tooltip */
	tooltipId: PropTypes.string.isRequired,

	/** Props to pass to the Tooltip component */
	tooltipProps: PropTypes.object,
};

export default InfoToggle;
