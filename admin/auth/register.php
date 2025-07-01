<?php 
 include '../models/database.php';

 $conn = new DatabaseConnection();
 $pdo = $conn->connect();

 $username = $_POST['username'];
 $password = $_POST['password'];
 $confirm_pass = $_POST['confirm_pass'];

 if($password === $confirm_pass){
    $password = password_hash($password,PASSWORD_DEFAULT);
    $sql = "INSERT INTO users (username,password) VALUES (?,?)";
    $statement = $pdo->prepare($sql);
    $statement->execute([$username,$password]);
   
    if($statement){
      header('Location: ../../login.html');
      exit();
    }
 }else{
    header('Location: ../../register.php?error=password_mismatch');
    exit();
 }


?>