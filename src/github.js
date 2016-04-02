import ghGot from 'gh-got';

export default function githubRepo({ token }) {

    return async function createRepo({ name, description }) {

        const res = await ghGot.post('user/repos', {
            token, body: JSON.stringify({ name, description })
        });

        const data = res.body;

        return {
            owner: data.owner.login,
            name, description,
            url: data.html_url,
            upstreamUrl: data.clone_url
        };
    };
}
