import fs from 'fs';
import Promise from 'bluebird';

// to really make sure there are promisified versions both here and in cli.js
// by adding this, we can rely less on how functions and imports are hoisted
Promise.promisifyAll(fs);

export async function maybeSavePackageJson(repoData) {
    try {
        await fs.accessAsync('./package.json', fs.F_OK);
    }
    catch(err) {
        // file does not exist!!
        console.error(err);
        return;
    }

    const obj = JSON.parse(
        await fs.readFileAsync('./package.json', { encoding: 'utf-8' })
    );

    obj.repository = {
        type: 'git',
        url: repoData.url
    };

    const newJson = JSON.stringify(obj, null, '  ');

    await fs.writeFileAsync('./package.json', newJson, { encoding: 'utf-8' });
}
