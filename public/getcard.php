<?php
$mysqli = new mysqli("localhost", "card");
if($mysqli->connect_error) {
  exit('Could not connect');
}

$sql = "SELECT cardName, seriesName, rarity, evolve FROM card WHERE cardName = ?";

$stmt = $mysqli->prepare($sql);
$stmt->bind_param("s", $_GET['q']);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($card, $series, $rarity, $evolve);
$stmt->fetch();
$stmt->close();

echo "<table>";
echo "<tr>";
echo "<th>Card Name</th>";
echo "<td>" . $card . "</td>";
echo "<th>Series Name</th>";
echo "<td>" . $series . "</td>";
echo "<th>Rarity</th>";
echo "<td>" . $rarity . "</td>";
echo "<th>Evolve</th>";
echo "<td>" . $evolve . "</td>";
echo "</tr>";
echo "</table>";
?>