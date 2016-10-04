import { configure } from '@kadira/storybook';
import '../src/assets/scss/main.scss';
import '../src/assets/css/storybook.css';

const srcReq = require.context('../src', true, /\.story\.jsx$/)
const foundationReq = require.context('../foundation-react', true, /\.story\.jsx$/)

function loadStories() {
	srcReq.keys().forEach(srcReq);
	foundationReq.keys().forEach(foundationReq);
}

configure(loadStories, module);
