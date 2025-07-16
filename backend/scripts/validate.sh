#!/bin/bash
echo "🔍 Linting..."
npx eslint . --ext .ts

echo "🎨 Formatting..."
npx prettier --write .

echo "✅ Done!"
