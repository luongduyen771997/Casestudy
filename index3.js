let board = [];
let data = '';
for (let i = 0; i < 3; i++) {
	board[i] = [];
}
function Start() {
	data += '<table id="game-table">';
	for (let i = 0; i < 3; i++) {
		data += '<tr>';
		for (let j = 0; j < 7; j++) {
			data +=
				'<td>' + '<div style="width: 100px; height: 100px;">' + '</td>';
		}
		data += '</tr>';
	}
	data += '</table>';
	document.getElementById('img').innerHTML = data;
	const mutation = new MutationObserver(() => setTimeout(checkWin, 0));
	mutation.observe(document.body, {
		attributes: true,
		childList: true,
		subtree: true,
	});bt 
}
Start();

function allowDrop(ev) {
	ev.preventDefault();
}
function drag(ev) {
	ev.dataTransfer.setData('text', ev.target.id);
}
function drop(ev) {
	data = ev.dataTransfer.getData('text');
	// Prevent Duplication
	if (
		data &&
		ev.target.children.length == 0 &&
		ev.target.nodeName.toLowerCase() === 'div'
	) {
		ev.target.appendChild(document.getElementById(data));
		ev.preventDefault();
	}
}

function checkWin() {
	if (document.getElementById('collections').children.length === 0) {
		const tableBody = document.getElementById('game-table').firstChild;
		let rows = [];
		tableBody.childNodes.forEach(r => rows.push(r.childNodes));

		let seq = 1;
		let isWon = true;
		rows.forEach(cols => {
			cols.forEach(d => {
				const divNode = d.childNodes[0];
				const imgNode = divNode.childNodes[0];
				if (!imgNode.id.includes(seq)) {
					//If any image node does not align sequence number
					isWon = false;
				}
				seq++;
			});
		});
		if (isWon) {
			window.alert('You have won');
		} else {
			window.alert('You have lost');
		}
	}
}
