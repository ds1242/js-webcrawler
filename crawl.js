function normalizeURL(urlToParse) {
    const myURL = new URL(urlToParse)
    let parsedURL = `${myURL.host}${myURL.pathname}`
    return parsedURL
}

export { normalizeURL }
