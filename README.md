# AI Business Idea Generator SaaS

A Next.js application that generates business ideas using OpenAI's GPT models. Built with TypeScript, Tailwind CSS, and deployed as a serverless application.

## Features

- 🤖 AI-powered business idea generation
- 🎨 Modern UI with Tailwind CSS
- ⚡ Serverless deployment ready
- 📱 Responsive design
- 🔒 Secure API key management

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 3
- **AI:** OpenAI GPT-3.5-turbo
- **Deployment:** Serverless (Vercel, Netlify, etc.)

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Production Deployment

### Environment Variables
Set the following environment variable in your deployment platform:

```
OPENAI_API_KEY=your_openai_api_key_here
```

### Build Commands
```bash
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Supported Platforms
- ✅ Vercel
- ✅ Netlify
- ✅ Any serverless platform supporting Node.js

## Project Structure

```
├── pages/                 # Next.js Pages Router
│   ├── _app.tsx          # App wrapper
│   ├── _document.tsx     # Document structure
│   ├── index.tsx         # Home page
│   └── api/              # API routes
│       └── index.ts      # Business idea generator API
├── public/               # Static assets
├── styles/               # Global styles
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.mjs    # PostCSS configuration
└── tsconfig.json         # TypeScript configuration
```

## API Endpoints

- `GET /api` - Generate a new business idea

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
