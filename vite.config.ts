import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // CloudFront 루트에서 제공할 것이므로 base는 '/'로 설정
})
