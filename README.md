# Viewer Bingo
This project was to give some more viewer-streamer interaction during long playthroughs of games. This gives the viewers a webpage to view a bingo board, which is filled with various events that could take place during a given playthrough as specified by the organizer. The organizer has their own webpage that lists out all their events, which they can toggle on and off to mark squares on all viewer's boards.

## Features
* Web-based bingo board to display a board to the viewer.
* Boards update upon hitting the __Update Board__ button, with marked squares turning green.
* If a board has a bingo, the winning line turns blue.
* Boards are saved using codes, with the streamer being able to generate new codes.
* Streamer has a control panel webpage to toggle which squares are marked.
* Communication between streamer and viewer happen through a remote database.
---
## Installation
The repo has been seperated into 3 main components:
* `nuzlockebingo-client` is the webpage that viewers will interact with to view their board. Wherever this page is hosted is the link that should be shared with the viewerbase.
* `nuzlockebingo-hostclient` is the webpage that the host will interact with to toggle the events. This page should only be accessed by the host, unless you want your viewers to give themselve a bingo.
* `nuzlockebingo-server` is the backend logic that both webpages will query to interact with the shared database. The location of these files will be needed later.

### Component Setup
Once the 3 components are in their respective locations, you'll have to modify the `index.php` for 2 components.
* For `nuzlockebingo-client`, the include should point to the location of the `viewerServer.php` within `nuzlockebingo-server`. This will connect the viewer's webpage to the backend database.
* The same will have to be done for `nuzlockebingo-hostclient` and `hostServer.php`.

The last modification that needs to be made is within the `viewerServer.php` and `hostServer.php`. Each of these files will have their own .ini file that holds the information for connecting to the database. The following is a sample .ini file that has each of the fields that the files are expecting to find.

```ini
[config]
host = 'your-host-here';
db = 'your-database-name-here';
user = 'your-database-user-here';
pass = 'your-database-userpass-here';
charset = 'utf8';
```

Be sure to have this information in a secure location, as you don't want others to obtain access to your database. Once these two .ini files are created, enter their location within the `parse_ini_file()` function at the top of both `viewerServer.php` and `hostServer.php`.

### Database Setup
The `nuzlockebingo-server` is expecting a specific database structure. This needs to be setup before the server can do anything.

If you have a way of importing a database structure through SQL, you can use the following to automatically setup the proper tables:
```SQL
CREATE TABLE `entries` (
  `id` int(11) NOT NULL,
  `content` mediumtext NOT NULL,
  `isRandomized` tinyint(1) NOT NULL DEFAULT 0,
  `isChecked` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `flags` (
  `id` int(11) NOT NULL,
  `name` mediumtext NOT NULL,
  `value` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `entries`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `flags`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `entries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `flags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

```

If you don't have a way to import these tables, the above should still give you an idea of what the server is expecting of the database.

Once the database is setup, the program should be ready to go!

---
## Usage
Once the webpages are live, connect to the viewer URL. You should see some controls to the left-hand side and a 5x5 grid in the center. The grid starts initially blank. To fill it with data, we'll have to generate a board code to enter.

Head over to the host URL. Here you should see some more controls to the left-hand side and a grid of checkboxes in the center. The checkboxes in the center represent each event listed within the `entries` database. If none are loaded, ensure your host client is able to connect to the database.

### Generating Bingo Codes
On the left-hand side, hit the `Generate Code` button. Below the button a hexadecimal code should have appeared. This is a new board code that has been generated based on all the entires shown in the checkbox grid. Each selected entry is unique, so no two squares are the same.

### Loading Bingo Codes
Copy the generated code and paste it into the `Code...` field on the viewer URL. Hit the `Enter Code` button and your bingo board will now be populated with entries.

### Marking Events
On the host URL, whenever you enable a checkbox, that marks that entry as marked. This will make it's respective squares green on the viewer's boards. Unchecking the checkbox will unmark that event.

### Updating Bingo Boards
On the viewer URL, whenever the `Update Board` button is clicked, the bingo grid will update its square's colors if any of the present squares have been marked.

If the updated bingo board would result in a bingo, the winning row will turn blue, signifying the board is completed.

---
## Sample Data
Within the `sample-entries` directory, there's some .sql files that hold some sample entries for the `entries` table within the database. These are tables that I've used in my usage of this project, but new entires can be created just by entering them into the `entries` table.

---
## Credit
I cannot take full credit for the state of this project. While I wrote the project, there has been some other helping hands involved in this.
* My friend Erica, for coming up with the idea initially and letting me turn it into a reality.
* My friend Aaron, for bouncing development ideas for how to approach different issues and with QA.
* [Mopo Shnack](https://www.youtube.com/channel/UCgsTpLSO6Y0HO3HeEQR7OKg), for being the first user of the program outside of myself, basically a real-world test run.