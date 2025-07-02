<?php 
  include '../models/database.php';
  session_start();

  $conn = new DatabaseConnection();
  $pdo = $conn->connect();

  $username = $_POST['username'];
  $password = $_POST['password'];

  $query = "SELECT * FROM users WHERE username = '$username'";
  $statement = $pdo->prepare($query);
  $statement->execute();

  if($statement->rowCount()){
    $data = $statement->fetch();
    if(password_verify($password,$data['password'])){
       $_SESSION['username'] = $data['username'];
       header('Location: ../index.php');
       exit();
    }else{
       header('Location: ../../login.php?error=wrong_password');
    }
  }else{
       header('Location: ../../login.php?error=not_found');
  }
?>