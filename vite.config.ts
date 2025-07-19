import { defineConfig, loadEnv } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	return {
		base: '/vueIframe/',
		plugins: [
			vue(),
			legacy({
				targets: ['defaults', 'IE 11'],
				additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
			}),
			AutoImport({
				resolvers: [ElementPlusResolver()],
			}),
			Components({
				resolvers: [ElementPlusResolver()],
			}),
			ElementPlus({
				useSource: true,
			}),
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
			},
		},
		build: {
			target: 'es2015',
		},
		server: {
			proxy: {
				'/api': {
					target: env.VITE_PROXY_TARGET,
					changeOrigin: true,
					rewrite: (p) => p.replace(/^\/api/, ''),
				},
			},
		},
		preview: {
			// npm run preview（production）时生效
			proxy: {
				'/api': {
					target: env.VITE_PROXY_TARGET,
					changeOrigin: true,
					rewrite: (p) => p.replace(/^\/api/, ''),
				},
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
						@use "@/styles/_variables.scss" as *;
						@use "@/styles/_mixins.scss" as *;
					`,
				},
			},
		},
	};
});
