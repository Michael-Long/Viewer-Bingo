<?php

function getBingoState() {

    $ini_array = parse_ini_file("YourUserConfig.ini");

    $host = $ini_array['host'];
    $db = $ini_array['db'];
    $user = $ini_array['user'];
    $pass = $ini_array['pass'];
    $charset = $ini_array['charset'];

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
        $opt = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        $pdo = new PDO($dsn, $user, $pass, $opt);

        if (isset($_GET["count"])) {
            $statement = $pdo->prepare('SELECT COUNT(*) FROM entries');
            $statement->execute();
            http_response_code(200);
            echo json_encode($statement->fetchColumn());
        } else {
            $statement = $pdo->prepare('SELECT * FROM entries');
            $statement->execute();
            http_response_code(200);
            echo json_encode($statement->fetchAll(PDO::FETCH_ASSOC));
        }
    } else {
        http_response_code(405);
    }
}
?>