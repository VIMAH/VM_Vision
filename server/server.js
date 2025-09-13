const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { Web3 } = require('web3');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'VM Vision Web3 API',
            version: '1.0.0',
            description: 'API for VM Vision Web3 platform - Blockchain data, NFT portfolio, DeFi analytics, and more',
            contact: {
                name: 'VM Vision Team',
                email: 'contact@vmvision.com'
            }
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Development server'
            }
        ],
        components: {
            schemas: {
                ContactForm: {
                    type: 'object',
                    required: ['name', 'email', 'message'],
                    properties: {
                        name: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', format: 'email', example: 'john@example.com' },
                        company: { type: 'string', example: 'Web3 Corp' },
                        projectType: { type: 'string', example: 'DeFi Platform' },
                        budget: { type: 'string', example: '$10,000 - $50,000' },
                        timeline: { type: 'string', example: '3-6 months' },
                        message: { type: 'string', example: 'I need help building a DeFi platform' },
                        walletAddress: { type: 'string', example: '0x1234...5678' }
                    }
                },
                BalanceResponse: {
                    type: 'object',
                    properties: {
                        address: { type: 'string' },
                        balance: { type: 'string' },
                        balanceWei: { type: 'string' },
                        currency: { type: 'string' },
                        timestamp: { type: 'string' }
                    }
                },
                Transaction: {
                    type: 'object',
                    properties: {
                        hash: { type: 'string' },
                        from: { type: 'string' },
                        to: { type: 'string' },
                        value: { type: 'string' },
                        timestamp: { type: 'string' },
                        status: { type: 'string' },
                        gasUsed: { type: 'number' }
                    }
                },
                NFT: {
                    type: 'object',
                    properties: {
                        contractAddress: { type: 'string' },
                        tokenId: { type: 'string' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        image: { type: 'string' },
                        attributes: { type: 'array' },
                        floorPrice: { type: 'string' },
                        lastSale: { type: 'string' }
                    }
                }
            }
        }
    },
    apis: ['./server.js'] // Path to the API files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Web3 Configuration
const web3 = new Web3(process.env.ETHEREUM_RPC_URL || 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY');
const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL || 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY');

// Routes
/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the health status of the API
 *     tags: [System]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 timestamp:
 *                   type: string
 *                   example: 2024-01-01T00:00:00.000Z
 *                 service:
 *                   type: string
 *                   example: VM Vision Web3 API
 */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'VM Vision Web3 API'
    });
});

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Submit contact form
 *     description: Submit a contact form with project details
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactForm'
 *     responses:
 *       200:
 *         description: Contact form submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Thank you for your message! We will get back to you within 24 hours.
 *                 submissionId:
 *                   type: string
 *                   example: VMV-1704067200000
 *       400:
 *         description: Bad request - missing required fields
 *       500:
 *         description: Internal server error
 */
// Contact form submission
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, company, projectType, budget, timeline, message, walletAddress } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({
                error: 'Missing required fields: name, email, and message are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Here you would typically save to database or send email
        // For now, we'll just log and return success
        console.log('Contact form submission:', {
            name,
            email,
            company,
            projectType,
            budget,
            timeline,
            message,
            walletAddress,
            timestamp: new Date().toISOString()
        });

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1000));

        res.json({
            success: true,
            message: 'Thank you for your message! We will get back to you within 24 hours.',
            submissionId: `VMV-${Date.now()}`
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            error: 'Internal server error. Please try again later.'
        });
    }
});

/**
 * @swagger
 * /api/blockchain/balance/{address}:
 *   get:
 *     summary: Get Ethereum balance
 *     description: Get the ETH balance for a given Ethereum address
 *     tags: [Blockchain]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Ethereum address
 *         example: 0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6
 *     responses:
 *       200:
 *         description: Balance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BalanceResponse'
 *       400:
 *         description: Invalid Ethereum address
 *       500:
 *         description: Failed to fetch balance
 */
// Get blockchain data
app.get('/api/blockchain/balance/:address', async (req, res) => {
    try {
        const { address } = req.params;

        // Validate Ethereum address
        if (!ethers.isAddress(address)) {
            return res.status(400).json({ error: 'Invalid Ethereum address' });
        }

        const balance = await provider.getBalance(address);
        const balanceInEth = ethers.formatEther(balance);

        res.json({
            address,
            balance: balanceInEth,
            balanceWei: balance.toString(),
            currency: 'ETH',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Balance check error:', error);
        res.status(500).json({
            error: 'Failed to fetch balance. Please try again later.'
        });
    }
});

// Get transaction history (simplified)
app.get('/api/blockchain/transactions/:address', async (req, res) => {
    try {
        const { address } = req.params;
        const { limit = 10 } = req.query;

        if (!ethers.isAddress(address)) {
            return res.status(400).json({ error: 'Invalid Ethereum address' });
        }

        // This is a simplified example - in production you'd use a service like Alchemy or Moralis
        // For now, we'll return mock data
        const mockTransactions = Array.from({ length: Math.min(parseInt(limit), 10) }, (_, i) => ({
            hash: `0x${Math.random().toString(16).substr(2, 64)}`,
            from: address,
            to: `0x${Math.random().toString(16).substr(2, 40)}`,
            value: (Math.random() * 10).toFixed(4),
            timestamp: new Date(Date.now() - i * 3600000).toISOString(),
            status: 'confirmed',
            gasUsed: Math.floor(Math.random() * 100000) + 21000
        }));

        res.json({
            address,
            transactions: mockTransactions,
            count: mockTransactions.length,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Transaction history error:', error);
        res.status(500).json({
            error: 'Failed to fetch transaction history. Please try again later.'
        });
    }
});

// Get NFT data (simplified)
app.get('/api/nft/portfolio/:address', async (req, res) => {
    try {
        const { address } = req.params;

        if (!ethers.isAddress(address)) {
            return res.status(400).json({ error: 'Invalid Ethereum address' });
        }

        // Mock NFT data - in production you'd use OpenSea API or similar
        const mockNFTs = [
            {
                contractAddress: '0x1234567890123456789012345678901234567890',
                tokenId: '1',
                name: 'VM Vision Genesis NFT',
                description: 'The first NFT minted by VM Vision',
                image: 'https://via.placeholder.com/300x300/4f46e5/ffffff?text=VMV',
                attributes: [
                    { trait_type: 'Rarity', value: 'Legendary' },
                    { trait_type: 'Collection', value: 'VM Vision' }
                ],
                floorPrice: '0.5',
                lastSale: '0.3'
            },
            {
                contractAddress: '0x1234567890123456789012345678901234567890',
                tokenId: '2',
                name: 'Web3 Developer Badge',
                description: 'Awarded for completing Web3 development course',
                image: 'https://via.placeholder.com/300x300/10b981/ffffff?text=WEB3',
                attributes: [
                    { trait_type: 'Type', value: 'Badge' },
                    { trait_type: 'Achievement', value: 'Web3 Developer' }
                ],
                floorPrice: '0.1',
                lastSale: null
            }
        ];

        res.json({
            address,
            nfts: mockNFTs,
            count: mockNFTs.length,
            totalValue: '0.6',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('NFT portfolio error:', error);
        res.status(500).json({
            error: 'Failed to fetch NFT portfolio. Please try again later.'
        });
    }
});

// Get DeFi portfolio data
app.get('/api/defi/portfolio/:address', async (req, res) => {
    try {
        const { address } = req.params;

        if (!ethers.isAddress(address)) {
            return res.status(400).json({ error: 'Invalid Ethereum address' });
        }

        // Mock DeFi data
        const mockDeFiData = {
            totalValue: '12,450.50',
            positions: [
                {
                    protocol: 'Uniswap V3',
                    type: 'Liquidity Pool',
                    pair: 'ETH/USDC',
                    value: '5,200.00',
                    apy: '12.5%',
                    tokens: [
                        { symbol: 'ETH', amount: '2.1', value: '4,200.00' },
                        { symbol: 'USDC', amount: '1000', value: '1,000.00' }
                    ]
                },
                {
                    protocol: 'Aave',
                    type: 'Lending',
                    asset: 'USDC',
                    value: '3,500.00',
                    apy: '8.2%',
                    supplied: '3,500.00',
                    borrowed: '0.00'
                },
                {
                    protocol: 'Compound',
                    type: 'Lending',
                    asset: 'ETH',
                    value: '3,750.50',
                    apy: '5.8%',
                    supplied: '1.5',
                    borrowed: '0.0'
                }
            ],
            yield: {
                daily: '2.45',
                weekly: '17.15',
                monthly: '73.50',
                yearly: '890.25'
            }
        };

        res.json({
            address,
            ...mockDeFiData,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('DeFi portfolio error:', error);
        res.status(500).json({
            error: 'Failed to fetch DeFi portfolio. Please try again later.'
        });
    }
});

// Get gas prices
app.get('/api/blockchain/gas', async (req, res) => {
    try {
        // Mock gas price data - in production you'd fetch from a gas tracker API
        const gasPrices = {
            slow: {
                gwei: '15',
                usd: '0.50',
                time: '~10 minutes'
            },
            standard: {
                gwei: '20',
                usd: '0.75',
                time: '~3 minutes'
            },
            fast: {
                gwei: '25',
                usd: '1.00',
                time: '~1 minute'
            }
        };

        res.json({
            ...gasPrices,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Gas price error:', error);
        res.status(500).json({
            error: 'Failed to fetch gas prices. Please try again later.'
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error. Please try again later.'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 VM Vision Web3 API server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
