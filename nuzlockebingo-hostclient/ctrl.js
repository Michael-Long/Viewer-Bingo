$(document).ready(function() {

    function clearEntries(evt) {
        var data = {};
        data["state"] = $(this).prop('checked') ? 1 : 0;
        $.ajax({
            url: "./index.php",
            type: "post",
            datatype: "JSON",
            data: data,
            success: function(result) {
                console.log(result);
            },
            error: function(result) {
                console.log("Couldn't retireve Entries, contact Fireworks.");
            }
        });
        var length = window.normalEntries.length + window.randomEntries.length;
        for (var index = 0; index < length; index++) {
            $("#" + index).prop("checked", false);
        }
    }

    function generateCode(evt) {
        var code = "";
        var pickedEntries = [];
        var length = window.normalEntries.length + window.randomEntries.length;
        for (var index = 0; index < 24; index++) {
            var random = Math.floor(Math.random() * length);
            while(pickedEntries.includes(random)) {
                random = Math.floor(Math.random() * length);
            }
            var hexCode = random.toString(16);
            while (hexCode.length < 4) {
                hexCode = "0" + hexCode;
            }
            code = code.concat(hexCode);
            pickedEntries.push(random);
        }
        $("#codeDisplay").html(code);
    }

    function toggleEntryState(evt) {
        var data = {};
        data["id"] = $(this).attr('data-entry');
        data["state"] = $(this).prop('checked') ? 1 : 0;
        $.ajax({
            url: "./index.php",
            type: "post",
            datatype: "JSON",
            data: data,
            success: function(result) {
                console.log(result);
            },
            error: function(result) {
                console.log("Couldn't retireve Entries, contact Fireworks.");
            }
        });
    }

    function toggleAllowRandomized(evt) {
        var data = {};
        data["setRandomized"] = $(this).prop('checked') ? 1 : 0;
        $.ajax({
            url: "./index.php",
            type: "post",
            datatype: "JSON",
            data: data,
            success: function(result) {
                console.log(result);
            },
            error: function(result) {
                console.log("Couldn't retireve Entries, contact Fireworks.");
            }
        });
    }

    $("#includeRanomizedCheck").click(toggleAllowRandomized);
    $("#resetBtn").click(clearEntries);
    $("#genCodeBtn").click(generateCode);

    var entryData = {};
    entryData["entries"] = true;
    $.ajax({
        url: "./index.php",
        type: "get",
        datatype: "JSON",
        data: entryData,
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
            console.log("Got entry JSON!");

            for (var row = 0; row < json.length / 5; row++) {
                $("#entryTable").append("<tr id=\"row" + row + "\"></tr>");
                for (var data = 0; data < 5; data++) {
                    var entry = row * 5 + data;
                    if (entry < json.length) {
                        $("#row" + row).append("<td><input type=\"checkbox\" class=\"form-check-input\" id=\"" + entry + "\"><label>" + json[entry]["content"] + "</label></td>")
                        $("#" + entry).attr('data-entry', json[entry]["id"]);
                        $("#" + entry).prop('checked', json[entry]["isChecked"]);
                        $("#" + entry).click(toggleEntryState);
                    }
                }
            }
        },
        error: function(result) {
            console.log("Couldn't retireve Entries, contact Fireworks.");
        }
    });

    var flagData = {};
    flagData["flags"] = true;
    $.ajax({
        url: "./index.php",
        type: "get",
        datatype: "JSON",
        data: flagData,
        success: function(result) {
            var json = JSON.parse(result);
            console.log("Got Rando JSON!")
            $("#includeRanomizedCheck").prop('checked', json[0]["value"]);
        },
        error: function(result) {
            console.log("Couldn't retireve Flags, contact Fireworks.");
        }
    });
});