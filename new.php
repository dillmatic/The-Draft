<?php
header('Content-Type:application/json');

try {

	// include database setup
	include('dbinit.php');

	// enter the submitted data into the database
	$sql = "INSERT INTO `story` (`sent`) VALUES( :sent );";
    
//enter submitted data to database
    
$statement = $db->prepare($sql);
$statement->bindParam(':sent',$_POST['text']);
 
$statement->execute();

	// as long as evertying is okay...
	// output
	$retval['message'] = 'success';

} catch( PDOException $err ) {
	$retval['message'] = 'error';
	$retval['data'] = $err->getMessage();
}

echo json_encode( $retval );


?>