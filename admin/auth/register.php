<?php 
 include '../models/database.php';

 $conn = new DatabaseConnection();
 $pdo = $conn->connect();

 $username = $_POST['username'];
 $password = $_POST['password'];
 $confirm_pass = $_POST['confirm_pass'];

 if($password !== $confirm_pass){
    header('Location: ../../register.php?error=password_mismatch');
    exit();
 }else{
  $enc_password = password_hash($password,PASSWORD_DEFAULT);
  $sql = "INSERT INTO users (username,password) VALUES (?,?)";
  $statement = $pdo->prepare($sql);
  $statement->execute([$username,$enc_password]);
 
  if($statement){
    header('Location: ../../login.php');
    exit();
  }
 }





?>