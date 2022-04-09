import { fileURLToPath, URL } from "url";
import WindiCSS from "vite-plugin-windicss";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import Components from "unplugin-vue-components/vite";

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
    ],

    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
