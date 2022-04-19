import { fileURLToPath, URL } from "url";
import WindiCSS from "vite-plugin-windicss";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import Components from "unplugin-vue-components/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        WindiCSS(),

        svgLoader({
            defaultImport: "component",
        }),

        Components({
            dirs: ["src/components", "src/assets/icons"],
            extensions: ["vue", "svg"],
            directoryAsNamespace: true,
            globalNamespaces: ["common"],
            dts: true,
        }),

        VitePWA({
            includeAssets: [
                "favicon.svg",
                "favicon.ico",
                "robots.txt",
                "apple-touch-icon.png",
            ],
            manifest: {
                name: "Calc Stuffs - Calculate Your Stuffs",
                short_name: "Calc Stuffs",
                description: "Calculate Your Stuffs",
                theme_color: "#ef4444d9",
                icons: [
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-384x384.png",
                        sizes: "384x384",
                        type: "image/png",
                    },
                    {
                        src: "pwa-384x384.png",
                        sizes: "384x384",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                ],
            },
        }),
    ],

    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },

    server: {
        host: true,
    },
});
