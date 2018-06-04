export default name => `
import React from 'react';
import ${name} from './${name}';
import { storiesOf } from '@kadira/storybook';

storiesOf('${name}', module)
	.add('default', () => <${name} />)
`;
