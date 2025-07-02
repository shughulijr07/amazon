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
    <?php 
        if(isset($_GET['error']) && $_GET['error'] === 'wrong_password'){
            echo "<p style='color:red'>Wrong Password</p>";
        }elseif(isset($_GET['error']) && $_GET['error'] === 'not_found'){
            echo "<p style='color:red'>User not found<p>";
        }
    ?>
    <form action="admin/auth/login.php" class="login-form" method="POST">
        <h1 class="login-title">Login</h1>

        <div class="input-box">
            <i class='bx bxs-user'></i>
            <input type="text" placeholder="Username" name="username">
        </div>
        <div class="input-box">
            <i class='bx bxs-lock-alt'></i>
            <input type="password" placeholder="Password" name="password">
        </div>

        <div class="remember-forgot-box">
            <label for="remember">
                <input type="checkbox" id="remember">
                Remember me
            </label>
            <a href="#">Forgot Password?</a>
        </div>

        <button class="login-btn">Login</button>

        <p class="register">
            Don't have an account?
            <a href="register.php">Register</a>
        </p>
    </form>
</body>
</html>