import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // <-- 1. PHẢI CÓ DÒNG NÀY
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],

  // 2. PHẢI CÓ KHỐI NÀY
  resolve: {
    alias: {
      // 3. 'path.resolve' sẽ tạo đường dẫn tuyệt đối
      //    Nó "dạy" Vite rằng: '~' BẰNG 'thư-mục-hiện-tại/src'
      '~': path.resolve(__dirname, './src'),
    },
  },

  base: 'https://github.com/NeyGun/ATPhim.git'
})