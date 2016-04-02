import fs from 'fs';

import yargs from 'yargs';
import Promise from 'bluebird';
import rc from 'rc';

Promise.longStackTraces();
Promise.promisifyAll(fs);

import setup from './index';
import githubRepo from './github';
import { maybeSavePackageJson } from './save-repo-handlers';

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
    const conf = rc('cgr', {}, argv);

    let info = argv;

    if(info.name == null || info.name === '') {
        info = await getPackageJson();

        // TODO: if "info" contains a "repository", guess where to create repo to match it
    }

    const { name, description } = info;

    console.log(`Creating repository ${name} (${description})`);

    const createRepo = githubRepo(conf);

    const data = await setup({ name, description }, createRepo);

    console.log(`Created repository at "${data.url}".`);

    await maybeSavePackageJson(data);
}

Promise.resolve(main()).done();
