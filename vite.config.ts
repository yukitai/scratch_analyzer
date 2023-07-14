import { defineConfig } from 'vite'

import preact from '@preact/preset-vite'

import unocss from 'unocss/vite'
import preset_uno from '@unocss/preset-uno'
import preset_attr from '@unocss/preset-attributify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [unocss({ presets: [ preset_uno(), preset_attr() ] }), preact()]
})
