import 'babel-core/polyfill';
import * as child_process from 'child_process';

import Promise from 'bluebird';

Promise.promisifyAll(child_process);

function exec(cmd) {
    console.log('>>', cmd);
    return child_process.execAsync(cmd);
}

export default async function setup(info, createRepo, opts) {
    opts = opts || {};
    const remoteName = opts.remoteName || 'origin';
    const branch = opts.branch || 'master';

    await exec('git init');

    const res = await createRepo(info);

    await exec(`git remote add ${remoteName} ${res.upstreamUrl}`);
    await exec(`git push --set-upstream ${remoteName} ${branch}`);

    return res;
}
