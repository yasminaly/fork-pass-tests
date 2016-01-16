var
  MultiLineError = require('./multi-line-error').MultiLineError,
  fs = require('fs'),
  util = require('util'),
  validator = require('w3cjs'),
  linter = require('htmlcs'),
  beautifier = require('js-beautify').html,
  differ = require('diff')
;

/*
  +++++++++++++++++++++++++++++++++++++++++++++++
  TESTS
  +++++++++++++++++++++++++++++++++++++++++++++++
*/

describe('# index.html', function () {
  var exists;

  try {
    exists = fs.statSync('index.html').isFile();
  } catch (e) {
    exists = false;
  }

  /* FILE EXISTS ++++++++++++++++++++++++++++++++ */

  it('exists', function (done) {
    if (!exists) {
      throw new MultiLineError('File missing', ['The file `index.html` is missing or misspelled.']);
    }

    done();
  });

  if (!exists) return;

  /* CONTAINS ++++++++++++++++++++++++++++++++ */

  it('contains the right code', function (done) {
    var contents = fs.readFileSync('index.html', 'utf8');

    if (!contents.match(/Hello World\!/)) {
      throw new MultiLineError('Wrong Content', ['The `index.html` doesn’t have the correct content—expected “Hello World!”']);
    }

    done();
  });


});
