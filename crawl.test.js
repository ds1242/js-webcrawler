import { test, expect, describe } from "@jest/globals";
import { normalizeURL } from "./crawl";

describe('normalize urls', () => {
    test('remove https://', () => {
        expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path')
    })
    test('remove http://', () => {
        expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path')
    })
    test('remove last /', () => {
        expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
    })
    test('remove last / on https', () => {
        expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
    })
    test('no change', () => {
        expect(normalizeURL('blog.boot.dev/path')).toBe('blog.boot.dev/path')
    })
})