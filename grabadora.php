<?php
$config = array(
    'database' => array(
        'host' => 'localhost',
        'username' => 'truki',
        'password' => 'truki',
        'database' => 'memory',
        'encoding' => 'utf8'
    ),
);
function Connect( $config = array()){
    $conn = mysqli_connect($config['host'],$config['username'],$config['password']
    ,$config['database']);
    mysqli_set_charset($conn, $config['encoding']);
    return ($conn);
}
function Execute($sql, $conn){
    $return = mysqli_query($conn, $sql);
    return ($return);
}
function ExecuteQuery($sql, $conn){
    $result = mysqli_query($conn, $sql);
    if($row = mysqli_fetch_array($result, MYSQLI_BOTH)){
        do{
            $data[] = $row;
        }while ($row = mysqli_fetch_array($result, MYSQLI_BOTH));
    }else{
        $data = null;
    }
    mysqli_free_result($result);
    return($data);
} 
function Close($conn){
    mysqli_close($conn);
    unset($conn);
}
function Debug($var){
    
    $debug = debug_backtrace();
    echo "<pre>";
    echo $debug[0]['file']." ".$debug[0]['line']."<br><br>";
    print_r($var);
    echo "</pre>";
    echo "<br>";
} 


$nombre = $_POST['nombre'];
$segundos = $_POST['segundos'];
$movimientos = $_POST['movimientos'];

$connection = Connect($config['database']);
$sql  = "insert into puntuacion( user, segundos, movimientos) values( '".$nombre."', '".$segundos."', '".$movimientos."')";
$return = Execute($sql, $connection);
Close($connection);
header ( "location: index.html");
?>