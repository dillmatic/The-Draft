<?php
$db = new PDO('mysql:host=localhost;dbname=lidil;charset=utf8', 'dillaljj_lidil', 'ilango12');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);    

?>