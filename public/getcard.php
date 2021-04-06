<!DOCTYPE html>
<html>

<head>
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
    }

    table,
    td,
    th {
      border: 1px solid black;
      padding: 5px;
    }

    th {
      text-align: left;
    }
  </style>
</head>

<body>

  <?php
  $q = intval($_GET['q']);

  $dbconn = pg_connect("host=localhost dbname=card")
    or die('Could not connect: ' . pg_last_error());

  $sql = "SELECT (cardName, seriesName, rarity, evolve) FROM card";
  $result = pg_query($db, $sql);

  echo "<table><tr><th>Card Name</th><th>Series Name</th><th>Rarity</th><th>Evolve?</th></tr>";
  while ($row = pg_fetch_row($result)) {
    echo "<tr>";
    echo "<td>" . $row['cardName'] . "</td>";
    echo "<td>" . $row['seriesName'] . "</td>";
    echo "<td>" . $row['rarity'] . "</td>";
    echo "<td>" . $row['evolve'] . "</td>";
    echo "</tr>";
  }
  echo "</table>";
  pg_close($dbconn);
  ?>
</body>

</html>