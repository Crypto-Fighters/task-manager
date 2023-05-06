const ethers = require('ethers');
const { exit } = require('process');
const snapshot = require('@snapshot-labs/snapshot.js');
const fetch = require('node-fetch');

// private key = 784976317f3c94a52f1178c66d86fc96728446168b8aecb61e38d0fe1dc518e5
// project = maturka.eth;
// vote = 1

let privateKey;
let project;
let vote;

const activeProps = [];

// Кастомный клиент для обработки исключений
class ClientCustom extends snapshot.Client712 {
    async send(envelop) {
        const url = `${this.address}/api/msg`;
        const init = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(envelop)
        };
        return new Promise((resolve, reject) => {
            fetch(url, init).then((res) => {
                if (res.ok) {
                    return resolve(res.json());
                }
                throw res;
            })
                .catch(async (e) => {
                    if (typeof e.text === 'function') {
                        const text = await e.text();
                        try {
                            const data = JSON.parse(text);
                            reject(data);
                        } catch (e) {
                            reject({error: 'Error', error_description: 'Can\'t parse json in fetch'});
                        }
                    } else {
                        reject({error: 'Error', error_description: e.message, error_stack: e.stack});
                    }
                });
        });
    }
}

/**
 * Абстрактная задержка
 * @returns
 * @param ms
 */

const wait = ms => new Promise(r => setTimeout(r, ms));

/**
 * Запись в итоговый результат
 * @param {String} address
 * @param {String} result
 * @returns
 */

const add_result = (address, result) => pretty_result.push({'Адрес': address, 'Результат': result});

/**
 * Случайное min/max целое значение
 * @param {Integer} min
 * @param {Integer} max
 * @returns Случайное число
 */

const randomIntInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Повторная отправка действия
 * @param {String} address адрес
 * @param {Arrow function} operation стрелочная функция
 * @param {Integer} delay задержка в милли секундах
 * @param {Integer} retries количество повторов
 * @returns Promise
 */

const retryOperation = (address, operation, delay, retries) => new Promise((resolve, reject) => {
    return operation
        .then(resolve)
        .catch((reason) => {
            if (retries > 0) {
                if (typeof reason === 'string' && (reason.includes('timeout') || reason.includes('failed')) && retries === 3) {
                    retries = 1000;
                }
                console.log(`(Ошибка) ${address} => повторная отправка действия, задержка: ${delay}с, осталось попыток: ${retries - 1}`);
                return wait(delay*1000)
                    .then(retryOperation.bind(null, address, operation, delay, retries - 1))
                    .then(resolve)
                    .catch(reject);
            }
            return reject(reason);
        });
});

/**
 * Голосование
 * @param {Wallet} ethWallet
 * @param {String} address
 * @param {String} prop
 * @returns Promise
 */

const voteSnap = (ethWallet, address, prop) => new Promise(async (resolve, reject) => {
    await client.vote(ethWallet, address, {
        space: project,
        proposal: prop,
        type: type_voting === 0 ? 'single-choice' : 'approval',
        choice: rand_mode === 0 ? type_voting === 0 ? vote : Array.isArray(vote) ? vote : [vote] : type_voting === 0 ? randomIntInRange(random_min, random_max) : [randomIntInRange(random_min, random_max)],
        reason: '',
        app: 'snapshot'
    }).then((result) => {
        if (result.hasOwnProperty('id')) {
            console.log(`(Голосование) ${address} => голос засчитан`);
            add_result(address, 'засчитано');
        } else {
            console.log(`(Голосование) ${address} =>`);
            console.dir(result);
            add_result(address, 'неизвестно');
        }
        resolve();
    }).catch((err) => {
        if (typeof err.error_description !== 'string') {
            console.log(`(Голосование) ${address} => ошибка "${err.error}":`);
            console.dir(err.error_description);
            if (err.hasOwnProperty('error_stack')) {
                console.log(err.error_stack);
            }
        } else {
            console.log(`(Голосование) ${address} => ошибка "${err.error}": ${err.error_description}`);
            if (err.hasOwnProperty('error_stack')) {
                console.log(err.error_stack);
            }
        }
        add_result(address, `${err.error}: ${err.error_description}`);
        ((typeof err.error_description === 'string' && (err.error_description.includes('timeout') || err.error_description.includes('many') || err.error_description.includes('failed'))) || typeof err.error_description !== 'string') ? reject(err.error_description) : resolve();
    });
});

/**
 * Подписка
 * @param ethWallet
 * @param {String} address
 * @returns Promise
 */

const subSnap = (ethWallet, address) => new Promise(async (resolve, reject) => {
    await client.follow(ethWallet, address, {
        space: project
    }).then((result) => {
        if (result.hasOwnProperty('id')) {
            console.log(`(Подписка) ${address} => вы подписались`);
        } else {
            console.log(`(Подписка) ${address} =>`);
            console.dir(result);
        }
        resolve();
    }).catch((err) => {
        if (typeof err.error_description !== 'string') {
            console.log(`(Подписка) ${address} => ошибка "${err.error}":`);
            console.dir(err.error_description);
            if (err.hasOwnProperty('error_stack')) {
                console.log(err.error_stack);
            }
        } else {
            console.log(`(Подписка) ${address} => ошибка "${err.error}": ${err.error_description}`);
            if (err.hasOwnProperty('error_stack')) {
                console.log(err.error_stack);
            }
        }
        ((typeof err.error_description === 'string' && (err.error_description.includes('timeout') || err.error_description.includes('many') || err.error_description.includes('failed'))) || typeof err.error_description !== 'string') ? reject(err.error_description) : resolve();
    });
});

// rpc node url
const url = "https://rpc.ankr.com/eth";
// Базовые переменные
let rand_mode = 0; // 0 => стандартный, 1 => рандомная отправка варианта

let random_min = 1; // минимальный номер в голосовании
let random_max = 3; // максимальный номер в голосовании
const isSleep = true; // задержка перед отправкой, нужна ли? изменить на true, если нужна
const sleep_from = 3; // от 30 секунд
const sleep_to = 10; // до 60 секунд
const type_voting = 0; // 0 => стандартный, 1 => approval
let isParseProps = true;

async function startSnapshotVoting(_privateKey, _project, _vote, metamaskObject) {
    privateKey = _privateKey;
    project = _project;
    vote = _vote;
    rand_mode = vote.includes('random') ? 1 : 0;

    // Unhandled errors/promises, fix app crash
    process.on('uncaughtException', (error, origin) => {
        console.log('----- Uncaught exception -----');
        console.dir(error);
        console.log('----- Exception origin -----');
        console.dir(origin);
    });

    process.on('unhandledRejection', (reason, promise) => {
        console.log('----- Unhandled Rejection at -----');
        console.dir(promise);
        console.log('----- Reason -----');
        console.dir(reason);
    });

        // Парсинг
    if (isParseProps) {
        let q = `
            query {
                proposals (
                  where: {
                    space_in: ["${project}"],
                    state: "active"
                  }
                ) {
                  id, choices
                }
              }`;
        await fetch('https://hub.snapshot.org/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: q})
        }).then(r => r.json()).then(data => {
            if (data.hasOwnProperty('data') && data.data.hasOwnProperty('proposals')) {
                if (data.data.proposals.length) {
                    activeProps.push(data.data.proposals[0].id);
                    random_min = 1;
                    random_max = data.data.proposals[0].choices.length + 1;
                }
                else {
                    console.log(`Нету активного голосования для проекта: ${project}`);
                }
            } else {
                console.log('Ошибка при парсинге данных.')
            }
        });
        exit();
    }


// Запуск rpc
    const web3 = new ethers.providers.Web3Provider(metamaskObject);
    const hub = 'https://hub.snapshot.org'; // or https://testnet.snapshot.org for testnet
    const client = new ClientCustom(hub);

    let promises = [], pretty_result = [];

    if (privateKey) {
        const ethWallet = new ethers.Wallet(privateKey, web3);
        const address = await ethWallet.getAddress();
        promises.push(new Promise(async (resolve, reject) => {

            // Голосование

            let prom_list = [];
            activeProps.forEach((prop) => prom_list.push(retryOperation(address, voteSnap(ethWallet, address, prop), isSleep ? randomIntInRange(sleep_from, sleep_to) : 1, 3)));

            // Подписка

            activeProps.push(retryOperation(address, subSnap(ethWallet, address), isSleep ? randomIntInRange(sleep_from, sleep_to) : 1, 3));

            await Promise.allSettled(prom_list).then(() => resolve());

        }));

        // Результат
        await Promise.allSettled(promises).then(() => console.table(pretty_result));
    }
}

module.exports = startSnapshotVoting;
