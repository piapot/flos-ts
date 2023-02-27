import { type Source, createSource } from '~lib/lexer/utils'

type Context = Readonly<{
  source: Source
  pos: number
}>

const peekChar = (context: Context): string | null => {
  const { source, pos } = context
  if (pos >= source.length) return null
  return source.raw[pos]
}
export default peekChar

// ---test
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it.concurrent('test peekChar', () => {
    const source = createSource('ok')
    const first_char = peekChar({ source, pos: 0 })
    const second_char = peekChar({ source, pos: 1 })
    const third_char = peekChar({ source, pos: 2 })
    expect(first_char).toBe('o')
    expect(second_char).toBe('k')
    expect(third_char).toBeNull()
  })
}
