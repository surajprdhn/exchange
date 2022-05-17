import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_KEY;

const useFetch = ({ keyword }) => {
	const [gifURL, setGifURL] = useState("");

	const fetchGifs = async () => {
		try {
			const response = await fetch(
				`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword
					.split(" ")
					.join("")}&limit=1&rating=g&lang=en`
			);

			const { data } = await response.json();

			setGifURL(data[0].images.downsized_medium.url);
		} catch (error) {
			setGifURL(
				"https://media4.popsugar-assets.com/files/2013/11/07/832/n/1922398/eb7a69a76543358d_28.gif"
			);
		}
	};

	useEffect(() => {
		if (keyword) fetchGifs();
	}, [keyword]);

	return gifURL;
};

export default useFetch;
