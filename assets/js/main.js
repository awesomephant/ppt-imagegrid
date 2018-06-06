// THIS IS ALL TEMPORARY
const Cell = function(){
	this.currentValue = 'sin'
}
var app = new Vue({
  el: '#ppt-imagegrid-container',
  data: {
	  colCount: 1,
	  rows: [
		  [{currentValue: 'sin'}],
  		  [{currentValue: 'sin'}],
  		  [{currentValue: 'sin'}],
	 ]
  },
	methods: {
		removeRow: function(index){
			this.rows.splice(index, 1)
		},
		setCellStatus: function(){
		
		}
	}
})
const init = function(){
	table = document.querySelector('.table')
	document.querySelector('#addRow').addEventListener('click', addRow);
	document.querySelector('#addCol').addEventListener('click', addCol);
	document.querySelector('#removeCol').addEventListener('click', removeCol);
}
const addRow = function(){
	let newRow = [];
	for (let i = 0; i < app.colCount; i++){
		newRow.push(new Cell())
	}
	app.rows.push(newRow)
};
const addCol = function(){
	for (let i = 0; i < app.rows.length; i++){
		let r = app.rows[i];
		r.push(new Cell())
	}
	app.colCount++;
};

const removeCol = function(){
	for (let i = 0; i < app.rows.length; i++){
		let r = app.rows[i];
		r.splice(-1,1)
	}
	app.colCount--;
};

init();