module.exports = {
    "globals": {
        "$": true,
        "m": true
    },
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
            2,
            {
                "allow": [
                    "log",
                    "warn",
                    "error"
                ]
            }
        ]
    }
};
