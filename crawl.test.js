import { test, expect, describe } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl";

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
    test('normalizeURL http', () => {
        const input = 'http://BLOG.boot.dev/path'
        const actual = normalizeURL(input)
        const expected = 'blog.boot.dev/path'
        expect(actual).toEqual(expected)
    })
    test('normalizeURL capitals', () => {
        const input = 'https://BLOG.boot.dev/path'
        const actual = normalizeURL(input)
        const expected = 'blog.boot.dev/path'
        expect(actual).toEqual(expected)
      })
})

describe('getURLsFromHTML', () => {
    test('extract anchor', () => {
        let htmlBody = `
        <html>
            <body>
                <a href="/home"><span>Go to Boot.dev</span></a>
            </body>
        </html>
        `
        let url = 'https://blog.boot.dev'
        const actual = getURLsFromHTML(htmlBody, url)
        const expected = ['blog.boot.dev/home']
        expect(actual).toEqual(expected)
    })
    test('multiple anchors', () => {
        let htmlBody = `
        <html>
            <body>
                <a href="/home"><span>Go to Boot.dev</span></a>
                <a href="https://blog.boot.dev/home"><span>Go to Boot.dev</span></a>
            </body>
        </html>
        `
        let url = 'https://blog.boot.dev'
        const actual = getURLsFromHTML(htmlBody, url)
        const expected = ['blog.boot.dev/home', 'blog.boot.dev/home']
        expect(actual).toEqual(expected)
    })
})