import PropTypes from 'prop-types';
import React from 'react';

import Button from '../forms/Button';
import Tooltip from './Tooltip';

const InfoTooltipTrigger = props => (
	<Button reset onClick={props.onClick ? props.onClick : undefined}>
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
	onClick,
	...other
}) => {
	return (
		<div className={className} {...other}>
			<span className="infoToggle-label">{label}</span>
			<Tooltip
				id={tooltipId}
				trigger={<InfoTooltipTrigger onClick={onClick} />}
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
