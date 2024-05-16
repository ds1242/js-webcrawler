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
            // if (anchorArr[i].href.slice(0, baseURL.length) === baseURL) {
            //     hrefArr.push(normalizeURL(anchorArr[i].href))
            // } else {
            //     let stringToAdd = `${baseURL}${anchorArr[i].href}`
            //     hrefArr.push(normalizeURL(stringToAdd))
            // }
        }
    }
    return hrefArr
}



export { normalizeURL, getURLsFromHTML }
