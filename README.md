# CMS Noticias

## Setup

Install all dependencies and run the server with
```
npm install && npm run start_dev
```

Then duplicate `.env-template.js` inside the config directory, rename it to `.env` and add necessary credentials.
Since the `.env` file is excluded from git, no passwords will be leaked to github.

To transpile ES6 to vanilla JS and create the frontend-bundle with webpack run:
```
npm run build
```

## Development
Please enable the editorconfig plugin within your IDE and try to obey as many es-lint rules as possible.

## Deploy
The app has been released to Heroku @ [https://agile-wave-55174.herokuapp.com](https://agile-wave-55174.herokuapp.com).

The MongoDB-instance is hosted [mlab.com](https://mlab.com).

Ask for permission to deploy.

## Team

* Mateo Daza
* Sebastian Racedo
* Ludwig Goohsen
