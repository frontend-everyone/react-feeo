import en from '../i18n/en.json'
import zh from '../i18n/zh.json'

export default (state = {
    i18n: en
}, action) => {
    switch (action.type) {
        case 'language':
            return {
                ...state,
                i18n: action.payload === 'English' ? en : zh
            };
        default:
            return state;
    }
};
