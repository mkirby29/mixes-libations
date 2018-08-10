<?php

define('fromData',true);

if(empty($_GET['action'])){
	exit('no action specified');
}
//require the mysql_connect.php file.  Make sure your properly configured it!
require('mysql_connect.php');

$output = [
	'success'=> false, //we assume we will fail
	'errors'=>[]
];

switch($_GET['action']/*do a comparison switch on the get superglobal action*/){
	case 'readAll':
		include('dataApi/read.php');//include the php file 'read.php'
		break;
	case 'insert':
		include('dataApi/insert.php');//include the php file insert.php
		break;
	case 'delete':
		include('dataApi/delete.php');//include the php file delete.php
		break;
	case 'update':
		include('dataApi/update.php');//include the update.php file
		break;
}

$outputJSON = json_encode($output);//convert the $output variable to json, store the result in $outputJSON

print($outputJSON);//print $outputJSON

//end

?>