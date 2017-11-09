# CMS Noticias

## Setup

Install all dependencies and run the server with
```
npm install && npm start
```

Then duplicate `config-template.js` inside the config directory, rename it to `config.js` and add necessary credentials.
Since the `config.js` file is excluded from git, no passwords will be leaked to github.

To transpile ES6 to vanilla JS and create the frontend-bundle with webpack run:
```
npm run build
```

## Team

* Mateo Daza
* Sebastian Racedo
* Ludwig Goohsen
