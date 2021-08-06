let openFreebitcoin = async (tabs) => {
	browser.tabs.create({url: 'https://freebitco.in/'});

	return true;
}

let isFreebitcoinOpen = async (tabs) => {

	/* creates a promisse that searchs for freebitcoin tabs */
	let querying_tabs = browser.tabs.query({url: 'https://freebitco.in/*'});

	/* returns true if it finds any open freebitcoin tabs, false otherwise */
	return querying_tabs.then((tab) => {

		/* if the number of open tabs in https://freebitco.in/ is bigger than 0 return true */
		return tab.length > 0 ? true : false; 

	}).catch((err) => {
		
		/* if querying tabs fails logs a message */
		console.log(err);

	});

}


let autoroll = async () => {
	let guarantees_freebitcoin_is_open =  isFreebitcoinOpen().then(is_open => {
		if (!is_open ) {
			return openFreebitcoin().then(e => e);
		} else {
			return true;
		}

	});

	let gets_freebitcoin_tab_id =  guarantees_freebitcoin_is_open.then(() => {
		let gets_freebitcoin_tab_id = browser.tabs.query({url: 'https://freebitco.in/*'}).then(tab => tab[0]);

		return gets_freebitcoin_tab_id;
	});

	let inject_autoroll_code = gets_freebitcoin_tab_id.then((tab, tabs) => {
		let code_to_inject = `btn = document.querySelector('#free_play_form_button');console.log('im here'); if (btn.style.display != "none") {btn.click(); "ROLL"} else { "NO ROLL"};`;

		let run_code_in_tab = browser.tabs.executeScript(tab.id, {code: code_to_inject});
			
		run_code_in_tab.then(e => {return e});

		return run_code_in_tab;

	});

	return inject_autoroll_code;

};

let main = async () => {
	setInterval(() => {
		autoroll().then(e => console.log(e));
	}, 15000);
};

main();