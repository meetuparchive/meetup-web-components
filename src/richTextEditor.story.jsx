
import React from 'react';
import RichTextEditor from './RichTextEditor';
import { storiesOf } from '@kadira/storybook';

storiesOf('RichTextEditor', module)
	.add('default', () => <RichTextEditor />);
