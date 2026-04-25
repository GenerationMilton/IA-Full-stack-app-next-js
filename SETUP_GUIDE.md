# Running the Business Idea Generator Locally

## Prerequisites
- Node.js 18+
- Python 3.10+
- OpenAI API Key

## Environment Setup

### 1. Install Node Dependencies
```bash
npm install
```

### 2. Set Up Python Environment
```bash
pip install -r requirements.txt
```

### 3. Create `.env.local` for Development
Create a `.env.local` file in the root directory:

```env
# For local development (FastAPI backend)
FASTAPI_URL=http://localhost:8000

# For production (where FastAPI is deployed)
# FASTAPI_URL=https://your-api-domain.com
```

### 4. Set Up OpenAI API Key
Export your OpenAI API key in the terminal:

**Linux/macOS:**
```bash
export OPENAI_API_KEY=your_api_key_here
```

**Windows (PowerShell):**
```powershell
$env:OPENAI_API_KEY="your_api_key_here"
```

**Windows (Command Prompt):**
```cmd
set OPENAI_API_KEY=your_api_key_here
```

## Running Locally

### 1. Start FastAPI Backend (in one terminal)
```bash
cd api
python -m uvicorn index:app --host 0.0.0.0 --port 8000 --reload
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

### 2. Start Next.js Frontend (in another terminal)
```bash
npm run dev
```

You should see:
```
▲ Next.js 16.2.4 (Turbopack)
- Local:         http://localhost:3000
✓ Ready in XXXms
```

### 3. Test the Application
Open http://localhost:3000 in your browser

You should see:
- Header: "Business Idea Generator"
- Loading state: "Generating your business idea..."
- Then the AI-generated idea with markdown formatting (headings, bullets, etc.)

## Architecture

```
┌─────────────────────────┐
│   React Frontend        │
│   (pages/index.tsx)     │
│   - EventSource SSE     │
│   - Markdown rendering  │
└────────────┬────────────┘
             │ fetch('/api')
             ▼
┌─────────────────────────┐
│  Next.js API Route      │
│  (pages/api/index.ts)   │
│  - Proxies to FastAPI   │
│  - Streams SSE response │
└────────────┬────────────┘
             │ proxy
             ▼
┌─────────────────────────┐
│  FastAPI Backend        │
│  (api/index.py)         │
│  - Calls OpenAI API     │
│  - Streams chunks       │
│  - Returns SSE format   │
└─────────────────────────┘
```

## Data Flow

1. **Frontend** → EventSource connects to `/api`
2. **Next.js Proxy** → Forwards to FastAPI at `http://localhost:8000/api`
3. **FastAPI** → Calls OpenAI GPT-3.5-turbo with streaming enabled
4. **OpenAI** → Streams response chunks
5. **FastAPI** → Formats chunks as Server-Sent Events (SSE)
6. **Next.js** → Passes through SSE stream unchanged
7. **Frontend** → Receives chunks via EventSource onmessage, renders markdown

## Troubleshooting

### "Generating your business idea..." stays indefinitely
- Check that FastAPI is running: `curl http://localhost:8000/api`
- Check browser console for errors (F12)
- Check terminal logs for API errors

### CORS errors
- This shouldn't happen as Next.js is proxying locally
- If deploying to production, ensure FASTAPI_URL is set correctly

### No markdown formatting
- Ensure `react-markdown`, `remark-gfm`, and `remark-breaks` are installed
- Run `npm install` again

### "connect ECONNREFUSED 127.0.0.1:8000"
- FastAPI is not running on port 8000
- Start FastAPI backend first: `cd api && python -m uvicorn index:app --port 8000 --reload`

## Production Deployment

### For Vercel/Netlify Hosting

**Environment Variables** (deploy on your platform):
```
FASTAPI_URL=https://your-fastapi-domain.com
OPENAI_API_KEY=your_openai_api_key_here
```

**Next.js will deploy to** Vercel/Netlify serverlessly

**FastAPI backend** needs to be deployed separately to:
- Heroku
- Railway
- AWS EC2
- Your own server
- Any Python/FastAPI hosting service

### Example Deployment Steps

1. **Deploy FastAPI to Railway/Heroku:**
   ```bash
   # Add to your FastAPI repository
   Procfile:
   web: uvicorn api.index:app --host 0.0.0.0 --port=$PORT
   ```

2. **Deploy Next.js to Vercel:**
   ```bash
   vercel --prod
   ```

3. **Set environment variables on Vercel:**
   - `FASTAPI_URL`: Your deployed FastAPI URL
   - `OPENAI_API_KEY`: Your OpenAI API key

## Development Tips

- **Hot reload**: Both Next.js and FastAPI support auto-reload. Just save your files
- **Debug streaming**: Open browser DevTools → Network → /api → watch SSE chunks arrive
- **Test FastAPI alone**: `curl http://localhost:8000/api` to see raw SSE stream