import { configure } from '@kadira/storybook';
import '../assets/scss/main.scss';
import '../assets/css/storybook.css';

const componentStories = require.context('../components', true, /\.story\.jsx$/)

function loadStories() {
	componentStories.keys().forEach(componentStories);
}

configure(loadStories, module);
