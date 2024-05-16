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
    let anchorArr = dom.window.document.querySelectorAll('a')
    let hrefArr = [] 
    for (let i = 0; i < anchorArr.length; i++) {
        if (anchorArr[i].href) {
            try {
                let href = new URL(anchorArr[i].href, baseURL).href
                hrefArr.push(href)
            } catch (error) {
                console.log(`${error.message}: ${anchorArr[i]}`)
            }
        }
    }
    return hrefArr
}

async function crawlPage(currentURL) {
    try {
        const response = await fetch(currentURL, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'text/html'
            }
        })
        if (response.status >= 400) {
            console.error('Error getting that page');
            return;
        }
        if(!response.headers.get("Content-Type").includes('text/html')) {
            console.error('Not text/html');
            return;
        }
        const responseBody = await response.text()
        console.log(responseBody)
    } catch (error) {
        console.error('Error getting that page');
    }
}

export { normalizeURL, getURLsFromHTML, crawlPage }
