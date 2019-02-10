<?php

$conn = mysqli_connect('localhost', 'matt', 'bananaRacecar', 'cocktails');

$truncateSQL = "TRUNCATE `coctail_data`";

mysqli_query($conn, $truncateSQL);

$insertSQL = "INSERT INTO `cocktail_data` (`id`, `name`, `rating`, `location`) VALUES
(1, 'Mai Tai', 9.0, 'House of Blues'),
(2, 'Long Island', 9.9, 'Legends'),
(3, 'Whiskey Sour', 8.5, 'Grasslands'),
(4, 'Coors Lite', 4.5, 'Joe Jost\'s'),
(5, 'Sangria', 8.9, 'Habana'),
(6, 'Manhattan', 9.2, 'Haven'),
(7, 'Old Fashion', 10.0, 'Blind Rabbit'),
(8, 'Tom Collins', 7.5, 'O\'Connel\'s')";

mysqli_query($conn, $insertSQL);

?>