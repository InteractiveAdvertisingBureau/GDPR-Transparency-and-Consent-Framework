# Quantcast's Reference Implementation of an IAB Compliant GDPR Consent Manager

For more information, please see
[http://advertisingconsent.eu/](http://advertisingconsent.eu/).

## Table of Contents

* [Tech Overview](#tech-overview)
* [Available Scripts](#available-scripts)
  * [npm start](#npm-start)
  * [npm test](#npm-test)
  * [npm run build](#npm-run-build)
  * [npm run format:js](#npm-run-formatjs)
* [Getting Started](#getting-started)
  * [Installing Required Dependencies](#installing-required-dependencies)
  * [Running the Project](#running-the-project)
* [Running the JS Formatter](#running-the-js-formatter)
  * [Formatted Files](#formatted-files)
  * [Formatter Configuration](#formatter-configuration)
  * [Formatter Command Line Interface](#formatter-command-line-interface)
  * [Formatter in Visual Studio Code IDE](#formatter-in-visual-studio-code-ide)
* [Setting up testing environment](#setting-up-testing-environment)
* [Remaining To Dos](#remaining-to-dos)

## Tech Overview

This project uses the following technologies:

**Production Technologies** This project does not have any production
technologies. We want our CMP code to be as small as possible for the fastest
response time and to not add any unnecessary or unknown dependencies to a
publisher's site.

**Development, Testing and Build Technologies**

* [Webpack](https://webpack.js.org/)
* [UglifyJS](https://github.com/mishoo/UglifyJS)
* [Prettier](https://prettier.io)
* [Karma](https://karma-runner.github.io/)
* [Jasmine](https://jasmine.github.io/)
* [browserstack](www.browserstack.com/)

## Available Scripts

In the cmp directory, you can run:

### `npm start`

Runs the code in the development mode.<br> Open
[http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.

### `npm test`

By running this command, Karma will run all the test cases.

### `npm run build`

Builds the cpm code for production to the `build` folder.<br> Currently, this
changes the asset urls, used to get the cmp ui html & stylesheet, to be the
current remote 'production' urls.

In the future, this command will perform all the optimizations that will get the
files production ready, including any code bundling and minimization that may be
needed.

### `npm run format:js`

Runs the [prettier](https://prettier.io) js formatter on all `.js` files in the `src/` folder.
Any formatting errors will be automatically fixed to fit the prettier styles. File names output in
grey means that there were no formatting issues and no changes were made to that file.
File names output in white means that there were formatting errors, which were then fixed by the
formatter.

See the section about [running the js formatter](#running-the-js-formatter) for more information.

## Getting Started

### Installing Required Dependencies

Install node and npm by following the instructions
[here](https://nodejs.org/en/download/package-manager/#macos)

run `npm install` to install all the project dependecies defined in the
`package.json` file.

### Running the Project

start the project by running `npm start`. This runs the app in development
mode.<br> Open [http://localhost:8080](http://localhost:8080) to view it in the
browser.

## Running the JS Formatter

This project uses [prettier](https://prettier.io) for javascript styling.

### Formatted Files

Prettier should be run on files with a `.js` suffix in the `src` folder.

### Formatter Configuration

We mainly rely on prettier's default configuration for our javascript formatting, but we have
changed the prettier configuration to use single quotes instead of double quotes and to have the
max line length be 100 characters, as opposed to the default 80 characters.

* The configuration file
  ```
    "prettier.singleQuote": true,
    "prettier.printWidth": 100
  ```

* the command line
  `"prettier --single-quote --print-width 100 --write 'src/**/*.js'"`

### Formatter Command Line Interface

When you run `npm run format:js`, prettier will be run and any formatting errors will be
automatically fixed to fit the prettier styles. File names output in grey means that there were no
formatting issues and no changes were made to that file. File names output in white means that
there were formatting errors, which were then fixed by the formatter.

### Formatter in Visual Studio Code IDE

You can set up [Visual Studio Code](https://code.visualstudio.com/) with prettier to format the
javascript in the IDE. This is useful so that you can see the format changes that are made straight
away. We recommend having prettier run on save for every javascript file.

**Set Up**
* Install the
  [VS Code plugin for prettier.](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  **NOTE:** for easier installation, we have included this plugin as a recommended extention for
  Visual Studio Code. Click on the 'extensions' icon on the left hand side of the IDE and the
  _'Prettier - Code formatter'_ extension will show up under the _Recommended_ section.
* That's it! After the extension is installed, your project will be set up to format js files on
  save with the correct formatting. This project adds the correct configuration for prettier in
  the workspace settings, so you don't have to do anything else. You can find these settings in the
  `.vscode/settings.json` file.

## Setting up testing environment

### How it works

By running `npm test`, [Karma](https://karma-runner.github.io/) runs each test suite written in [Jasmine](https://jasmine.github.io/) against Chrome/Firefox/Safari/opera environment locally, meanwhile test suites will be run on cloud-based testing tool [browserstack](www.browserstack.com/) remotely for IE/Edge.

The reason why the latest Karma is not used is that it has
[issues with IE6/IE7](https://github.com/karma-runner/karma/issues/1564)

### steps
* Make sure all the dependencies are installed. (`npm install`)
* Install Chrome/Firefox/Safari/opera locally.
* In order to run test cases in IE/Edge environment, please add browserstack username and key as environment variables:

  ```
    export BROWSERSTACK_USERNAME="*username*"
    export BROWSERSTACK_KEY="*key*"
  ```

## Remaining To Dos

**This is currently just a beta**<br> There is significant work to do
before this would be considered production code. A few of
the major items we need to complete include:

* **IE Functionality!** Currently this prototype does not work in IE.
* Making improvements to the consent manager ui.
* Making the publisher purposes cookie match the spec.
* Optimization and tuning.
* Testing for everything, and copious amounts of it. This includes testing
  browser compatabilities.
