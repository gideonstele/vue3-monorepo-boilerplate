import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
  extract: {
    // accepts globs and file paths relative to project root
    include: ['index.html', 'src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules/**/*', '.git/**/*'],
  },
  attributify: true,
  plugins: [],
  fontFamily: {
    sans: ['-apple-system', 'PingFang SC', 'Source Han Sans', 'Microsoft Yahei', 'Segoe UI', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
    serif: ['SimSun', 'STSong', 'Source Han Serif SC', 'Georgia', 'Merriweather', 'serif'],
  },
});
