import 'babel-polyfill';
import I18n from 'i18n-js';
import translations from './locales/translations';
import './app.scss';
import Game from './Game';

const game = new Game();
game.state.start('Intro');

I18n.defaultLocale = 'en';
I18n.translations = translations;
