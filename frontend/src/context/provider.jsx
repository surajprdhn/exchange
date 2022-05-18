import { useState, useEffect } from "react";
import TransactionCtx from "./context";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

const { ethereum } = window;

const checkEthereum = () => {
	if (!ethereum) {
		return alert("Please install MetaMask");
	}
};

const getEthereumContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const trasactionContract = new ethers.Contract(
		contractAddress,
		contractABI,
		signer
	);

	return trasactionContract;
};

const TransactionProvider = ({ children }) => {
	const [currentAccount, setCurrentAccount] = useState("");
	const [formData, setFormData] = useState({
		addressTo: "",
		amount: "",
		keyword: "",
		message: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [transactionCount, setTransactionContract] = useState(
		localStorage.getItem("transactionCount") || 0
	);
	const [transactions, setTransactions] = useState([]);

	const handleChange = (e, name) => {
		setFormData((prev) => ({ ...prev, [name]: e.target.value }));
	};

	const checkIfWalletConnected = async () => {
		try {
			checkEthereum();
			const accounts = await ethereum.request({ method: "eth_accounts" });
			if (accounts.length) {
				setCurrentAccount(accounts[0]);
				getAllTransactions();
			} else {
				console.log("No accounts found");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const connectWallet = async () => {
		try {
			checkEthereum();
			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
		}
	};

	const sendTransaction = async () => {
		try {
			checkEthereum();
			const { addressTo, amount, keyword, message } = formData;
			const transactionContract = getEthereumContract();
			const parseAmt = ethers.utils.parseEther(amount);

			await ethereum.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: currentAccount,
						to: addressTo,
						value: parseAmt._hex,
						gas: "0x5208",
					},
				],
			});

			const transactionHash = await transactionContract.addToBlockChain(
				addressTo,
				parseAmt,
				message,
				keyword
			);
			setIsLoading(true);
			console.log("Loading...", transactionHash.hash);
			await transactionHash.wait();
			setIsLoading(false);
			console.log("Transaction Successful", transactionHash.hash);

			const transactionCount = await transactionContract.getTransactionCount();
			setTransactionContract(transactionCount.toNumber());
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const checkIfTransactionsExist = async () => {
		try {
			const transactionContract = getEthereumContract();
			const transactionCount = await transactionContract.getTransactionCount();
			localStorage.setItem("transactionCount", transactionCount.toNumber());
		} catch (error) {
			console.log(error);
		}
	};

	const getAllTransactions = async () => {
		try {
			checkEthereum();
			const transactionContract = getEthereumContract();
			const availableTransactions =
				await transactionContract.getAllTransactions();

			const modifiedTransactions = availableTransactions.map((transaction) => ({
				addressTo: transaction.receiver,
				addressFrom: transaction.sender,
				timestamp: new Date(
					transaction.timestamp.toNumber() * 1000
				).toLocaleString(),
				message: transaction.message,
				keyword: transaction.keyword,
				amount: parseInt(transaction.amount._hex) / 10e18,
			}));

			setTransactions(modifiedTransactions);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		checkIfWalletConnected();
		checkIfTransactionsExist();
	}, []);

	const values = {
		connectWallet,
		currentAccount,
		formData,
		handleChange,
		sendTransaction,
		transactions,
		isLoading,
	};

	return (
		<TransactionCtx.Provider value={values}>{children}</TransactionCtx.Provider>
	);
};

export default TransactionProvider;
