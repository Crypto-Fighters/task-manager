const cli = require("node-cli-params");
const getActivePropId = require("./snapshot");

const puppeteer = require('puppeteer');
const path = require('path');
const projects = cli.getKey('projects').split('|');
const vote = cli.getKey('vote');

const metamaskPh = cli.getKey('metamaskPhrases');
// accuse stand turtle shallow immense huge rude ankle visa daughter traffic weird
const phrases = [metamaskPh, "Dimas23##"];

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time)
    });
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

try {
    (async () => {
        const extensionID = 'hbkpbplbjpiieigagpncfimkmedileko';
        const pathToExtension = path.join(process.cwd(), extensionID);

        const browser = await puppeteer.launch({headless: 'new', args: [
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--no-first-run',
                '----no-zygote',
                '--single-process',
                '--disable-site-isolation-trials',
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`,
            ],
            executablePath: '/usr/bin/chromium-browser',
        });



        await delay(6000);

        const pages = await browser.pages()

        await delay(6000);



        let page = pages.find(p =>
            p.url().includes(`chrome-extension://${extensionID}/home.html`) ||
            p.url().includes(`home.html#onboarding/welcome`));
        if (!page) {
            page = await browser.newPage('');
            await page.goto(`chrome-extension://${extensionID}/home.html#onboarding/welcome`);
        }

        page.setDefaultTimeout(120000);

        // await delay(10000000);

        await page.click('button[data-testid="onboarding-import-wallet"]');

        await page.click('button[data-testid="metametrics-i-agree"]');

        console.log('start');

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

        await delay(3000);

        const completionPage = pages.find(p => p.url().includes(`#onboarding/completion`));
        completionPage.setDefaultTimeout(120000);
        await completionPage.waitForSelector('button[data-testid="onboarding-complete-done');

        await delay(3000);

        await completionPage.click('button[data-testid="onboarding-complete-done"]');

        await completionPage.waitForSelector('button[data-testid="pin-extension-next');
        await completionPage.click('button[data-testid="pin-extension-next"]');

        await completionPage.waitForSelector('button[data-testid="pin-extension-done');
        await completionPage.click('button[data-testid="pin-extension-done"]');

        await completionPage.waitForSelector('div[data-testid="eth-overview__primary-currency"]');

        await completionPage.click('button[data-testid="selected-account-click');

        const context = browser.defaultBrowserContext();
        await context.overridePermissions(completionPage.url(), ['clipboard-read']);

        const metamaskWallet = await page.evaluate(() => navigator.clipboard.readText());

        await delay(2000);

        let activeProp = undefined;

        for (const project of projects) {
            do {
                console.log(project);
                activeProp = await getActivePropId(project, metamaskWallet);

                if (activeProp !== undefined) {
                    const [propId, maxVoteNumber] = activeProp;

                    await page.goto(`https://snapshot.org/#/${project}/proposal/${propId}`);

                    await delay(10000);

                    if (await page.$('button[data-testid="post-vote-modal-close"]') !== null) {
                        await page.click('button[data-testid="post-vote-modal-close"]');
                    }

                    if (await page.$('button[data-testid="button-connect-wallet"]') !== null) {
                        await page.waitForSelector('button[data-testid="button-connect-wallet"]');

                        await page.click('button[data-testid="button-connect-wallet"]');

                        await page.waitForSelector('button[data-testid="button-connnect-wallet-injected"]');
                        await page.click('button[data-testid="button-connnect-wallet-injected"]');

                        await delay(6000);

                        const target = browser.targets().find(p => p.url().includes(`notification.html#connect`));

                        const targetPage = await target.page();

                        await targetPage.waitForSelector('button[class*="btn-primary"]');
                        await targetPage.click('button[class*="btn-primary"]');

                        await targetPage.waitForSelector('button[data-testid="page-container-footer-next"]');
                        await targetPage.click('button[data-testid="page-container-footer-next"]');

                    }

                    await delay(5000);

                    if (vote === 'random') {
                        const voteNumber = randomInteger(0, maxVoteNumber);
                        await page.waitForSelector(`button[data-testid="sc-choice-button-${voteNumber}"]`);
                        await page.click(`button[data-testid="sc-choice-button-${voteNumber}"]`);

                        await delay(2000);

                        await page.waitForSelector(`button[data-testid="proposal-vote-button"]`);
                        await page.click(`button[data-testid="proposal-vote-button"]`);

                        await delay(4000);

                        await page.waitForSelector(`button[data-testid="confirm-vote-button"]`);
                        await page.click(`button[data-testid="confirm-vote-button"]`);

                        await delay(2000);


                        const target2 = browser.targets().find(p => p.url().includes(`notification.html`));
                        console.log(browser.targets().map(p => p.url()));

                        const pg = await target2.page();

                        pg.setDefaultTimeout(120000);

                        await delay(1000);

                        await pg.setViewport({width: 500, height: 700});

                        await pg.waitForSelector(`div[data-testid="signature-request-scroll-button"]`);
                        await pg.click(`div[data-testid="signature-request-scroll-button"]`);

                        await delay(2000);

                        await pg.waitForSelector(`button[data-testid="page-container-footer-next"]`);
                        await pg.click(`button[data-testid="page-container-footer-next"]`);
                    }

                    await delay(15000);
                }
            } while(activeProp !== undefined)
        }

        await browser.close();
    })();
}
catch (e) {
    console.log(e);
}
