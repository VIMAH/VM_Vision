#!/bin/bash

# VM Vision Web3 Website Startup Script
echo "🚀 Starting VM Vision Web3 Website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    cd client && npm install && cd ..
fi

if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    cd server && npm install && cd ..
fi

if [ ! -d "contracts/node_modules" ]; then
    echo "📦 Installing contract dependencies..."
    cd contracts && npm install && cd ..
fi

# Create .env files if they don't exist
if [ ! -f "server/.env" ]; then
    echo "⚙️ Creating server environment file..."
    cp server/env.example server/.env
    echo "📝 Please edit server/.env with your configuration"
fi

if [ ! -f "contracts/.env" ]; then
    echo "⚙️ Creating contracts environment file..."
    touch contracts/.env
    echo "📝 Please add your private keys and RPC URLs to contracts/.env"
fi

echo ""
echo "🎉 Setup complete! Starting development servers..."
echo ""
echo "📱 Frontend will be available at: http://localhost:3000"
echo "🔧 Backend API will be available at: http://localhost:5000"
echo "📊 API Health check: http://localhost:5000/api/health"
echo ""
echo "💡 To deploy smart contracts:"
echo "   cd contracts && npm run deploy:local"
echo ""
echo "🔗 To connect your wallet:"
echo "   1. Install MetaMask browser extension"
echo "   2. Click 'Connect Wallet' on the website"
echo ""

# Start the development servers
npm run dev
