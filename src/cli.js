import 'babel-core/polyfill';

import yargs from 'yargs';
import * as Promise from 'bluebird';

Promise.longStackTraces();

import setup from './index';
import githubRepo from './github';

const argv = yargs
    .alias('t', 'token')
    .alias('n', 'name')
    .alias('desc', 'description')
    .alias('d', 'description')
    .argv;

async function main() {
    const { name, description } = argv;

    const createRepo = githubRepo({ token: argv.token });

    const data = await setup({ name, description }, createRepo);

    console.log(`Created repository at "${data.url}".`);
}

Promise.resolve(main()).done();
