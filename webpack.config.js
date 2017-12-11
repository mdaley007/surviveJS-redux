// load modules
const CleanPlugin       = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlTemplate      = require('html-webpack-template')
const Path              = require('path')
const Webpack           = require('webpack')
const Merge             = require('webpack-merge')

// load package.json
const packageJson       = require('./package.json')
// get the package.json script that is being run
const TARGET            = process.env.npm_lifecycle_event
// set babel env to match npm env
process.env.BABEL_ENV   = TARGET

// customize html
const HTML = {
    appMountId: 'root',
    links:      [],
}

// define paths
const PATHS = {
    entry:   Path.join(__dirname,  packageJson.main),
    favicon: Path.join(__dirname, 'source/media/favicon.ico'),
    output:  Path.join(__dirname, 'build'),
    test:    Path.join(__dirname, 'tests'),
}

// define config common to all TARGETs
const common = {
    entry: {
        root: PATHS.entry,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory'],
                include: PATHS.entry,
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: 'file-loader',
            },
            {
                test: /\.json$/,
                use: 'json-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            appMountId: HTML.appMountId,
            favicon: PATHS.favicon,
            historyApiFallback: true,
            inject: false,
            links: HTML.links,
            meta: [
                {description: packageJson.description},
                {keywords:    packageJson.keywords},
            ],
            minify: { collapseWhitespace: true },
            mobile: true,   // width=device-width, initial-scale=1
            template: HtmlTemplate,
            title: packageJson.HRMLtitle,
        }),
    ],
    resolve: {
        extensions: ['.js'],
    },
}

// define config for specific TARGETs
var specific
switch (TARGET) {
    case 'build':
    case 'prod':    // production
        specific = {
            entry: {
                vendor: Object.keys(packageJson.dependencies),
            },
            module: {
                rules: [
                    {
                        test: /\.css$/,
                        use: ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: [
                                {
                                    loader: 'css-loader',
                                    /*
                                    options: {
                                        camelCase: true,
                                        importLoaders: 1,
                                        localIdentName: '[name]-[local]-[hash:base64:6]',
                                        minimize: true,
                                        modules: true,
                                    },
                                    */
                                },
                                {
                                    loader: 'postcss-loader',
                                },
                            ],
                        }),
                        include: PATHS.entry,
                    },
                ],
            },
            output: {
                path: PATHS.output,
                filename: '[name].[chunkhash].js',
                chunkFilename:   '[chunkhash].js',
            },
            plugins: [
                new CleanPlugin([PATHS.output]),
                new ExtractTextPlugin('[name].[chunkhash].css'),
                new Webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
                new Webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'] }),
                new Webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
            ],
        } // specific
        break
    default:  // start, dev, default = development
        specific = {
            devtool: 'eval-source-map',
            devServer: {
                historyApiFallback: true,
                hot: true,
                inline: true,
                stats: 'errors-only',
                host: process.env.HOST,
                port: process.env.PORT,
            },
            module: {
                rules: [
                    {
                        test: /\.css$/,
                        use: [
                            {
                                loader: 'style-loader?sourceMap',
                            },
                            {
                                loader: 'css-loader',
                                /*
                                options: {
                                    camelCase: true,
                                    importLoaders: 1,
                                    localIdentName: '[name]-[local]-[hash:base64:6]',
                                    modules: true,
                                },
                                */
                            },
                            {
                                loader: 'postcss-loader',
                            },
                        ],
                        include: PATHS.entry,
                    }
                ],
            },
            plugins: [
                new Webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
                new Webpack.HotModuleReplacementPlugin(),
            ],
        } // specific
} // switch

// export config
module.exports = Merge(common, specific);
