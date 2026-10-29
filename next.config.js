module.exports = {
    turbopack: {
        root: __dirname,
    },
    async redirects() {
        return [];
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        })

        return config
    },
    compiler: {
        styledComponents: true
    }
}
