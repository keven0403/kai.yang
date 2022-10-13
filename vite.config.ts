import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	//静态资源服务的文件夹
	publicDir: "public",
	base: '/',

	plugins: [react()],

	resolve: {
		alias: {
			"@": path.resolve(__dirname, 'src'),
			"@/assets": path.resolve(__dirname, 'src/assets'),
			"@/components": path.resolve(__dirname, 'src/components'),
			"@/constants": path.resolve(__dirname, 'src/constants'),
			"@/hooks": path.resolve(__dirname, 'src/hooks'),
			"@/i18n": path.resolve(__dirname, 'src/i18n'),
			"@/state": path.resolve(__dirname, 'src/state')
		}
	},

	css: {
		// css预处理器
		preprocessorOptions: {
			less: {
				javascriptEnabled: true, // 支持内联 JavaScript
				charset: false
			},

		}
	},

	server: {
		host: true,
		port: 8080, // 开发环境启动的端口
		open: true,
		proxy: {
			'/api': {
				// 当遇到 /api 路径时，将其转换成 target 的值
				target: 'http://127.0.0.1:8080/api/',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''), // 将 /api 重写为空
			},
		}
	},

	//打包配置
	build: {
		//浏览器兼容性  "esnext"|"modules"
		target: "modules",
		//指定输出路径
		outDir: "dist",
		//生成静态资源的存放路径
		assetsDir: "assets",
		//小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
		assetsInlineLimit: 4096,
		//启用/禁用 CSS 代码拆分
		cssCodeSplit: true,
		//构建后是否生成 source map 文件
		sourcemap: false,
		//自定义底层的 Rollup 打包配置
		rollupOptions: {
			output: {
				// 最小化拆分包
				manualChunks: (id) => {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				},
				// 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
				entryFileNames: 'js/[name].[hash].js',
				// 用于命名代码拆分时创建的共享块的输出命名
				chunkFileNames: 'js/[name].[hash].js',
				// 用于输出静态资源的命名，[ext]表示文件扩展名
				assetFileNames: '[ext]/[name].[hash].[ext]',
				// 拆分js到模块文件夹
				// chunkFileNames: (chunkInfo) => {
				//     const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
				//     const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
				//     return `js/${fileName}/[name].[hash].js`;
				// },
			}
		},
		//@rollup/plugin-commonjs 插件的选项
		commonjsOptions: {
		},
		//当设置为 true，构建后将会生成 manifest.json 文件
		manifest: false,
		// 设置为 false 可以禁用最小化混淆，
		// 或是用来指定使用哪种混淆器
		// boolean | 'terser' | 'esbuild'
		minify: "terser", //terser 构建后文件体积更小
		//设置为 false 来禁用将构建后的文件写入磁盘
		write: true,
		//默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
		emptyOutDir: true,
		//启用/禁用 brotli 压缩大小报告
		//chunk 大小警告的限制
		chunkSizeWarningLimit: 500,
		terserOptions: {
			compress: {
				//生产环境时移除console
				drop_console: true,
				drop_debugger: true,
			}
		}
	}
})
