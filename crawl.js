function normalizeURL(urlToParse) {
    const myURL = new URL(urlToParse)
    let pathname = myURL.pathname
    if (pathname.slice(-1) === '/') {
        pathname = pathname.slice(0, -1)
    }
    let parsedURL = `${myURL.host}${pathname}`
    return parsedURL
}


export { normalizeURL }
