import '../scss/app.scss';

import 'bootstrap';
import $ from 'jquery';
import lozad from 'lozad';

window.$ = window.jQuery = $;

const observer = lozad();
observer.observe();
