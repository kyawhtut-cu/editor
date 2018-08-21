var theme = {
	twilight: [
		"Twilight",
		"ace/theme/twilight",
		"twilight"
	],
	xcode: [
		"X Code",
		"ace/theme/xcode",
		"xcode"
	]
};
var themeDialog = bootbox.prompt({ 
	size: "medium",
	inputType: "text",
	title: " ",
	closeButton: false,
	show: false,
	callback: function(result){
		if(result){
			console.log(result);
		}
	}
});

themeDialog.on("show.bs.modal", function() {
	$('.bootbox-input-text').attr('id','fileType');
	$('.modal-header').css('display','none');
	$('.modal-footer').css('display','none');
	autocompleteForTheme(document.getElementById("fileType"), theme);
});

function autocompleteForTheme(inp, arr) {
	var currentFocus;
	inp.addEventListener("input", function(e) {
		var a, b, i, val = this.value;
		closeAllLists();
		if (!val) { return false;}
		currentFocus = -1;
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		this.parentNode.appendChild(a);
		 $.each(arr, function (key, value) {
		 	if (value[0].toUpperCase().indexOf(val.toUpperCase()) > -1) {
				b = document.createElement("DIV");
				b.innerHTML = "<strong>" + value[0].substr(0, val.length) + "</strong>";
				b.innerHTML += value[0].substr(val.length);
				b.innerHTML += "<input type='hidden' value='" + value[0] + "'>";
				b.addEventListener("click", function(e) {
					inp.value = this.getElementsByTagName("input")[0].value;
					changeFileFormat(value[2].toLowerCase());
				});
				a.appendChild(b);
		 	}
		});
	});

	inp.addEventListener("keydown", function(e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
			currentFocus++;
			addActive(x);
		} else if (e.keyCode == 38) { 
			currentFocus--;
			addActive(x);
		} else if (e.keyCode == 13) {
			e.preventDefault();
			var value = $(this).val().toLowerCase();
			if (currentFocus > -1) {
				if (x) x[currentFocus].click();
			} else {
				changeFileFormat(value);
			}
		}
	});

	function addActive(x) {
		if (!x) return false;
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = (x.length - 1);
		x[currentFocus].classList.add("autocomplete-active");
	}

	function removeActive(x) {
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove("autocomplete-active");
		}
	}

	function closeAllLists(elmnt) {
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}

	document.addEventListener("keydown", function (e) {
		if(e.keyCode === 27){
			$('.bootbox-input-text').val("");
			bootbox.hideAll();
			closeAllLists(e);
		}
	});

	function changeFileFormat(key){
		if(mode[key]) {
			editor.session.setMode(mode[key][1]);
		}
		editor.focus();
		closeAllLists();
		$('.bootbox-input-text').val("");
		bootbox.hideAll();
	}
}