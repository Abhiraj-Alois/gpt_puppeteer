const {By, Builder, Key} = require('selenium-webdriver');

function delay(delayTime) {
    return new Promise((resolve) => setTimeout(resolve, delayTime));
}

(async function test() {
    let driver;
    
    // const username = 'Tiker bell'
    // const email = 'tinkerbelldemo@gmail.com'
    // const password = 'Alois@2024'
    
    try {
        const chromeDriverPath = 'chromedriver_win32\\chromedriver.exe'; 
        
        driver = await new Builder().forBrowser('chrome').setChromeOptions({
            binary: chromeDriverPath
        }).build();
        // await driver.get(`https://console.groq.com/playground?model=llama3-70b-8192?&api_key=${api_key}&username=${username}&email=${email}&password=${password}`);
        
        const url = 'https://chatgpt.com/'
        await driver.get(url);
        await delay(2000);
        
        const query = "Act as a recruiter and generate a job description based on provided skillset."
        const searchQuery = await driver.findElement(By.id('prompt-textarea'));

        const words = query.split(' ');
        for (let i = 0; i < words.length; i++) {
            await searchQuery.sendKeys(words[i] + ' '); 
        }
        // await searchQuery.sendKeys(query);
        await delay(2000);
        // await driver.findElement(By.xpath('/html/body/div[1]/div[1]/div/main/div[1]/div[2]/div[1]/div/form/div/div[2]/div/button/span/svg')).click();
        // await sendKeys('#prompt-textarea', formattedText);
        // await page.keyboard.press('Enter');        
        await driver.actions().sendKeys(searchQuery, Key.RETURN).perform()
        await delay(100);

    } catch(e) {
        console.log(e); 
    } finally {
        // await driver.quit();
    }
})();
