'use strict'
var expect = require('chai').expect
var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var before = mocha.before
var beforeEach = mocha.beforeEach
var fs = require('fs')
var path = require('path')
var Handlebars = require('handlebars')

var template
var templateContext

before(function (done) {
  fs.readFile(path.resolve(__dirname, '../templates/header.hbs'), function (err, data) {
    if (err) done(err)
    template = data.toString()
    done()
  })
})

beforeEach(function () {
  templateContext = {
    version: 'my version'
  }
})

describe('partial.header', function () {
  it('should generate header if `isPatch` is truthy', function () {
    templateContext.isPatch = true
    var log = Handlebars.compile(template)(templateContext)

    expect(log).to.equal('## <small>my version</small>\n')
  })

  it('should generate header if `isPatch` is falsy', function () {
    templateContext.isPatch = false
    var log = Handlebars.compile(template)(templateContext)

    expect(log).to.equal('## my version\n')
  })

  it('should generate header if `title` is truthy', function () {
    templateContext.title = 'my title'
    var log = Handlebars.compile(template)(templateContext)

    expect(log).to.equal('## my version "my title"\n')
  })

  it('should generate header if `date` is truthy', function () {
    templateContext.date = 'my date'
    var log = Handlebars.compile(template)(templateContext)

    expect(log).to.equal('## my version (my date)\n')
  })
})
