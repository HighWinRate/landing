#!/bin/bash

# Landing Page Development Startup Script

echo "🚀 راه‌اندازی Landing Page..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js نصب نشده است. لطفاً Node.js را نصب کنید."
    exit 1
fi

echo "✅ Node.js پیدا شد: $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm نصب نشده است."
    exit 1
fi

echo "✅ npm پیدا شد: $(npm --version)"

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 ایجاد فایل .env از env.example.txt..."
    if [ -f env.example.txt ]; then
        cp env.example.txt .env
        echo "✅ فایل .env ایجاد شد"
    else
        echo "⚠️  فایل env.example.txt یافت نشد. لطفاً فایل .env را به صورت دستی ایجاد کنید."
    fi
else
    echo "✅ فایل .env موجود است"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 نصب dependencies..."
    npm install
    echo "✅ Dependencies نصب شدند"
else
    echo "✅ Dependencies موجود هستند"
fi

# Start the development server
echo "🌐 راه‌اندازی سرور توسعه..."
echo "📍 Landing Page در آدرس http://localhost:3003 در دسترس خواهد بود"
echo ""

npm run dev

