<?php

header('Content-Type:application/json');

try {
//include databse setup
include('dbinit.php');


    
//enter submitted data to database
   $sql = "SELECT `id`,`sent` FROM `story`ORDER BY `id` DESC LIMIT 2";
    
    $query = $db->prepare($sql);
    $query->execute();
    
//output
    
    $retval['message'] = 'success';
    $retval['data'] = $query->fetchAll(PDO::FETCH_ASSOC);
    
} catch (PDOException $err){
    
    $retval['message'] = 'error';
    $retval['data'] = $err -> getMessage();
    
}

echo json_encode ( $retval );



?>