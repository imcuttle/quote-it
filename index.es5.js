'use strict'

exports.__esModule = true
exports.default = quote
exports.single = single
exports.double = double
// Forked from https://github.com/substack/jsonify/blob/master/lib/stringify.js

function getEscapable(char) {
  char = char === '-' ? '\\-' : char
  return new RegExp('[\\\\' + char + '\0-\x1F]', 'g')
}

var commonMeta = {
  // table of character substitutions
  '\b': '\\b',
  '\t': '\\t',
  '\n': '\\n',
  '\f': '\\f',
  '\r': '\\r',
  '\\': '\\\\'
}

function _quote(string) {
  var char = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '"'
  var reg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : escapable
  var meta = arguments[3]

  // If the string contains no control characters, no quote characters, and no
  // backslash characters, then we can safely slap some quotes around it.
  // Otherwise we must also replace the offending characters with safe escape
  // sequences.
  reg.lastIndex = 0
  return reg.test(string)
    ? char +
        string.replace(reg, function(a) {
          var c = meta[a]
          // control characters [\x00-\x1f] converts to \uxxxx
          return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
          // : a
        }) +
        char
    : char + string + char
}

/**
 * Uses `quoteChar` to wrap string.
 * @public
 * @param string {string}
 * @param quoteChar {string}
 * @return {string}
 */
function quote(string) {
  var _Object$assign

  var quoteChar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '"'

  if (quoteChar.length > 1 && process.env.NODE_ENV !== 'production') {
    console.error('quote: `quoteChar` is recommended as single character, but ' + JSON.stringify(quoteChar) + '.')
  }

  return _quote(
    string,
    quoteChar,
    getEscapable(quoteChar),
    Object.assign(
      {},
      commonMeta,
      ((_Object$assign = {}), (_Object$assign[quoteChar] = '\\' + quoteChar), _Object$assign)
    )
  )
}

/**
 * Uses single quote to wrap string.
 * @public
 * @param string
 * @return {string}
 */
function single(string) {
  return quote(string, "'")
}

/**
 * Uses double quote to wrap string.
 * @public
 * @param string
 * @return {string}
 */
function double(string) {
  return quote(string, '"')
}
