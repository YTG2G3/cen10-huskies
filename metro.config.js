const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
    const {
        resolver: { sourceExts, assetExts }
    } = await getDefaultConfig();
    return {
        transformer: {
            babelTransformerPath: require.resolve("react-native-sass-transformer")
        },
        resolver: {
            sourceExts: [...sourceExts, "scss", "sass"],
            assetExts: [...assetExts, "cjs"]
        }
    };
})();