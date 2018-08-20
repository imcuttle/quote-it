// escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

function logCharacter(from, to) {
  let fromNumber = parseInt(from)
  let toNumber = parseInt(to)
  if (fromNumber > toNumber) {
    console.error(`logCharacter: from(${from}) > to(${to})`)
    return
  }

  for (let i = fromNumber; i < toNumber; i++) {
    console.log(`${i}: ${String.fromCharCode(i)} : ${JSON.stringify(i)}`)
  }
}
logCharacter('0x00', '0x1f')
