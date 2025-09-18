const { execSync } = require('child_process');

// Set environment variables to disable ESLint
process.env.DISABLE_ESLINT_PLUGIN = 'true';
process.env.CI = 'false';
process.env.GENERATE_SOURCEMAP = 'false';

// Run the build with ESLint disabled
execSync('react-scripts build', {
    stdio: 'inherit',
    env: {
        ...process.env,
        DISABLE_ESLINT_PLUGIN: 'true',
        CI: 'false',
        GENERATE_SOURCEMAP: 'false'
    }
});
