<?php

//write a query that selects all the students from the database, all the data from each row
$query = "SELECT * FROM `student_data`";
//send the query to the database, store the result of the query into $result
$result = mysqli_query($conn, $query);

if(empty($result)){//check if $result is empty.  
	$output['errors'] = 'database error';//if it is, add 'database error' to errors
}else {//else: 
	if(mysqli_num_rows($result)>0){//check if any data came back
		$output['success'] = true;//if it did, change output success to true
		while($row = mysqli_fetch_assoc($result)){//do a while loop to collect all the data 
			$output['data'][] = $row;//add each row of data to the $output['data'] array
		}
	}else {		
		$output['errors'] = 'no data';//if not, add to the errors: 'no data'
	}
}		

?>