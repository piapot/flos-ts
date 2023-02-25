export enum TokenKind {
  Whitespace = 1,
  LineComment,
  BlockComment,
  Identifier,

  // Type
  Int,
  String,
  Bool,

  // KeyWord
  Let = 'let',
  Mut = 'mut',
  Const = 'const',
  If = 'if',
  Elif = 'elif',
  Else = 'else',
  And = 'and',
  Or = 'or',
  For = 'for',
  Of = 'of',
  While = 'while',
  When = 'when',
  Case = 'case',
  Fn = 'fn',
  Break = 'break',
  Continue = 'continue',
  Return = 'return',
  Type = 'type',
  Enum = 'enum',
  As = 'as',

  // Single operator
  /* `+` */ Plus = '+',
  /* `-` */ Minus = '-',
  /* `*` */ Asterisk = '*',
  /* `/` */ Solidus = '/',
  /* `\` */ ReverseSolidus = '\\',
  /* `&` */ Ampersand = '&',
  /* `@` */ AtMark = '@',
  /* `#` */ Hashtag = '#',
  /* `$` */ Dollar = '$',
  /* `%` */ Percent = '%',
  /* `~` */ Tilde = '~',
  /* `^` */ Circumflex = '^',
  /* `|` */ VerticalLine = '|',
  /* `'` */ Apostrophe = "'",
  /* `(` */ LeftParen = '(',
  /* `)` */ RightParen = ')',
  /* `[` */ LeftSquareBracket = '[',
  /* `]` */ RightSquareBracket = ']',
  /* `{` */ LeftCurlyBracket = '{',
  /* `｝` */ RightCurlyBracket = '}',
  /* `<` */ LessThan = '<',
  /* `>` */ GreaterThan = '>',
  /* `.` */ FullStop = '.',
  /* `,` */ Comma = ',',
  /* `!` */ Exclamation = '!',
  /* `?` */ Question = '?',
  /* `:` */ Colon = ':',
  /* `;` */ Semicolon = ';',
  /* `=` */ Assign = '=',

  // Double operator
  /* `==` */ Equal = '==',
  /* `<=` */ LessEqual = '<=',
  /* `>=` */ GreaterEqual = '>=',
  /* `!=` */ NotEqual = '!=',
  /* `+=` */ PlusAssign = '+=',
  /* `-= */ MinusAssign = '-=',
  /* `*=` */ MultiplyAssign = '*=',
  /* `/=` */ DivideAssign = '/=',
  /* `%=` */ SurplusAssign = '%=',
  /* `^=` */ XorAssign = '^=',
  /* `&=` */ AndAssign = '&=',
  /* `|=` */ OrAssign = '|=',
  /* `->` */ SingleArrow = '->',
  /* `=>` */ DoubleArrow = '=>',
  /* `<<` */ LeftShift = '<<',
  /* `>>` */ RightShift = '>>',
  /* `**` */ PowerMark = '**',

  // Triple operator
  /* `<<=` */ LeftShiftAssign = '<<=',
  /* `>>=` */ RightShiftAssign = '>>=',
}

export interface TokenSpan {
  begin: number
  end: number
  lines: number[]
}

export const createTokenSpan = (token_span: TokenSpan) => {
  return token_span
}

export interface Token {
  kind: TokenKind
  value: string
  span: TokenSpan
}

export const createToken = (token: Token) => {
  return token
}
