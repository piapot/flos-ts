import { type Source, createSource } from '~lib/lexer/utils'

type Props = Readonly<{
  source: Source
  pos: number
}>

const peekChar = (props: Props): string | null => {
  if (props.pos >= props.source.length) return null
  return props.source.raw[props.pos]
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
