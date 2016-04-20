<?php
try {
//include databse setup
include('dbinit.php');


$sql = "CREATE TABLE IF NOT EXISTS `lidil`.`story` (
`id` INT NOT NULL AUTO_INCREMENT,
`sent` VARCHAR(255) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE = InnoDB;";

//execute the sql statement
$result = $db->exec($sql);
    
//output
    
$retval['message'] = 'success';
} catch (PDOException $err){
    
$retval['message'] = 'error';
$retval['data'] = $err -> getMessage();
    
}

?>