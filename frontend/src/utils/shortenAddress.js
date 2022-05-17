const shortenAddress = (address) => {
	return `${address.slice(0, 6)}...${address.slice(
		address.length - 5
	)}`.toUpperCase();
};

export default shortenAddress;
