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
})

describe('getURLsFromHTML', () => {
    test('extract anchor', () => {
        let htmlBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
            </body>
        </html>
        `
        let url = 'https://blog.boot.dev'
        let array = getURLsFromHTML(htmlBody, url)
        console.log(array)
    })
})