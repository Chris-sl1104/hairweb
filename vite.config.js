import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  https: true,
  plugins: [react()],
});
