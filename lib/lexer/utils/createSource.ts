export interface Source {
  readonly raw: string
  readonly length: number
}

const createSource = (raw: string): Source => {
  return { raw, length: raw.length }
}
export default createSource

// ---test
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it.concurrent('test createSource', () => {
    const raw = 'test'
    const source = createSource(raw)
    const expect_source = { raw, length: raw.length }
    expect(source).toStrictEqual(expect_source)
  })
}
