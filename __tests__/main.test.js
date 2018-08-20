/**
 * @file main
 * @author imcuttle
 * @date 2018/4/4
 */
import { double, single, default as quote } from '../'

it('should quote-it double passed', function() {
  expect(double('sbac')).toBe('"sbac"')
  expect(double('sb/ac')).toBe('"sb/ac"')
  expect(double('sb\\ac')).toBe('"sb\\\\ac"')
  expect(double('sb\\ac')).toBe(JSON.stringify('sb\\ac'))
  expect(double('sbsac')).toBe('"sbsac"')
  expect(double('sb"a\'c')).toBe('"sb\\"a\'c"')
})

it('should quote-it single passed', function() {
  expect(single("'sbac")).toBe("'\\'sbac'")
  expect(single("sb'a'c\"")).toBe("'sb\\'a\\'c\"'")
})

it('should quote-it other character passed', function() {
  expect(quote('hello%world', '%')).toBe('%hello\\%world%')
  expect(quote('hello[world', '[')).toBe('[hello\\[world[')
  expect(quote('hello-world', '-')).toBe('-hello\\-world-')
  expect(quote('hello$world', '$')).toBe('$hello\\$world$')
  expect(quote('[]hel\\lo[]world[]', '[]')).toBe('[][]hel\\lo[]world[][]')
  expect(quote('hello world', 'w')).toBe('whello \\worldw')
})
