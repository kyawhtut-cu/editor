var editor = ace.edit("myEditor");
var fontSize = 18;
var selectedFile = new FormData();

editor.setTheme("ace/theme/dracula");
editor.session.setMode("ace/mode/html");
ace.config.loadModule("ace/ext/language_tools", function() {
	editor.setOptions({
		enableSnippets: true,
		enableBasicAutocompletion: true,
		enableLiveAutocompletion : true
	});
});
ace.config.loadModule("ace/ext/emmet", function() {
	ace.require("ace/lib/net").loadScript("jquery/emmet.js", function() {
		editor.setOption("enableEmmet", true);
		editor.setOption("enableEmmet", true);
	});
});
editor.resize();
editor.setOptions({
	highlightActiveLine : true,
	readOnly : false,
	selectionStyle : "line",
	copyWithEmptySelection: true,
	fontSize : fontSize,
	showInvisibles : false,
	tooltipFollowsMouse: true,
	wrap : "free",
	foldStyle : "markbeginend",
	scrollPastEnd : 1
});

function fileExtension() {
	bootbox.dialog({
		message: dialogList(mode, "language"),
		onEscape: true,
		backdrop: true,
		closeButton: false
	});
}

function themeDialog() {
	bootbox.dialog({
		message: dialogList(theme, 'theme'),
		onEscape: true,
		backdrop: true,
		closeButton: false
	});
}

function save() {
	// console.log(editor.getValue());
	save_content_to_file(editor.getValue(), selectedFile);
}

function deleteFile() {
	editor.setValue("");
}

function openFile(eID) {
	var elem = document.getElementById(eID);
	if(elem && document.createEvent) {
		var evt = document.createEvent("MouseEvents");
		evt.initEvent("click", true, false);
		elem.dispatchEvent(evt);
	}
}

$('input[type=file]').change(function(e) {
	// selectedFile = new FormData();
	// console.log(document.getElementById("fileChoose").value);
	// selectedFile.append("file", e.target.files[0]);
	// $.ajax({
	// 	url : "upload.php",
	// 	method : "POST",
	// 	data : selectedFile,
	// 	contentType : false,
	// 	cache : false,
	// 	processData : false,
	// 	beforeSend : function(){
	// 		console.log("File send to backend");
	// 	},   
	// 	success : function(data) {
	// 		editor.setValue(data);
	// 	}
	// });
	// $.get(this.files[0], function(data) {
	// 	editor.setValue(data);
	// }, 'text');
});

function save_content_to_file(content, filename){
	var dlg = false;
	with(document){
		ir=createElement('iframe');
		ir.id='ifr';
		ir.location='about.blank';
		ir.style.display='none';
		body.appendChild(ir);
		with(getElementById('ifr').contentWindow.document){
			open("text/plain", "replace");
			charset = "utf-8";
			write(content);
			close();
			document.charset = "utf-8";
			dlg = execCommand('SaveAs', false, filename);
		}
		body.removeChild(ir);
	}
	return dlg;
}

editor.commands.addCommand({
	name: 'goToLine',
	bindKey: {win: 'Ctrl-g',  mac: 'Command-g'},
	exec: function(editor) {
		bootbox.prompt({ 
			size: "small",
			inputType: "number",
			title: "What line you go?",
			callback: function(result){
				if(result){
					editor.gotoLine(parseInt(result));
				}
			}
		});
	},
	readOnly: true
});

$('#fontSize').slider({
	tooltip: 'always',
	tooltip_position:'bottom',
	formatter: function(value) {
		fontSize = parseInt(value);
		editor.setOption(
			"fontSize", parseInt(value)
		);
		editor.focus();
		return value;
	}
});