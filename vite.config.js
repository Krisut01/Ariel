import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.js',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    server: {
        watch: {
            usePolling: true,
        },
    },
    build: {
        rollupOptions: {
            external: ['ziggy-js'], // Mark ziggy-js as external to avoid resolution issues
        },
    },
    base: process.env.APP_URL || '/', // Ensures correct asset resolution in production
});
