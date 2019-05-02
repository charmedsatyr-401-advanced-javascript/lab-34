![CF](http://i.imgur.com/7v5ASc8.png) LAB
=================================================

## Lab 32: Dynamic Forms

### Author: Joseph Wolfe

### Links and Resources
* [GitHub](https://github.com/charmedsatyr-401-advanced-javascript/lab-32)
* [![Build Status](https://travis-ci.com/charmedsatyr-401-advanced-javascript/lab-32.svg?branch=submission)](https://travis-ci.com/charmedsatyr-401-advanced-javascript/lab-32) 
* [Netflify](https://competent-payne-0fff15.netlify.com/)

### Modules
```
.
├── LICENSE
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── README.md
├── src
│   ├── api-server-url.js
│   ├── components
│   │   ├── app.js
│   │   ├── app.scss
│   │   ├── new-record.js
│   │   └── record.js
│   ├── index.js
│   ├── players.schema.json
│   └── store
│       ├── index.js
│       ├── middleware
│       │   └── reporter.js
│       ├── records-actions.js
│       ├── records-reducer.js
│       └── records-reducer.test.js
└── yarn.lock

5 directories, 19 files
```

### Summary
This application uses `react-jsonschema-form` to create dynamic forms from a Mongoose-style schema. A submitted form adds a record to a Redux store. The view is populated from the store. The records and forms manipulate the store by calling REST-style actions.

Users can choose to use the default local `Players` schema or toggle to use a `Teams` schema from a remote API declared in `./src/api-server-url.js`.

#### Tests
* What assertions were made?
  * Reducer REST methods have basic tests.

* What assertions need to be / should be made?
  * Snapshot and functional tests could be made for each component.
  * Tests could ensure each component properly calls `dispatch` with internal handlers.
  * Action creators and reducers could be further tested to ensure appropriate output.

#### UML
![uml](assets/uml.jpg)