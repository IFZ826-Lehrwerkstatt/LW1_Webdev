<!-- script adapted from https://www.w3schools.com/php/php_mysql_connect.asp -->
<!-- mysqli requires sudo apt-get install php-mysql -->

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>MySql-Datenbank-Abfrage</title>
    <style>
      *{
        font-family: sans-serif;
      }
      td{
        padding: 3px 5px;
      }
    </style>
  </head>
  <body>
    <h1>Beispielseite mit MySql-Datenbank-Abfrage</h1>
    <table border = 1>
      <tr><th>Modul</th><th>Begriff</th><th>Erkl&auml;rung</th></tr>

      <?php
      $servername = "172.18.0.122";
      $username = "test";
      $password = "__test__";
      $dbname = "lw1_test";

      // Create connection
      $conn = new mysqli($servername, $username, $password, $dbname);

      // Check connection
      if ($conn->connect_error) {
         die("Connection failed: " . $conn->connect_error);
      }
      echo "Hinweis: DB-Verbindung erfolgreich...";

      $sql = "SELECT * FROM fachbegriff WHERE modul = 'M403'";
      $result = $conn->query($sql);

      if ($result->num_rows > 0) {
          // output data of each row
          while($row = $result->fetch_assoc()) {
              echo "<tr><td>" . $row["modul"]. "</td><td>" . $row["begriff"]. "</td><td>" . $row["erklaerung"]. "</tr>";
          }
      } else {
          echo "0 results";
      }
      $conn->close();
      ?>

    </table>

  </body>
</html>
