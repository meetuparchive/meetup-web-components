const IntlProvider = `
	.addDecorator(story => {
		const locale = 'en-US';
		return (
			<IntlProvider locale={locale}>
				{story()}
			</IntlProvider>
		);
	})`;

export default (name, isIntl) => `
import React from 'react';
${isIntl ? 'import { IntlProvider } from \'react-intl\'' : ''}
import ${name} from './${name}';
import { storiesOf } from '@kadira/storybook';

storiesOf('${name}', module)${isIntl ? IntlProvider : ''}
	.add('default', () => <${name} />)
`;

