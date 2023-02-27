import { type Source, createSource } from '~lib/lexer/utils'

type Props = Readonly<{
  source: Source
  pos: number
  length: number
}>

const peekSlice = (props: Props): string | null => {
  if (props.pos >= props.source.length) return null
  return props.source.raw.slice(props.pos, props.pos + props.length)
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
