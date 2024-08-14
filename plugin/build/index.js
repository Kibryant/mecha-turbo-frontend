"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("expo/config-plugins");
const withCustomConfig = (config, id) => {
    return (0, config_plugins_1.withInfoPlist)(config, (config) => {
        config.modResults.NSAppTransportSecurity = {
            NSAllowsArbitraryLoads: true,
        };
        return config;
    });
};
exports.default = withCustomConfig;
