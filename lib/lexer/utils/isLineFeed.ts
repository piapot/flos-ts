const isLineFeed = (char: string) => {
  return char === '\n'
}
export default isLineFeed

// ---test
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it.concurrent('test isLineFeed', () => {
    const is_line_feed = isLineFeed('\n')
    const not_is_line_feed_char = isLineFeed('\t')
    expect(is_line_feed).toBeTruthy()
    expect(not_is_line_feed_char).toBeFalsy()
  })
}
