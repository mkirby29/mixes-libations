<?php

if(empty($_GET['name'] || $_GET['grade'] || $_GET['course_name'])){//check if you have all the data you need from the client-side call.  
	$output['errors'] = 'missing data';//if not, add an appropriate error to errors
}

$name=$_GET['name'];
$grade=$_GET['grade'];
$course_name=$_GET['course_name'];
//write a query that inserts the data into the database.  remember that ID doesn't need to be set as it is auto incrementing
$query = "INSERT INTO `student_data`(`id`, `name`, `grade`, `course_name`) VALUES ($name, $course_name, $grade)";

//send the query to the database, store the result of the query into $result
$result = mysqli_query($conn, $query);


if(empty($result)){//check if $result is empty.  
	$output['errors'] = 'database error';//if it is, add 'database error' to errors
}else {//else: 
	if(mysqli_affectec_rows($conn)){//check if the number of affected rows is 1
		$output['success'] = true;//if it did, change output success to true
		$new_id = mysqli_insert_id($conn);//get the insert ID of the row that was added
		$output['new_id'][] = $new_id;//add 'insertID' to $outut and set the value to the row's insert ID
	}else {
		$output['errors'] = 'insert error';//if not, add to the errors: 'insert error'
	}
}
?>