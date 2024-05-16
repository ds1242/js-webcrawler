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
        const expected = ['https://blog.boot.dev/home']
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
        const expected = ['https://blog.boot.dev/home', 'https://blog.boot.dev/home']
        expect(actual).toEqual(expected)
    })
    test('deeper html check', () => {
        let htmlBody = `
        <html>
            <body>
                <a href="/home"><span>Go to Boot.dev</span></a>
                <h1>Title of Page</h1>
                <p> blah blah blah lots of stuff goes here </p>
                <p> blah blah blah lots of stuff goes here </p>
                <p> blah blah blah lots of stuff goes here </p>
                <h2> sub heading </h2> 
                <a href="https://blog.boot.dev/home"><span>Go to Boot.dev</span></a>
                <p> blah blah blah lots of stuff goes here </p>
                <p> blah blah blah lots of stuff goes here </p>
                <p> blah blah blah lots of stuff goes here </p>
                <h2> sub heading 2</h2> 
                <a href="/checkanotherpage"><span>Go to Boot.dev</span></a>
            </body>
        </html>
        `
        let url = 'https://blog.boot.dev'
        const actual = getURLsFromHTML(htmlBody, url)
        const expected = ['https://blog.boot.dev/home', 'https://blog.boot.dev/home', `https://blog.boot.dev/checkanotherpage`]
        expect(actual).toEqual(expected)
    })
    test('getURLsFromHTML both', () => {
        const inputURL = 'https://blog.boot.dev'
        const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
        const actual = getURLsFromHTML(inputBody, inputURL)
        const expected = ['https://blog.boot.dev/path/one', 'https://other.com/path/one']
        expect(actual).toEqual(expected)
    })
    test('getURLsFromHTML relative', () => {
        const inputURL = 'https://blog.boot.dev'
        const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
        const actual = getURLsFromHTML(inputBody, inputURL)
        const expected = ['https://blog.boot.dev/path/one']
        expect(actual).toEqual(expected)
    })
})