import { type Source, createSource, peekSlice } from '~lib/lexer/utils'
import { type Token, TokenKind, createToken, createTokenSpan } from '~lib/token'
import { isLineFeed, peekChar } from '~lib/lexer/utils'

type Context = Readonly<{
  source: Source
  pos: number
  line: number
}>

const useLineComment = (context: Context): [Token, number] => {
  const start_mark = peekSlice({ source: context.source, pos: context.pos, length: 2 })
  if (start_mark !== '//') throw new Error(`Uncaught SyntaxError: Unexpected token '${start_mark}'`)

  const begin = context.pos
  let end = context.pos + 2
  const chars: string[] = []

  const walk = (_pos: number): number => {
    const _char = peekChar({ source: context.source, pos: _pos })
    if (_char === null) return _pos
    if (isLineFeed(_char)) return _pos
    end += 1
    chars.push(_char)
    return walk(_pos + 1)
  }

  const pos = walk(context.pos + 2)
  const token = createToken({
    kind: TokenKind.LineComment,
    value: chars.join(''),
    span: createTokenSpan({ begin, end, lines: [context.line] }),
  })
  return [token, pos]
}
export default useLineComment

// ---test
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it.concurrent('test useLineComment', () => {
    const raw = '// This is a line comment\n'
    const source = createSource(raw)
    const [token, pos] = useLineComment({ source, pos: 0, line: 1 })
    const expect_pos = raw.length - 1
    const expect_token = createToken({
      kind: TokenKind.LineComment,
      value: ' This is a line comment',
      span: createTokenSpan({ begin: 0, end: expect_pos, lines: [1] }),
    })
    expect(pos).toBe(expect_pos)
    expect(token).toStrictEqual(expect_token)
  })
}
