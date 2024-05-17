

function printReport(pages) {
    console.log(`Generating Report`);
    const pagesArr = sortPagesObj(pages)
    for (let i = 0; i < pagesArr.length; i++) {
        const element = pagesArr[i];
        console.log(`Found ${element.count} internal links to ${element.url}`)
    }

}

function sortPagesObj(pages) {
    let outputArr = []
    for (const url in pages) {
        if (Object.hasOwnProperty.call(pages, url)) {
            const count = pages[url];
            const urlVal = url
            outputArr.push({url: urlVal, count: count})
        }
    }
    outputArr.sort((a, b) => b.count - a.count)
    return outputArr
}

export { printReport }