var editor = ace.edit("myEditor");
var fontSize = 18;

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
	console.log(editor.getValue());
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
	$.get(this.files[0], function(data) {
		editor.setValue(data);
	}, 'text');
});

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
