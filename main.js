import { argv } from'node:process'
import { normalizeURL, getURLsFromHTML } from "./crawl.js"

function main() {
    if (argv.length >= 4) {
        console.error('Too Many Arugments');
        return;
    }
    if (argv.length < 3) {
        console.error('Please enter a URL');
        return;
    }
    let array = getURLsFromHTML(argv[2])
    console.log(array)
}

main()