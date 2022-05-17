import { createContext } from "react";

const TransactionCtx = createContext({
	connectWallet: () => {},
	currentAccount: "",
	formData: {},
	handleChange: (e, name) => {},
	sendTransaction: () => {},
	transactions: [],
	isLoading: false,
});

export default TransactionCtx;
