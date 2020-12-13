(() => {
    const buildURL = opts => {
        return encodeURI(`${opts.baseURL}${opts.type}?api_key=${opts.apiKey}&tag=${opts.tag}&rating=${opts.rating}`);
    }

    const setGIF = url => {
        const img = document.querySelector('#gif');
        img.setAttribute('src', url);
    }

	const requestOptions = {
        baseURL: "https://api.giphy.com/v1/gifs/",
        // c'est pas ma clef mdr
		apiKey: "0UTRbFtkMxAplrohufYco5IY74U8hOes",
		tag: "fail",
		type: "random",
		rating: "pg-13"
	};
    
    fetch(buildURL(requestOptions), {
        method: 'GET',
        credentials: 'omit'
      }).then(res => {
        return res.json();
    }).then(({data}) => {
        if(data && data.image_original_url) {
            setGIF(data.image_original_url);
        }
    });
})();
