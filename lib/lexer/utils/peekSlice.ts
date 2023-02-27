import { type Source, createSource } from '~lib/lexer/utils'

type Context = Readonly<{
  source: Source
  pos: number
  length: number
}>

const peekSlice = (context: Context): string | null => {
  const { source, pos, length } = context
  if (pos >= source.length) return null
  return source.raw.slice(pos, pos + length)
}
export default peekSlice

// ---test
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it.concurrent('test peekChar', () => {
    const source = createSource('ok')
    const str = peekSlice({ source, pos: 0, length: 2 })
    expect(str).toBe('ok')
  })
}
