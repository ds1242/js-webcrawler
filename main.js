import { argv } from'node:process'
import { normalizeURL, getURLsFromHTML, crawlPage } from "./crawl.js"

async function main() {
    if (argv.length >= 4) {
        console.error('Too Many Arugments');
        return;
    }
    if (argv.length < 3) {
        console.error('Please enter a URL');
        return;
    }
    
    let baseURL = argv[2]
    console.log(`Using ${baseURL} as the base URL for crawl...`)
    try {
        await crawlPage(baseURL)
    } catch(err) {
        console.log(`${err} unable to crawl page`)
    }

}

main()