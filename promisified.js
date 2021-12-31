(async ()=>{
try {
    const puppeteer = require("puppeteer");
    const fs = require("fs");
    const browser = await puppeteer.launch({
        headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
    });
    const page = await browser.newPage();
    await page.goto("https://www.google.com/");
await page.type("input", "Amazon", { delay: 200 })
await page.click("input.gNO89b")
await  page.waitForSelector("a[href='https://www.amazon.in/")   
await page.click("a[href='https://www.amazon.in/")
await page.waitForSelector("#twotabsearchtextbox")
await page.type("#twotabsearchtextbox", "Macbook pro", { delay: 100 })
await page.type("#twotabsearchtextbox", String.fromCharCode(13))
await page.waitForTimeout(1000)
let eval = await page.evaluate(() => {
    let arr = [];
    let obj={}
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
}) //evaluate close
 fs.writeFileSync('promisedata.json', JSON.stringify(eval));
 const XLSX = require('xlsx');
        const workbook = XLSX.readFile('data.json');
        const ws = XLSX.utils.json_to_sheet(eval);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'data.xlsx');

}//try block end
 catch (error) {
    console.log(error);
}

})()