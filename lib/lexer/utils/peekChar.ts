import { type Source, createSource } from '~lib/lexer/utils'

const peekChar = (source: Source, pos: number): string | null => {
  if (pos >= source.length) {
    return null
  }
  const my_char = source.raw[pos]
  return my_char
}
export default peekChar

// ---test
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it.concurrent('test peekChar', () => {
    const source = createSource('ok')
    const first_char = peekChar(source, 0)
    const second_char = peekChar(source, 1)
    const third_char = peekChar(source, 2)
    expect(first_char).toBe('o')
    expect(second_char).toBe('k')
    expect(third_char).toBeNull()
  })
}
