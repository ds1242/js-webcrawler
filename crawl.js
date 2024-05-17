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

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    let base = new URL(baseURL)
    let current = new URL(currentURL)
    if(base.host !== current.host) {
        return pages
    }

    let normalizedCurrent = normalizeURL(currentURL)

    if (pages[normalizedCurrent]) {        
        pages[normalizedCurrent] += 1
        return pages
    } else {
        pages[normalizedCurrent] = 1
    }

    let htmlBody = await fetchCurrent(currentURL)
    let newURLs = getURLsFromHTML(htmlBody, currentURL)
    for (const url of newURLs) {
        pages = await crawlPage(baseURL, url, pages)
    }    
    return pages
}

async function fetchCurrent(currentURL) {
    let response
    try {
        response = await fetch(`${currentURL}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'text/html'
            }
        })
    } catch (error) {
        throw new Error(`Got Network error: ${error.message}`)
    }
    if (response.status > 399) {
        console.log(`Got HTTP error: ${res.status} ${res.statusText}`)
        return;
    }
    const contentType = response.headers.get("Content-Type")
    if(!contentType || !contentType.includes('text/html')) {
        console.error(`Not text/html response ${contentType}`);
        return;
    }
    const responseBody = await response.text()
    return responseBody
}

export { normalizeURL, getURLsFromHTML, crawlPage }
