import PropTypes from 'prop-types';
import React from 'react';

import Button from "../forms/Button";
import Tooltip from "./Tooltip";

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
		<div
			className={className}
			{...other}
		>
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
		align: 'right'
	}
};

InfoToggle.propTypes = {
	tooltipContent: PropTypes.element,
	label: PropTypes.string,
	tooltipId: PropTypes.string.isRequired,
	tooltipProps: PropTypes.object,
};

export default InfoToggle;
