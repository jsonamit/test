const development = {
    WEBBYPASSURL: [
        '/login',
        '/signup'
    ],
    APPBYPASSURL: [
        '/app/user/login',
        '/app/user/signup'
    ],
    WEBPATH: 'http://localhost:4200',
    DEBUGLIST: [
        '319133',
        '319144'
    ]
}

const testing = {
    WEBBYPASSURL: [
        '/login',
        '/signup'
    ],
    APPBYPASSURL: [
        '/app/user/login',
        '/app/user/signup'
    ],
    WEBPATH: 'http://localhost:4200',
    DEBUGLIST: [
        '319133',
        '319144'
    ]
}

const production = {
    WEBBYPASSURL: [
        '/login',
        '/signup'
    ],
    APPBYPASSURL: [
        '/app/user/login',
        '/app/user/signup'
    ],
    WEBPATH: 'http://localhost:4200',
    DEBUGLIST: [
        '319133'
    ]
}

module.exports = process.env.NODE_ENV == 'develpment' ? development 
                : process.env.NODE_ENV == 'testing' ? testing 
                : process.env.NODE_ENV == 'production' ? production :  development ;