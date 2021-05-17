const CONTRACT_NAME = "dev-1612327288811-2721774";
const CONTRACT_B_NAME = "dev-1612327282548-8486066";

module.exports = function getConfig(isServer = false) {
  let config = {
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    CONTRACT_NAME,
  };

  if (process.env.REACT_APP_ENV !== undefined) {
    config = {
      ...config,
      CONTRACT_B_NAME,
      GAS: "35000000000000",
      DEFAULT_NEW_ACCOUNT_AMOUNT: "5",
      contractMethods: {
        changeMethods: ["check_balance_contract_b"],
      },
    };
  }

  if (process.env.REACT_APP_ENV === "prod") {
    config = {
      ...config,
      networkId: "mainnet",
      nodeUrl: "https://rpc.mainnet.near.org",
      walletUrl: "https://wallet.near.org",
      helperUrl: "https://helper.mainnet.near.org",
      CONTRACT_NAME: "near",
    };
  }

  return config;
};
