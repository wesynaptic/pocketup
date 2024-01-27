/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Add a custom loader for .cube files
        config.module.rules.push({
          test: /\.cube$/,
          use: 'raw-loader',
        });
    
        return config;
      },
    
};

export default nextConfig;
