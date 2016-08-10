<?php
function non_block_read($fd, &$data) {
    $read = array($fd);
    $write = array();
    $except = array();
    $result = stream_select($read, $write, $except, 0);
    if($result === false) throw new Exception('stream_select failed');
    if($result === 0) return false;
    $data = stream_get_line($fd, 1);
    return true;
}

$linea = '';
while(1) {
    $x = '';
    if(non_block_read(STDIN, $x)) {
	$linea .= $x;
        //echo "Input: " . $x . "\n";
        // handle your input here
    } else {
	if($linea != ''){
		echo $linea;//.PHP_EOL;
		$linea = '';
	}
        //echo ".";
        // perform your processing here
    }
}
