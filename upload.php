<?php
	$my_file = 'http://localhost/project/ace-editor/index.html';
	$handle = fopen($my_file, "w") or die("Unable to open file!");
	fwrite($handle, "Hello");
	fclose($handle);
?>