import { JSDOM } from 'jsdom';

function normalizeURL(urlToParse) {
    const myURL = new URL(urlToParse)
    let pathname = myURL.pathname
    if (pathname.slice(-1) === '/') {
        pathname = pathname.slice(0, -1)
    }
    let parsedURL = `${myURL.host}${pathname}`
    return parsedURL
}


function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody)
    let anchorArr = []
    anchorArr = dom.window.document.querySelectorAll('a')
    console.log(dom.window.document.querySelectorAll('a'))
    return anchorArr
}


let htmlTest = `
<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    </body>
</html>
`
let url = `https://blog.boot.dev`

getURLsFromHTML(htmlTest, url)

export { normalizeURL, getURLsFromHTML }
