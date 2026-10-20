# 🌍 NPSBS — Cloudflare Deployment Guide
## Free, Global, No Server Needed

---

## What You Need
- A free Cloudflare account → https://cloudflare.com
- Node.js installed on your computer → https://nodejs.org
- That's it!

---

## STEP 1 — Install Wrangler (Cloudflare CLI)

Open your terminal / command prompt and run:

```bash
npm install -g wrangler
```

Then login to Cloudflare:
```bash
wrangler login
```
A browser window will open — click **Allow**.

---

## STEP 2 — Create the D1 Database

```bash
wrangler d1 create npsbs-db
```

You'll see output like:
```
✅ Successfully created DB 'npsbs-db'
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

📋 **Copy that `database_id`** — you need it next.

---

## STEP 3 — Update wrangler.toml

Open `worker/wrangler.toml` and replace:
```
database_id = "REPLACE_WITH_YOUR_D1_DATABASE_ID"
```
with the ID you just copied:
```
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

---

## STEP 4 — Create the Database Tables

```bash
cd worker
wrangler d1 execute npsbs-db --file=schema.sql
```

You should see: `✅ Executed X queries`

---

## STEP 5 — Deploy the Worker

```bash
cd worker
npm install
wrangler deploy
```

You'll get a URL like:
```
✅ Deployed to: https://npsbs-api.YOUR-NAME.workers.dev
```

---

## STEP 6 — Deploy the Frontend (Cloudflare Pages)

### Option A: Drag & Drop (Easiest — no GitHub needed)

1. Go to https://pages.cloudflare.com
2. Click **"Create a project"** → **"Direct Upload"**
3. Give it a name: `npsbs`
4. Drag and drop the entire **`frontend/`** folder
5. Click **Deploy**

Your site will be live at: `https://npsbs.pages.dev`

### Option B: GitHub (Auto-deploys on every push)

1. Push this project to GitHub
2. In Cloudflare Pages → Create project → Connect to Git
3. Select your repo
4. Build settings:
   - Framework: **None**
   - Build command: *(leave empty)*
   - Output directory: `frontend`
5. Deploy!

---

## STEP 7 — Connect Worker to Pages

1. In Cloudflare dashboard → **Pages** → your `npsbs` project
2. Go to **Settings** → **Functions**
3. Under **"KV namespace bindings"** — skip
4. Under **"Service bindings"** → Add:
   - Variable name: `API`
   - Service: `npsbs-api` (your worker)
5. Save

Alternatively (simpler): In `frontend/api.js`, change:
```js
const API_BASE = '';
```
to:
```js
const API_BASE = 'https://npsbs-api.YOUR-NAME.workers.dev';
```

Then redeploy the frontend.

---

## STEP 8 — Set a Secure JWT Secret

```bash
cd worker
wrangler secret put JWT_SECRET
```
Enter a long random string when prompted (e.g. `MySchool@2060#SecretKey!XYZ`).

---

## 🎉 Done! Your site is live worldwide.

- **Frontend**: `https://npsbs.pages.dev`
- **API**: `https://npsbs-api.YOUR-NAME.workers.dev`
- **Database**: Cloudflare D1 (global SQLite)

---

## Default Login Credentials

| Username | Password     |
|----------|-------------|
| admin    | School@2060 |

⚠️ **Change this password after first login!**
To change: In the admin panel → Settings → Change Password
(or via wrangler d1 execute with an UPDATE query)

---

## Free Tier Limits (more than enough for a school)

| Resource | Free Limit |
|----------|-----------|
| Worker requests | 100,000/day |
| D1 reads | 5 million/day |
| D1 writes | 100,000/day |
| D1 storage | 5 GB |
| Pages bandwidth | Unlimited |

---

## Updating Your Site

**After any code change:**

Worker:
```bash
cd worker && wrangler deploy
```

Frontend:
- Drag & drop the updated `frontend/` folder to Cloudflare Pages again
- Or push to GitHub if you used Option B

---

## Backup Your Data

```bash
wrangler d1 export npsbs-db --output=backup.sql
```

Restore:
```bash
wrangler d1 execute npsbs-db --file=backup.sql
```
