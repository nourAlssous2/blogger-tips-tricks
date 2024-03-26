export function translate(language = 'en') {
    const { translate } = require(`/lang/${language}.js`);
    const translates = translate();
    return translates;
}