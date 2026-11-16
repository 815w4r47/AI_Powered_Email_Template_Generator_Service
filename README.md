# AI-Powered Email Template Generator Service

A small Express microservice that creates a short, customer-friendly email from its purpose, recipient name, and requested tone. It uses the OpenAI Responses API and keeps HTTP handling, request validation, and AI integration in separate modules.

## Requirements

- Node.js 18.17 or newer
- An OpenAI API key

## Setup

```bash
npm install
cp .env.example .env
```

Set `OPENAI_API_KEY` in `.env`. You can optionally change `PORT`, `OPENAI_MODEL` (defaults to `gpt-6-luna`), and `OPENAI_TIMEOUT_MS`. The `.env` file is ignored by Git.

Start the service:

```bash
npm start
```

For development with automatic restart:

```bash
npm run dev
```

The health endpoint is `GET http://localhost:3000/health`.

## Generate an email

`POST http://localhost:3000/api/email-templates`

Content type: `application/json`

```json
{
  "purpose": "Let the customer know their replacement order has shipped",
  "recipient_name": "Jordan",
  "tone": "warm and reassuring"
}
```

Example response (AI text and timing vary by request):

```json
{
  "generated_email": "Subject: Your replacement order is on its way\n\nHi Jordan,\n\nYour replacement order has shipped, and we appreciate your patience while we got it ready.\n\nWarmly,\nCustomer Support",
  "ai_call": {
    "request_id": "8eab7077-2599-44bc-9761-b17fb696d2f2",
    "started_at": "2026-11-16T10:00:00.120Z",
    "completed_at": "2026-11-16T10:00:01.043Z",
    "response_time_ms": 923
  }
}
```

Missing or invalid fields return `400`. If the API key is not configured, generation returns `503`. Provider errors and timeouts are returned as `502`/`503`/`504` responses.

Each AI request writes a structured JSON log to stdout with its request ID, start and completion timestamps, duration, and status. The response includes the same timing information in `ai_call.response_time_ms`.

## Prompt design

The system instructions define the audience (customer-friendly), output format (subject and body), desired length (2–5 short sentences), and guardrails against inventing facts or promises. The three API fields are sent as JSON input and explicitly treated as data so values cannot override those rules. The caller controls tone through the `tone` field without requiring a separate prompt template for every tone.

## Project structure

```text
src/
  app.js
  server.js
  config/env.js
  controllers/emailTemplateController.js
  routes/emailTemplateRoutes.js
  services/emailTemplateService.js
```
