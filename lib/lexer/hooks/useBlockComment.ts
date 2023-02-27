import { type Source, createSource } from '~lib/lexer/utils'
import { type Token, TokenKind, createToken, createTokenSpan } from '~lib/token'
import { isLineFeed, peekChar, peekSlice } from '~lib/lexer/utils'

type Context = Readonly<{
  source: Source
  pos: number
  line: number
}>

const useBlockComment = (context: Context): [Token, number] => {
  const start_mark = peekSlice({ source: context.source, pos: context.pos, length: 2 })
  if (start_mark !== '/*') throw new Error(`Uncaught SyntaxError: Unexpected token '${start_mark}'`)

  const begin = context.pos
  let end = context.pos + 2
  let line = context.line
  const chars: string[] = []
  const lines: number[] = [context.line]

  const walk = (_pos: number): number => {
    const char = peekChar({ source: context.source, pos: _pos })
    if (char === null) return _pos
    if (isLineFeed(char)) lines.push((line += 1))
    if (peekSlice({ source: context.source, pos: _pos, length: 2 }) === '*/') {
      end += 2
      return _pos + 2
    }
    end += 1
    chars.push(char)
    return walk(_pos + 1)
  }

  const pos = walk(context.pos + 2)
  const token = createToken({
    kind: TokenKind.BlockComment,
    value: chars.join(''),
    span: createTokenSpan({ begin, end, lines }),
  })
  return [token, pos]
}
export default useBlockComment

// ---test
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it.concurrent('test useBlockComment', () => {
    const raw = `/**\n* This is the first block comment.\n* This is the second block comment.\n*/`
    const source = createSource(raw)
    const [token, pos] = useBlockComment({ source, pos: 0, line: 1 })
    const expect_pos = raw.length
    const expect_token = createToken({
      kind: TokenKind.BlockComment,
      value: `*\n* This is the first block comment.\n* This is the second block comment.\n`,
      span: createTokenSpan({ begin: 0, end: expect_pos, lines: [1, 2, 3, 4] }),
    })
    expect(pos).toBe(expect_pos)
    expect(token).toStrictEqual(expect_token)
  })
}
