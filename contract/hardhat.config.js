require("@nomiclabs/hardhat-waffle");

module.exports = {
	solidity: "0.8.0",
	networks: {
		ropsten: {
			url: "https://eth-ropsten.alchemyapi.io/v2/eh76O5NVA-n7W8iHNvPlT_PV40Q8xx19",
			accounts: [
				"7fe34879191073f0a4ad6350640e7c45fbdfbf153d181297753f4a24614ecda7",
			],
		},
	},
};
