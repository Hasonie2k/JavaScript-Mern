function update_position(e) {
	let _t = e.target;
	
	if(_t.tagName.match(/^button$/i)) {
		let r = _t.getBoundingClientRect();
		['x', 'y'].forEach(c => 
			_t.style.setProperty(`--${c}`, 
													`${e[`client${c.toUpperCase()}`] - r[c]}px`))
	}
}

addEventListener('mouseover', update_position);
addEventListener('mouseout', update_position)