import PropTypes from 'prop-types';
import React from 'react';

import Button from '../forms/Button';
import Tooltip from './Tooltip';

export const InfoTooltipTrigger = props => (
	<Button
		reset
		onClick={e => {
			e.preventDefault();
			props.onClick(e);
		}}
	>
		<span
			className="infoToggle-trigger align--center"
			role="img"
			aria-label={props.label}
		>
			?
		</span>
	</Button>
);

const InfoToggle = ({
	className,
	label,
	tooltipId,
	tooltipProps,
	tooltipTriggerProps,
	tooltipContent,
	onClick,
	...other
}) => {
	return (
		<div className={className} {...other}>
			<span className="infoToggle-label">{label}</span>
			<Tooltip
				id={tooltipId}
				trigger={
					<InfoTooltipTrigger onClick={onClick} {...tooltipTriggerProps} />
				}
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
