
<?php
 
 class DatabaseConnection{
  private $host;
  private $user;
  private $password;
  private $dbname;
  private $charset;

  public function connect(){
    $this->host = 'localhost';
    $this->user = 'root';
    $this->password = '';
    $this->dbname = 'amazon';
    $this->charset = 'utf8mb4';

    try{
      $pdo = new PDO("mysql:host=$this->host;dbname=$this->dbname;charset=$this->charset",$this->user,$this->password);
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      return $pdo;
    }
    catch(PDOException $e){
       echo "Database Connection Failed: ".$e->getMessage();
    }
  }
 }

?>