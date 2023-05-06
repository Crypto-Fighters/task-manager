const cli = require("node-cli-params");
const { startSnapshotVoting } = require("./snapshot");



const puppeteer = require('puppeteer');
const path = require('path');
const phrases = ["accuse stand turtle shallow immense huge rude ankle visa daughter traffic weird", "Dimas23##"];

const privateKey = cli.getKey('privateKey');
const project = cli.getKey('project');
const vote = cli.getKey('vote') ? cli.getKey('vote').includes(',') ? cli.getKey('vote').split(',').map(Number) : cli.getKey('vote') : '1';

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time)
    });
}

try {
    (async () => {
        const extensionID = 'hbkpbplbjpiieigagpncfimkmedileko';
        const pathToExtension = path.join(process.cwd(), extensionID);
        const browser = await puppeteer.launch({headless: false, args: [
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--no-first-run',
                '----no-zygote',
                '--single-process',
                '--disable-site-isolation-trials',
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`,
            ]});

        await delay(6000);

        const pages = await browser.pages()

        let page = pages.find(p => p.url().includes(`chrome-extension://${extensionID}/home.html`));
        if (!page) {
            page = await browser.newPage('');
            await page.goto(`chrome-extension://${extensionID}/home.html#onboarding/welcome`);
        }

        await page.click('button[data-testid="onboarding-import-wallet"]');

        await page.click('button[data-testid="metametrics-i-agree"]');

        let index = 0
        for (const text of phrases[0].split(' ')) {
            await page.type(`input[data-testid="import-srp__srp-word-${index}"]`, text);
            index++;
        }

        await page.click('button[data-testid="import-srp-confirm"]');

        await page.waitForSelector('input[data-testid="create-password-new"]');

        await page.type('input[data-testid="create-password-new"]', phrases[1]);

        await page.type('input[data-testid="create-password-confirm"]', phrases[1]);

        await page.click('input[data-testid="create-password-terms"]');

        await page.click('button[data-testid="create-password-import"]');

        await page.goto(`chrome-extension://${extensionID}/home.html#onboarding/completion`);


        await page.waitForSelector('button[data-testid="onboarding-complete-done');

        await delay(3000);

        await page.click('button[data-testid="onboarding-complete-done"]');


        await page.waitForSelector('button[data-testid="pin-extension-next');
        await page.click('button[data-testid="pin-extension-next"]');

        await page.waitForSelector('button[data-testid="pin-extension-done');
        await page.click('button[data-testid="pin-extension-done"]');


        await page.waitForSelector('div[data-testid="eth-overview__primary-currency"]');

        await page.goto('https://snapshot.org');

        await page.waitForSelector('button[data-testid="button-connect-wallet"]');
        await page.click('button[data-testid="button-connect-wallet"]');

        await page.waitForSelector('button[data-testid="button-connnect-wallet-injected"]');
        await page.click('button[data-testid="button-connnect-wallet-injected"]');

        await delay(6000);

        const newP = await browser.newPage();

        await newP.goto("chrome-extension://pbhkpaaodgdfhpphppjmheimjcmcliio/notification.html#connect");

        await newP.waitForSelector('button[class*="btn-primary"]');
        await newP.click('button[class*="btn-primary"]');

        await newP.waitForSelector('button[data-testid="page-container-footer-next"]');
        await newP.click('button[data-testid="page-container-footer-next"]');
        await newP.close();

        // await newP.goto('https://snapshot.org/#/');


        await delay(120000);

        const metamaskObject = await page.evaluate(() => window.ethereum)
        await startSnapshotVoting(privateKey, project, vote, metamaskObject);

        await browser.close();
    })();
}
catch (e) {
    console.log(e);
}
