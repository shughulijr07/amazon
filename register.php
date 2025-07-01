<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Form</title>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="styles/pages/login.css">
</head>
<body>

    <form action="admin/auth/register.php" class="login-form" method="post">
        <h1 class="login-title">Register</h1>

        <div class="input-box">
            <i class='bx bxs-user'></i>
            <input type="text" placeholder="Username" name="username">
        </div>
        <div class="input-box">
            <i class='bx bxs-lock-alt'></i>
            <input type="password" placeholder="Password" name="password">
        </div>
        <div class="input-box">
          <i class='bx bxs-lock-alt'></i>
          <input type="password" placeholder="Confirm Password" name="confirm_pass">
      </div>
        <button type="submit" class="login-btn">Register</button>

    </form>
     <div>
     <?php 
        if(isset($_GET['error']) && $_GET['error'] == 'password_mismatch'){
            echo "<div><p style='color:red'>Password not match</p></div>";
        }
    ?>
     </div>
    
</body>
</html>