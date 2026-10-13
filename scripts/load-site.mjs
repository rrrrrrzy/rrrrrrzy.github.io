import { createServer } from 'vite';

export async function withSite(callback) {
    const server = await createServer({ server: { hmr: false, watch: null }, appType: 'custom' });
    try {
        await server.pluginContainer.buildStart({});
        return await callback(await server.ssrLoadModule('/src/entry-server.jsx'), server);
    } finally {
        await server.close();
    }
}
