<?php

header('Content-Type:application/json');

try {

	// include database setup
	include('dbinit.php');

	// enter the submitted data into the database
	$sql = "UPDATE `story` SET `sent` = :sent WHERE `id` = :id";
	// bind the params
	$statement = $db->prepare( $sql );
	$statement->bindParam( ':id', $_POST['id']);
	$statement->bindParam( ':sent', $_POST['text']);
	// execute that statement
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
