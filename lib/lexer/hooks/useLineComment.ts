import { type Source, createSource } from '~lib/lexer/utils'
import { type Token, TokenKind, createToken, createTokenSpan } from '~lib/token'
import { isLineFeed, peekChar } from '~lib/lexer/utils'

type Props = Readonly<{
  source: Source
  pos: number
  line: number
}>

const useLineComment = (props: Props): [Token, number] => {
  const line_comment_mark = props.source.raw.slice(props.pos, props.pos + 2)
  if (line_comment_mark !== '//') throw new Error(`Uncaught SyntaxError: Unexpected token '${line_comment_mark}'`)

  const begin = props.pos
  let pos = props.pos + 2
  let end = pos
  const chars: string[] = []

  const _tokenizeLineComment = (_pos: number): number => {
    const char = peekChar({ source: props.source, pos: _pos })
    if (char === null) return _pos
    else if (isLineFeed(char)) return _pos
    end += 1
    chars.push(char)
    return _tokenizeLineComment(_pos + 1)
  }
  pos = _tokenizeLineComment(pos)

  const token = createToken({
    kind: TokenKind.LineComment,
    value: chars.join(''),
    span: createTokenSpan({ begin, end, lines: [props.line] }),
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
