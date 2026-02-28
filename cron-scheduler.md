# cron-scheduler.md

To trigger the AI News Generation twice daily (10:00 AM and 4:00 PM), you can use several methods depending on your hosting environment.

## Option 1: GitHub Actions (Recommended for SSG)

Create a file at `.github/workflows/ai-news-cron.yml`:

```yaml
name: AI News Generation Cron

on:
  schedule:
    - cron: '0 2,8 * * *' # 10:00 AM and 4:00 PM Beijing Time (UTC+8) -> 2:00 AM and 8:00 AM UTC
  workflow_dispatch: # Allows manual trigger

jobs:
  hit-api:
    runs-on: ubuntu-latest
    steps:
      - name: Call Auto-Generate API
        run: |
          curl -X POST "https://your-domain.com/api/news/auto-generate"
```

## Option 2: Cloudflare Workers Cron Triggers

If you are using Cloudflare Pages with Functions:

1. Go to your Cloudflare Dashboard.
2. Navigate to **Workers & Pages** > **[Your Project]** > **Settings** > **Functions**.
3. Add a **Cron Trigger** with the schedule `0 2,8 * * *`.
4. The trigger will automatically hit your scheduled function if implemented in `functions/` or via a separate Worker.

## Option 3: External Cron Service (Easy)

Use a service like [Cron-job.org](https://cron-job.org/) to hit your endpoint:
`https://your-domain.com/api/news/auto-generate`
Set the schedule to twice daily at 10:00 and 16:00.
