const puppeteer = require("puppeteer")
const nodexl = require("node-xlsx");
const fs = require("fs")
let page;
let browser;

puppeteer.launch({
    //launching chromium
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
}).then(br => {
    //opening newpage
    browser = br;
    return br.newPage();
}).then(pg => {
    //requesting url using goto
    page = pg;
    return page.goto("https://www.google.com/");
}).then(type => {
    //typing into the browser
    return page.type("input", "Amazon", { delay: 200 })
}).then(click => {
    //clicking on search button
    return page.click("input.gNO89b")
}).then(waitfoamazon => {
    //waiting for opening amamzon.in
    return page.waitForSelector("a[href='https://www.amazon.in/")
}).then(clickonamazon => {
    //opening amazon .in
    return page.click("a[href='https://www.amazon.in/")
}).then(waitforamazoninput => {
    //waiting for searchbox of amzon opening
    return page.waitForSelector("#twotabsearchtextbox")
}).then(typeamazonsearch => {
    //typing on input box of amazon
    return page.type("#twotabsearchtextbox", "Macbook pro", { delay: 100 })
}).then(clickonamazonsearch => {
    //clicking on search button of amazon input
    return page.type("#twotabsearchtextbox", String.fromCharCode(13))
}).then(wait => {
    return page.waitForTimeout(1000)
}).then(res => {
    page.evaluate(() => {
        let arr = []
        // to get the prices of laptops 
        let dataArr = document.querySelectorAll('.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20')
        dataArr.forEach(laptop => {

            let laptopName = laptop.querySelector("h2")
            laptopName = laptopName.innerText

            let laptopPrice = laptop.querySelectorAll("span.a-price .a-offscreen")
            laptopPrice = laptopPrice[0].innerText

            arr.push({
               laptopName,
                laptopPrice
            })
        })
        return arr;
        // somehow write it in text file
    })
}).then((res) => {
    fs.writeFileSync('data.json', JSON.stringify(res))

    const XLSX = require('xlsx');
    const workbook = XLSX.readFile('report.json');
    const ws = XLSX.utils.json_to_sheet(res);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
    XLSX.writeFile(wb,'data.xlsx');
}).then(()=>{
    
})