# nodejs-ec2-launcher

Node.js web application to start and stop AWS EC2 instances

## Building Blocks

### Server

[express](http://expressjs.com/) - web application framework for node 

    $ express --sessions --css less --hogan --force nodejs-ec2-launcher

[hogan-express](https://npmjs.org/package/hogan-express) - [Hogan.js](http://twitter.github.io/hogan.js/),  [Mustache](http://mustache.github.io/) template engine for express 3.x. Support partials and layout.

    $ npm install hogan-express --save

[Passport](http://passportjs.org/) - Simple, unobtrusive authentication for Node.js.

    $ npm install passport --save

[Passport-BrowserID](https://github.com/jaredhanson/passport-browserid) - Passport strategy for authenticating with [Mozilla Persona](https://login.persona.org/) (formerly known as BrowserID).

    $ npm install passport-browserid --save

[AWS SDK für Node.js](https://aws.amazon.com/de/sdkfornodejs/)

    $ npm install aws-sdk --save

### Client

[zepto.js](http://zeptojs.com/) - a minimalist JavaScript library for modern browsers with a largely jQuery-compatible API. 

[Font Awesome](http://fortawesome.github.io/Font-Awesome/) - The iconic font designed for Bootstrap.

## Start the app

    $ foreman start

Point your favourite browser to [http://localhost:3000/](http://localhost:3000/).

Default PORT is `3000`. To change create `.env` file with e.g. `PORT=3001`.

## Configuration

Environment variables, e.g. via `.env`:

    PORT=3000
    PERSONA_AUDIENCE=http://localhost:3000

    AWS_ACCESS_KEY_ID=[AWS_ACCESS_KEY_ID]
    AWS_SECRET_ACCESS_KEY=[AWS_SECRET_ACCESS_KEY]
    AWS_REGION=[AWS_REGION]

    PERSONA_USERS_INSTANCES={"jon.doe@example.com":["i-ab12cde1"]}

## Heroku Deployment Steps

Install the [Heroku Toolbelt](https://toolbelt.heroku.com/) - everything you need to get started using heroku.

Authenticate/ login: `heroku login`

Install [heroku-config](https://github.com/ddollar/heroku-config), a plugin for the `heroku` CLI that makes it easy to *push* or *pull* your application’s config environment vars, from or into your local `.env` file.

    $ heroku plugins:install git://github.com/ddollar/heroku-config.git

Create a `.env` file with your project configuration - see above.

Next, deploy the application to Heroku.

Create the app: `heroku create`

Push your local environment file to Heroku: `heroku config:push`

Deploy the code: `git push heroku master`
