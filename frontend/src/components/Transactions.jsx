import { useContext } from "react";
import TransactionsCtx from "../context/context";
import shortenAddress from "../utils/shortenAddress";
import useFetch from "../hooks/useFetch";

const TransactionCard = ({
	addressTo,
	addressFrom,
	timestamp,
	message,
	keyword,
	amount,
	url,
}) => {
	const gifURL = useFetch({ keyword });

	return (
		<div
			className="bg-[#181918] m-4 flex flex-1
				2xl:min-w-[350px]
				2xl:max-w-[400px]
				sm:min-w-[250px]
				sm:max-w-[270px]
				min-w-full
				flex-col p-3 rounded-md hover:shadow-2xl
				"
		>
			<div className="flex flex-col items-center w-full mt-3">
				<div className="w-full mb-6 p-2">
					<a
						href={`https://ropsten.etherscan.io/address/${addressFrom}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<p className="text-white text-base">
							From: {shortenAddress(addressFrom)}
						</p>
					</a>
					<a
						href={`https://ropsten.etherscan.io/address/${addressTo}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<p className="text-white text-base">
							To: {shortenAddress(addressTo)}
						</p>
					</a>
					<p className="text-white text-base">Amount: {amount}</p>
					{message && (
						<>
							<br />
							<p className="text-white text-base">Message: {message}</p>
						</>
					)}
				</div>
				<img
					src={gifURL || url}
					alt="gif"
					className="w-full h-48 2xl:h-64 rounded-md shadow-lg object-cover"
				/>

				<div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
					<p className="text-[#37c7da] font-bold">{timestamp}</p>
				</div>
			</div>
		</div>
	);
};

const Transactions = () => {
	const { currentAccount, transactions } = useContext(TransactionsCtx);

	return (
		<div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
			<div className="flex flex-col md:p-12 py-12 px-4">
				{(currentAccount && (
					<h3 className="text-white text-3xl text-center my-2">
						Latest Transactions
					</h3>
				)) || (
					<h3 className="text-white text-3xl text-center my-2">
						Please connect your account to see your transactions.
					</h3>
				)}
				<div className="flex flex-wrap justify-center items-center mt-10">
					{transactions.reverse().map((transaction, i) => (
						<TransactionCard key={i} {...transaction} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Transactions;
