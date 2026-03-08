#!/bin/bash
# CCR Kennels — build & deploy to ccrcorsos.com
set -e

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "🔨 Building..."
npm run build

echo "🚀 Deploying to ccrcorsos.com..."
netlify deploy --prod --dir=out --skip-functions-cache

echo "✅ Done! Live at https://www.ccrcorsos.com"
