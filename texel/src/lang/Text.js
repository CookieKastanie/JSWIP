import fr from './fr';

const langs = new Object();

export class Text {
    static init() {
        langs[Text.FRENCH] = fr;

        Text.setLanguage(Text.DEFAULT);
    }

    static setLanguage(lang) {
        Text.currentLang = langs[lang];
        if(!Text.currentLang) Text.currentLang = langs[Text.DEFAULT];
    }

    static get(key) {
        return Text.currentLang[key];
    }
}


Text.FRENCH = 'french';
Text.DEFAULT = Text.FRENCH;
