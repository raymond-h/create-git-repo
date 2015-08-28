import 'babel-core/polyfill';

import fs from 'fs';

import yargs from 'yargs';
import Promise from 'bluebird';

Promise.longStackTraces();
Promise.promisifyAll(fs);

import setup from './index';
import githubRepo from './github';

const argv = yargs
    .alias('t', 'token')
    .alias('n', 'name')
    .alias('desc', 'description')
    .alias('d', 'description')
    .argv;

async function getPackageJson() {
    const data = await fs.readFileAsync('./package.json', { encoding: 'utf-8' });

    return JSON.parse(data);
}

async function main() {
    let info = argv;

    if(info.name == null || info.name === '') {
        info = await getPackageJson();
    }

    const { name, description } = info;

    console.log(`Creating repository ${name} (${description})`);

    const createRepo = githubRepo({ token: argv.token });

    const data = await setup({ name, description }, createRepo);

    console.log(`Created repository at "${data.url}".`);
}

Promise.resolve(main()).done();
