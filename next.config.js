/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    // const env = {
    //   production: process.env.production,
    //   postgres_user: process.env.postgres_user,
    //   postgres_pwd: process.env.postgres_pwd,
    //   postgres_db: process.env.postgres_db,
    // };

    return config;
  },
};
module.exports = nextConfig;
