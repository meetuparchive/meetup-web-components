// @flow
import PropTypes from 'prop-types';
import * as React from 'react';

import Button from '../forms/Button';
import Tooltip from './Tooltip';

type Props = React.ElementConfig<'div'> & {
	className?: string,
	/** The content that's rendered inside the tooltip's content bubble */
	tooltipContent: React.Node,
	/** The label rendered next to the Tooltip's trigger */
	label?: string,
	/** The unique identifier for the Tooltip */
	tooltipId: string,
};

export const InfoTooltipTrigger = () => (
	<Button reset>
		<span className="infoToggle-trigger align--center" role="img">
			?
		</span>
	</Button>
);

const InfoToggle = ({
	className,
	children,
	tooltipContent,
	label,
	tooltip,
	tooltipProps,
	tooltipId,
	...other
}: Props) => {
	const tooltipOptions = {
		id: tooltipId,
		...tooltipProps,
	};

	return (
		<div className={className} {...other}>
			<span className="infoToggle-label">{label}</span>
			<Tooltip trigger={<InfoTooltipTrigger />} {...tooltipOptions}>
				{tooltipContent || children}
			</Tooltip>
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
