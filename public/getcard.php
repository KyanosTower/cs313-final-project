<!DOCTYPE html>
<html>
<head>
<style>
table {
  width: 100%;
  border-collapse: collapse;
}

table, td, th {
  border: 1px solid black;
  padding: 5px;
}

th {text-align: left;}
</style>
</head>
<body>

<?php
$q = intval($_GET['q']);

$con = mysqli_connect('localhost','username','password','card');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"card");
$sql="SELECT * FROM card";
$result = mysqli_query($con,$sql);

echo "<table>
<tr>
<th>Card Name</th>
<th>Series Name</th>
<th>Rarity</th>
<th>Evolve?</th>
</tr>";
while($row = mysqli_fetch_array($result)) {
  echo "<tr>";
  echo "<td>" . $row['cardName'] . "</td>";
  echo "<td>" . $row['seriesName'] . "</td>";
  echo "<td>" . $row['rarity'] . "</td>";
  echo "<td>" . $row['evolve'] . "</td>";
  echo "</tr>";
}
echo "</table>";
mysqli_close($con);
?>
</body>
</html>