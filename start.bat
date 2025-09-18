@echo off
echo 🚀 Starting VM Vision Web3 Website...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing root dependencies...
    npm install
)

if not exist "client\node_modules" (
    echo 📦 Installing client dependencies...
    cd client
    npm install
    cd ..
)

if not exist "server\node_modules" (
    echo 📦 Installing server dependencies...
    cd server
    npm install
    cd ..
)

if not exist "contracts\node_modules" (
    echo 📦 Installing contract dependencies...
    cd contracts
    npm install
    cd ..
)

REM Create .env files if they don't exist
if not exist "server\.env" (
    echo ⚙️ Creating server environment file...
    copy "server\env.example" "server\.env"
    echo 📝 Please edit server\.env with your configuration
)

if not exist "contracts\.env" (
    echo ⚙️ Creating contracts environment file...
    echo. > "contracts\.env"
    echo 📝 Please add your private keys and RPC URLs to contracts\.env
)

echo.
echo 🎉 Setup complete! Starting development servers...
echo.
echo 📱 Frontend will be available at: http://localhost:3000
echo 🔧 Backend API will be available at: http://localhost:5000
echo 📊 API Health check: http://localhost:5000/api/health
echo.
echo 💡 To deploy smart contracts:
echo    cd contracts ^&^& npm run deploy:local
echo.
echo 🔗 To connect your wallet:
echo    1. Install MetaMask browser extension
echo    2. Click 'Connect Wallet' on the website
echo.

REM Start the development servers
npm run dev
