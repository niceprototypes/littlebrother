function decodeEmoji(code, isFlag) {
  return isFlag ? String.fromCodePoint(...code) : String.fromCodePoint(`0x${code}`)
}

export function encodeEmoji(emoji, isFlag) {
  return isFlag ? `[${emoji.codePointAt(0)}, ${emoji.codePointAt(2)}]` : emoji.codePointAt().toString(16)
}

export default decodeEmoji
