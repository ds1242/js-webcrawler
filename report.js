

function printReport(pages) {
    console.log(`Generating Report`);
    const pagesArr = sortPagesObj(pages)
    

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
}

export { printReport }