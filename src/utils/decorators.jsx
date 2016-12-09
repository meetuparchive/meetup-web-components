import React from 'react';
import { IntlProvider } from 'react-intl';

export const locale = story => {
	const locale = 'en-US';
	return (
		<IntlProvider locale={locale}>
			{story()}
		</IntlProvider>
	);
};
