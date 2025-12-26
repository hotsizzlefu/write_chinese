# 儿童练字 (Children's Handwriting Practice)

A web application for children to practice writing Chinese characters.

## Features
- **Daily Practice**: 20 characters per day, refreshable.
- **Stroke Order**: Animations and tracing practice using `hanzi-writer`.
- **Audio**: Pronunciation in Mandarin (Simplified) and Cantonese (Traditional).
- **Responsive**: Works on tablets and desktops.

## Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```

## Deployment

### Vercel
1. Import this repository to Vercel.
2. Framework Preset: **Vite**.
3. Deploy.

### GitHub Pages
1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder.
   - You can use `gh-pages` package: `npx gh-pages -d dist`.
   - Or configure GitHub Actions to build and deploy.

## Customization

To expand the vocabulary, edit `src/data/chars.js`. Currently, it contains a sample list. You can add more characters to the `ALL_CHARS` string or array.

## Credits
- [Hanzi Writer](https://hanziwriter.org/)
- [OpenCC](https://github.com/nk2028/opencc-js)
- [Lucide React](https://lucide.dev/)
