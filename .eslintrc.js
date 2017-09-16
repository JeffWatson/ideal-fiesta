module.exports = {
    "globals": {
        "document": true,
        "window": true,
        "naviagtor": true,
        "navigator": true,
        "URL": true,
        "fetch": true,

        // tests
        "it": true,
        "describe": true,
        "expect": true
    },
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": 0,
        indent: ['error', 2],
        "quote-props": [2, 'as-needed'],
        'quotes': [2, 'single'],
        'linebreak-style': 0
    }
};