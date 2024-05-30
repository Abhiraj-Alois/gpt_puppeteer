const puppeteer = require('puppeteer');

function delay(delayTime) {
    return new Promise((resolve) => setTimeout(resolve, delayTime));
}

(async () => {
    const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });
    const page = await browser.newPage();

    // Navigate to ChatGPT.com
    await page.goto('https://chatgpt.com/', { waitUntil: 'networkidle2' });

    await delay(2000);

    const query = "Act as a recruiter and generate a job description based on a python developer.";
    const textareaSelector = '#prompt-textarea';
    await page.type(textareaSelector, query, { delay: 1 });

    await delay(2000);
    
    await page.keyboard.press('Enter');

    await delay(22000);

    // ChatGPT response id selector
    const selector = "#__next"; 
    const response = await page.$eval(selector, element => element.textContent);
    
    // const elementHandle = await page.$('p');
    // const response = await page.evaluate((element) => element.textContent.trim(), elementHandle);

    const splitText = response.split("ChatGPTChatGPT");
    let desiredText = splitText[1];

    const stringToRemove = "Don't share sensitive info. Chats may be reviewed and used to train our models. Learn moreChatGPT can make mistakes. Check important info.?";
    desiredText = desiredText.replace(stringToRemove, ' ');   

    console.log('ChatGPT Response:', desiredText);

    await browser.close();
})();
