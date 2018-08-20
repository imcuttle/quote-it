// Forked from https://github.com/substack/jsonify/blob/master/lib/stringify.js

function getEscapable(char) {
  char = char === '-' ? '\\-' : char
  return new RegExp(
    `[\\\\${char}\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]`,
    'g'
  )
}

const commonMeta = {
  // table of character substitutions
  '\b': '\\b',
  '\t': '\\t',
  '\n': '\\n',
  '\f': '\\f',
  '\r': '\\r',
  '\\': '\\\\'
}

function _quote(string, char = '"', reg = escapable, meta) {
  // If the string contains no control characters, no quote characters, and no
  // backslash characters, then we can safely slap some quotes around it.
  // Otherwise we must also replace the offending characters with safe escape
  // sequences.
  reg.lastIndex = 0
  return reg.test(string)
    ? char +
        string.replace(reg, function(a) {
          var c = meta[a]
          return typeof c === 'string'
            ? c
            : // : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
              a
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
export default function quote(string, quoteChar = '"') {
  if (quoteChar.length > 1 && process.env.NODE_ENV !== 'production') {
    console.error('quote: `quoteChar` is recommended as single character, but ' + JSON.stringify(quoteChar) + '.')
  }

  return _quote(
    string,
    quoteChar,
    getEscapable(quoteChar),
    Object.assign({}, commonMeta, { [quoteChar]: `\\${quoteChar}` })
  )
}

/**
 * Uses single quote to wrap string.
 * @public
 * @param string
 * @return {string}
 */
export function single(string) {
  return quote(string, "'")
}

/**
 * Uses double quote to wrap string.
 * @public
 * @param string
 * @return {string}
 */
export function double(string) {
  return quote(string, '"')
}
