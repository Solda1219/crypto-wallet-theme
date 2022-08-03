/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
const addLocaleData = require('react-intl').addLocaleData; //eslint-disable-line
const enLocaleData = require('react-intl/locale-data/en');
const deLocaleData = require('react-intl/locale-data/de');
const hiLocaleData = require('react-intl/locale-data/hi');

const enTranslationMessages = require('./translations/en.json');
const deTranslationMessages = require('./translations/de.json');
const hiTranslationMessages = require('./translations/hi.json');

addLocaleData(enLocaleData);
addLocaleData(hiLocaleData);

function setCookie(cname, cvalue) {
  if (typeof window === 'undefined') {
    return;
  }
  document.cookie = `${cname}=${cvalue}`;
}

function getCookie(cname) {
  if (typeof window === 'undefined') {
    return '';
  }
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
}

let cookie = getCookie('bigornaLab_lang');
if (!cookie) {
  cookie = 'en';
  setCookie('bigornaLab_lang', 'en');
}

const DEFAULT_LOCALE = cookie;

// prettier-ignore
const appLocales = [
  'en',
  'hi',
];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  hi: formatTranslationMessages('hi', hiTranslationMessages),
};

exports.appLocales = appLocales;
exports.formatTranslationMessages = formatTranslationMessages;
exports.translationMessages = translationMessages;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
