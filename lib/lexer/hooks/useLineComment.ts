import { type Source, createSource } from '~lib/lexer/utils'
import { type Token, TokenKind, createToken, createTokenSpan } from '~lib/token'
import { isLineFeed, peekChar } from '~lib/lexer/utils'

const useLineComment = (source: Source, pos: number, line: number): [Token, number] => {
  const begin = pos
  let end = begin
  const chars: string[] = []

  const myTokenizeLineComment = (pos: number): number => {
    const char = peekChar(source, pos)
    if (char === null) return pos
    else if (isLineFeed(char)) return pos
    end += 1
    chars.push(char)
    return myTokenizeLineComment(pos + 1)
  }
  const my_pos = myTokenizeLineComment(pos)

  const token = createToken({
    kind: TokenKind.LineComment,
    value: chars.join(''),
    span: createTokenSpan({ begin, end, lines: [line] }),
  })
  return [token, my_pos]
}
export default useLineComment

// ---test
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it.concurrent('test useLineComment', () => {
    const raw = 'This is a line comment\n'
    const source = createSource(raw)
    const [token, pos] = useLineComment(source, 0, 1)
    const expect_pos = raw.length - 1
    const expect_token = createToken({
      kind: TokenKind.LineComment,
      value: 'This is a line comment',
      span: createTokenSpan({ begin: 0, end: expect_pos, lines: [1] }),
    })
    expect(pos).toBe(expect_pos)
    expect(token).toStrictEqual(expect_token)
  })
}
