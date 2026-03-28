import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	outDir: 'dist',
	format: ['esm', 'cjs'],
	noExternal: ["@xmpp/client", "@xmpp/sasl", "@xmpp/sasl-plain"],
	dts: true,
	clean: true,
	outExtension({ format }) {
		return { js: format === 'esm' ? '.mjs' : '.cjs' }
	},
	esbuildOptions(options, context) {
		options.outdir = `dist/${context.format}`
	},
})