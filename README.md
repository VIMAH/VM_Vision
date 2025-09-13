# VM Vision - Web3 Development Company Website

A comprehensive Web3 website for VM Vision, featuring modern React.js frontend, Node.js backend, and Solidity smart contracts.

## 🚀 Features

### Frontend (React.js)
- **Modern UI/UX**: Beautiful, responsive design with Web3 theme
- **Wallet Integration**: MetaMask and other Web3 wallet support
- **Interactive Pages**: Home, About, Services, Projects, Contact
- **Real-time Data**: Blockchain data integration
- **Animations**: Smooth transitions with Framer Motion

### Backend (Node.js)
- **RESTful API**: Comprehensive API endpoints
- **Blockchain Integration**: Ethereum and Web3 functionality
- **Contact Form**: Secure form handling
- **Rate Limiting**: Security and performance optimization
- **CORS Support**: Cross-origin resource sharing

### Smart Contracts (Solidity)
- **VM Vision Token**: ERC-20 token with staking features
- **VM Vision NFT**: ERC-721 NFT collection with utility
- **VM Vision DAO**: Governance and voting system
- **Security**: OpenZeppelin standards and best practices

## 🛠️ Technology Stack

- **Frontend**: React.js, Framer Motion, Styled Components
- **Backend**: Node.js, Express.js, Web3.js, Ethers.js
- **Smart Contracts**: Solidity, OpenZeppelin, Hardhat
- **Blockchain**: Ethereum, Polygon, BSC support
- **Styling**: CSS3, Modern design principles

## 📁 Project Structure

```
VM_Vision/
├── client/                 # React.js frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Web3 context
│   │   └── styles/        # CSS files
│   └── package.json
├── server/                # Node.js backend
│   ├── server.js         # Main server file
│   ├── routes/           # API routes
│   └── package.json
├── contracts/            # Solidity smart contracts
│   ├── contracts/        # Contract files
│   ├── scripts/          # Deployment scripts
│   ├── test/            # Contract tests
│   └── hardhat.config.js
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MetaMask or Web3 wallet
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/VM_Vision.git
   cd VM_Vision
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   # Copy example files
   cp server/env.example server/.env
   
   # Edit server/.env with your configuration
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

### Smart Contract Deployment

1. **Navigate to contracts directory**
   ```bash
   cd contracts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Compile contracts**
   ```bash
   npm run compile
   ```

4. **Deploy to local network**
   ```bash
   npm run node
   # In another terminal
   npm run deploy:local
   ```

5. **Deploy to testnet**
   ```bash
   npm run deploy:sepolia
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the server directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Ethereum Configuration
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY
ETHEREUM_PRIVATE_KEY=your_private_key_here

# API Keys
ALCHEMY_API_KEY=your_alchemy_key
MORALIS_API_KEY=your_moralis_key
OPENSEA_API_KEY=your_opensea_key
```

### Smart Contract Configuration

Update `contracts/hardhat.config.js` with your network configurations:

```javascript
networks: {
  sepolia: {
    url: process.env.SEPOLIA_RPC_URL,
    accounts: [process.env.PRIVATE_KEY],
  },
  mainnet: {
    url: process.env.MAINNET_RPC_URL,
    accounts: [process.env.PRIVATE_KEY],
  },
}
```

## 📱 Pages Overview

### Home Page
- Hero section with Web3 integration
- Feature highlights
- Statistics and metrics
- Call-to-action sections

### About Page
- Company story and mission
- Team information
- Core values
- Timeline and milestones

### Services Page
- Service offerings
- Pricing information
- Development process
- FAQ section

### Projects Page
- Portfolio showcase
- Project filtering
- Technology stack
- Live demos and source code

### Contact Page
- Contact form with Web3 integration
- Contact information
- Social media links
- Response time information

## 🔗 API Endpoints

### Contact
- `POST /api/contact` - Submit contact form

### Blockchain
- `GET /api/blockchain/balance/:address` - Get wallet balance
- `GET /api/blockchain/transactions/:address` - Get transaction history
- `GET /api/blockchain/gas` - Get current gas prices

### NFT
- `GET /api/nft/portfolio/:address` - Get NFT portfolio

### DeFi
- `GET /api/defi/portfolio/:address` - Get DeFi portfolio

## 🎨 Design Features

- **Dark Theme**: Modern dark color scheme
- **Gradient Accents**: Purple and blue gradients
- **Glassmorphism**: Frosted glass effects
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Framer Motion integration
- **Web3 Elements**: Blockchain-themed components

## 🔒 Security Features

- **Rate Limiting**: API request limiting
- **Input Validation**: Form and data validation
- **CORS Protection**: Cross-origin security
- **Helmet.js**: Security headers
- **Smart Contract Audits**: OpenZeppelin standards

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy build folder to your hosting service
```

### Backend (Heroku/Railway)
```bash
cd server
# Configure environment variables
# Deploy to your hosting service
```

### Smart Contracts
```bash
cd contracts
npm run deploy:mainnet
npm run verify:mainnet
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

- **Email**: contact@vmvision.com
- **Website**: https://vmvision.com
- **Discord**: [Join our community](https://discord.gg/vmvision)

## 🙏 Acknowledgments

- OpenZeppelin for smart contract standards
- React.js community for excellent documentation
- Web3.js and Ethers.js for blockchain integration
- Framer Motion for smooth animations

---

**Built with ❤️ by VM Vision Team**
