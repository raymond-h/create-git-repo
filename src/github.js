import Promise from 'bluebird';
import ghGot from 'gh-got';

Promise.promisifyAll(ghGot);

export default function githubRepo({ token }) {

    return async function createRepo({ name, description }) {

        const [data] = await ghGot.postAsync('user/repos', {
            token, body: JSON.stringify({ name, description })
        });

        return {
            owner: data.owner.login,
            name, description,
            url: data.html_url,
            upstreamUrl: data.clone_url
        };
    };
}
