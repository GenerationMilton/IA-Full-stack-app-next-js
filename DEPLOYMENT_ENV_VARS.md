# Environment Variables for Production Deployment

## Required Environment Variables

Add this to your deployment platform (Vercel, Netlify, etc.):

```
OPENAI_API_KEY=your_openai_api_key_here
```

## How to Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in to your account
3. Create a new API key
4. Copy the key and add it to your deployment environment variables

## Deployment Platforms

### Vercel
- Go to your project dashboard
- Settings → Environment Variables
- Add `OPENAI_API_KEY` with your key

### Netlify
- Site settings → Environment variables
- Add `OPENAI_API_KEY` with your key

### Other Platforms
- Check your platform's documentation for environment variable configuration
- The variable name should be `OPENAI_API_KEY`

## Security Note
Never commit your API key to version control. Always use environment variables for sensitive data.