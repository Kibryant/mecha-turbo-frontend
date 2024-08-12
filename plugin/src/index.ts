import { ConfigPlugin, withInfoPlist } from "expo/config-plugins";

const withCustomConfig: ConfigPlugin = (config, id) => {
  return withInfoPlist(config, (config) => {
    config.modResults.NSAppTransportSecurity = {
      NSAllowsArbitraryLoads: true,
    };
    return config;
  });
};

export default withCustomConfig;
