<?php

if(empty($_GET)){//check if you have all the data you need from the client-side call.  
	$ouput['errors'] = 'missing data';//if not, add an appropriate error to errors
}
$query = "DELETE FROM `student_data` WHERE ID={$_GET['student_id']}";
//write a query that deletes the student by the given student ID  
//send the query to the database, store the result of the query into $result
$result = mysqli_query($conn, $query);


if(empty($result)){//check if $result is empty.  
	$output['errors'] = 'database error';//if it is, add 'database error' to errors
}else {//else: 
	if(mysqli_affected_rows($conn)){//check if the number of affected rows is 1
		$output['success'] = true;//if it did, change output success to true
	}else {
		$output['errors'] = 'delete error';//if not, add to the errors: 'delete error'
	}	
}
?>