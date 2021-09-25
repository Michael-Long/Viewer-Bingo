$(document).ready(function() {

    var allowRandomize = true;
    var hasBingo = false;

    function setDisableControls(toggle) {
        $("#enterCodeBtn").prop("disabled", toggle);
        $("#updateBtn").prop("disabled", toggle);
    }

    setDisableControls(true);
    $.ajax({
        url: "./index.php",
        type: "get",
        datatype: "JSON",
        success: function(result) {
            var normalEntries = [];
            var randomEntries = [];
            var json = JSON.parse(result);
            for (var index = 0; index < json.length; index++) {
                if (json[index]["isRandomized"] > 0) {
                    randomEntries.push(json[index]);
                } else {
                    normalEntries.push(json[index]);
                }
            }
            window.normalEntries = normalEntries;
            window.randomEntries = randomEntries;
            $("#enterCodeBtn").prop("disabled", false);
        },
        error: function(result) {
            console.log("Couldn't retireve Entries.");
        }
    });

    function getEntry(index) {
        var entryList = [...window.normalEntries];
        if (allowRandomize)
            entryList = entryList.concat(window.randomEntries);
        return entryList[index];
    }

    function getEntryFromText(entryText) {
        var index = getIndex(entryText);
        if (index >= 0)
            return getEntry(index);
        return undefined;
    }

    function getIndex(entry) {
        var entryList = [...window.normalEntries];
        if (allowRandomize)
            entryList = entryList.concat(window.randomEntries);
        for (var index = 0; index < entryList.length; index++) {
            if (entryList[index]["content"] === entry)
                return index;
        }
        return -1;
    }

    function checkBingo() {
        var bingos = [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 30, 13, 14],
            [15, 16, 17, 18, 19],
            [20, 21, 22, 23, 24],
            [1, 6, 11, 15, 20],
            [2, 7, 12, 16, 21],
            [3, 8, 30, 17, 22],
            [4, 9, 13, 18, 23],
            [5, 10, 14, 19, 24],
            [1, 7, 30, 18, 24],
            [5, 9, 30, 16, 20]
        ];

        for (var index = 0; index < bingos.length; ++index) {
            var bingo = true;
            for (var innerdex = 0; innerdex < 5; ++innerdex) {
                if (!$("#Square" + bingos[index][innerdex]).hasClass("bg-success")) {
                    bingo = false;
                    break;
                }
            }
            if (bingo) {
                for (var innerdex = 0; innerdex < 5; ++innerdex) {
                    $("#Square" + bingos[index][innerdex]).addClass("bg-info");
                    $("#codeDisplay").html("BINGO!!!");
                }
                hasBingo = true;
            }
        }
    }

    function updateCode(evt) {
        var currCode = "";
        for (var index = 0; index < 24; index++) {
            var selectedBtn = $("#Square" + (index + 1));
            var entryIndex = parseInt(getIndex(selectedBtn.html()));
            if (entryIndex < 0) {
                console.log("invalid entryIndex retrieved at " + index);
            }
            var hex = entryIndex.toString(16);
            while (hex.length < 4) {
                hex = "0" + hex;
            }
            currCode = currCode.concat(hex);
        }
        $("#codeDisplay").html(currCode);
    }

    function updateBoard(evt) {
        if (hasBingo)
            return;
        setDisableControls(true);
        $.ajax({
            url: "./index.php",
            type: "get",
            datatype: "JSON",
            success: function(result) {
                var normalEntries = [];
                var randomEntries = [];
                var json = JSON.parse(result);
                for (var index = 0; index < json.length; index++) {
                    if (json[index]["isRandomized"] > 0) {
                        randomEntries.push(json[index]);
                    } else {
                        normalEntries.push(json[index]);
                    }
                }
                window.normalEntries = normalEntries;
                window.randomEntries = randomEntries;
                for (var index = 1; index <= 24; index++) {
                    var selectedBtn = $("#Square" + (index));
                    if (!selectedBtn.html())
                        continue;
                    var entry = getEntryFromText(selectedBtn.html());
                    if (!entry) {
                        console.log("Bad Square at index " + index);
                        continue;
                    }
                    selectedBtn.removeClass("bg-info");
                    if (entry["isChecked"])
                        selectedBtn.addClass("text-light bg-success")
                    else
                        selectedBtn.removeClass("text-light bg-success bg-info");
                }
                $("#Square30").removeClass("bg-info");
                updateCode(evt);
                checkBingo();
                setDisableControls(false);
            },
            error: function(result) {
                console.log("Couldn't retireve Entries.");
            }
        });
    }

    function parseCode(evt, codeStr) {
        for (var index = 0; index < 24; index++) {
            var currCode = codeStr.slice(0 + (4 * index), 4 + (4 * index));
            var hexCode = parseInt(currCode.substring(0, 4), 16);
            var entry = getEntry(hexCode);
            var btn = $("#Square" + (index + 1));
            btn.html(entry["content"]);
        }
        updateBoard(evt);
    }

    function loadBoard(evt) {
        var code = $("#code").val().trim();
        if (code.length == 24 * 4) {
            hasBingo = false;
            parseCode(evt, code);
        }
    }

    $("#enterCodeBtn").click(loadBoard);
    $("#updateBtn").click(updateBoard);
});