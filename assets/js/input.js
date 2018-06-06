(function ($) {

	/**
	*  initialize_field
	*
	*  This function will initialize the $field.
	*
	*  @date	30/11/17
	*  @since	5.6.5
	*
	*  @param	n/a
	*  @return	n/a
	*/

	function initialize_field($field) {
		console.log($field)
		const Cell = function(){
			this.currentMode = 'random';
			this.currentValue = '';
		}
		const namespace = '#ppt-imagegrid-container'
		const addRow = function(){
			let newRow = [];
			console.log('Add Row')
			for (let i = 0; i < app.colCount; i++){
				newRow.push(new Cell())
			}
			app.rows.push(newRow)
			updateJSON()
		};
		const addCol = function(){
			for (let i = 0; i < app.rows.length; i++){
				let r = app.rows[i];
				r.push(new Cell())
			}
			app.colCount++;
			updateJSON()
		};
		const updateJSON = function(){
			app.JSONData = JSON.stringify(app.rows)
		} 
		const removeCol = function(){
			for (let i = 0; i < app.rows.length; i++){
				let r = app.rows[i];
				r.splice(-1,1)
			}
			app.colCount--;
			updateJSON()
		};
		//$field.doStuff();
		console.log('hi')
		var app = new Vue({
			el: namespace,
			data: {
				colCount: 1,
				JSONData: '',
				rows: [
					[new Cell],
					[new Cell],
					[new Cell],
				]
			},
			methods: {
				updateJSON: function(){
					this.JSONData = JSON.stringify(this.rows)
				},
				removeRow: function (index) {
					this.rows.splice(index, 1)
					updateJSON()
				},
				setCellStatus: function () {
				},
				launchUploader: function(cell, event){
					var send_attachment_bkp = wp.media.editor.send.attachment;
					var button = event.srcElement;
					wp.media.editor.open(button);
					wp.media.editor.send.attachment = function(props, attachment) {
						console.log(attachment)
						cell.currentValue = attachment.uploadedTo;
						updateJSON()
						// The media dialogue is great, but it only lets is pick media objects.
						// What we want is a Letter (a post object)
						// We can work around this by reading the uploadedTo variable,
						// which has the correct post ID even if the image is uploaded before the post is created
					}
					return false;
				}
			}
		})
	$field.context.querySelector('#addRow').addEventListener('click', addRow);
	$field.context.querySelector('#addCol').addEventListener('click', addCol);
	$field.context.querySelector('#removeCol').addEventListener('click', removeCol);
	
	}


	if (typeof acf.add_action !== 'undefined') {

		/*
		*  ready & append (ACF5)
		*
		*  These two events are called when a field element is ready for initizliation.
		*  - ready: on page load similar to $(document).ready()
		*  - append: on new DOM elements appended via repeater field or other AJAX calls
		*
		*  @param	n/a
		*  @return	n/a
		*/

		acf.add_action('ready_field/type=ppt_imagegrid', initialize_field);
		acf.add_action('append_field/type=ppt_imagegrid', initialize_field);


	} else {

		/*
		*  acf/setup_fields (ACF4)
		*
		*  These single event is called when a field element is ready for initizliation.
		*
		*  @param	event		an event object. This can be ignored
		*  @param	element		An element which contains the new HTML
		*  @return	n/a
		*/

		$(document).on('acf/setup_fields', function (e, postbox) {

			// find all relevant fields
			$(postbox).find('.field[data-field_type="ppt_imagegrid"]').each(function () {

				// initialize
				initialize_field($(this));

			});

		});

	}

})(jQuery);
