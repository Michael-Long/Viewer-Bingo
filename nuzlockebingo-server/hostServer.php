<?php
function doBackend() {

    $ini_array = parse_ini_file("YourHostConfig.ini");

    $host = $ini_array['host'];
    $db = $ini_array['db'];
    $user = $ini_array['user'];
    $pass = $ini_array['pass'];
    $charset = $ini_array['charset'];

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_GET["entries"])) {
            $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
            $opt = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            $pdo = new PDO($dsn, $user, $pass, $opt);

            $statement = $pdo->prepare('SELECT * FROM entries');
            $statement->execute();
            http_response_code(200);
            echo json_encode($statement->fetchAll(PDO::FETCH_ASSOC));
        } else if (isset($_GET["flags"])) {
            $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
            $opt = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            $pdo = new PDO($dsn, $user, $pass, $opt);

            $statement = $pdo->prepare('SELECT * FROM flags');
            $statement->execute();
            http_response_code(200);
            echo json_encode($statement->fetchAll(PDO::FETCH_ASSOC));
        } else if (isset($_GET["count"])) {
            $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
            $opt = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            $pdo = new PDO($dsn, $user, $pass, $opt);

            $statement = $pdo->prepare('SELECT COUNT(*) FROM entries');
            $statement->execute();
            http_response_code(200);
            echo json_encode($statement->fetchColumn());
        } else {
            http_response_code(400);
        }
    } else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST['state'])) {
            if (isset($_POST['id'])) {
                $id = $_POST['id'];
                $state = $_POST['state'];

                $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
                $opt = [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                ];
                $pdo = new PDO($dsn, $user, $pass, $opt);

                $statement = $pdo->prepare("UPDATE `entries` SET `isChecked` = ? WHERE `id` = ?");
                $passed = $statement->execute([$state, $id]);
                http_response_code(200);
                if ($passed)
                    echo "Entry #$id updated.";
                else
                    echo "Entry #$id failed to update";
            } else {
                $state = $_POST['state'];

                $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
                $opt = [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                ];
                $pdo = new PDO($dsn, $user, $pass, $opt);

                $statement = $pdo->prepare("UPDATE `entries` SET `isChecked` = ?");
                $passed = $statement->execute([$state]);
                http_response_code(200);
                if ($passed)
                    echo "Entries updated.";
                else
                    echo "Entries failed to update";
            }
        } else if (isset($_POST['setRandomized'])) {
            $haveRandomizers = $_POST['setRandomized'];

            $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
            $opt = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            $pdo = new PDO($dsn, $user, $pass, $opt);

            $statement = $pdo->prepare('UPDATE `flags` SET `value` = ? WHERE `id` = 1');
            $passed = $statement->execute([$haveRandomizers]);
            http_response_code(200);
            if ($passed)
                echo "Allow Randomized Entries has been updated";
            else
                echo "Allow Randomized Entries failed to update";
        } else {
            http_response_code(400);
        }
    } else {
        http_response_code(405);
    }
}
?>