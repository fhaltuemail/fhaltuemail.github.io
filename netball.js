// Function to add a player to the player list
function addPlayer() {
	var playerName = document.getElementById("playerName").value;
	if (playerName !== "") {
		players.push(playerName);
		document.getElementById("playerName").value = "";
		updatePlayerTable();
	}
}

// Function to assign positions to the players
function assignPositions() {
    // Shuffle the array of positions
    shuffleArray(positions);

    // Assign positions to each player
    for (var i = 0; i < players.length; i++) {
        // If there are still positions available, assign one to the player
        if (i < positions.length) {
            document.querySelector("#playerTable tbody tr:nth-child(" + (i+1) + ") td:nth-child(2)").textContent = positions[i];
        }
        // Otherwise, if the player hasn't already been assigned a position, assign the "Extra" position to the player
        else if (document.querySelector("#playerTable tbody tr:nth-child(" + (i+1) + ") td:nth-child(2)").textContent === "") {
            document.querySelector("#playerTable tbody tr:nth-child(" + (i+1) + ") td:nth-child(2)").textContent = "Extra";
        }
    }

    // Shuffle the positions array again, so that the "Extra" position is also randomized
    shuffleArray(positions);
}


// Function to randomize the positions assigned to the players
function randomizePositions() {
	// Reset the position data for each player
	var playerTableRows = document.querySelectorAll("#playerTable tbody tr");
	for (var i = 0; i < playerTableRows.length; i++) {
		playerTableRows[i].querySelector("td:nth-child(2)").textContent = "";
	}

	// Shuffle the player list
	shuffleArray(players);

	// Re-assign positions to the players
	assignPositions();
}

// Function to update the player table display
function updatePlayerTable2() {
	var playerTableBody = document.getElementById("playerTable").querySelector("tbody");
	playerTableBody.innerHTML = "";
	for (var i = 0; i < players.length; i++) {
		var tr = document.createElement("tr");
		var nameTd = document.createElement("td");
		nameTd.textContent = players[i];
		var positionTd = document.createElement("td");
		tr.appendChild(nameTd);
		tr.appendChild(positionTd);
		playerTableBody.appendChild(tr);
	}
}
function updatePlayerTable() {
    // Sort the players array by name
    players.sort(function(a, b) {
        return a.localeCompare(b);
    });

    // Clear the table
    var tableBody = document.querySelector("#playerTable tbody");
    tableBody.innerHTML = "";

    // Add each player to the table
    for (var i = 0; i < players.length; i++) {
        var row = document.createElement("tr");

        var nameCell = document.createElement("td");
        nameCell.textContent = players[i];
        row.appendChild(nameCell);

        var positionCell = document.createElement("td");
        row.appendChild(positionCell);

        tableBody.appendChild(row);
    }
}

// Function to shuffle an array
function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

function sendEmail2() {
  // Get the list of players
  let playerList = document.getElementById("playerTable");

  // Generate the email body with the player list
  let emailBody = "Here is the list of players:\n\n";
  for (let i = 1; i < playerList.rows.length; i++) {
    let playerName = playerList.rows[i].cells[0].innerHTML;
    let position = playerList.rows[i].cells[1].innerHTML;
    emailBody += playerName + ": " + position + "\n";
  }

  // Open the email client with the email body in the body of the email
  let subject = "Netball Player List";
  window.location.href = "mailto:?subject=" + subject + "&body=" + encodeURIComponent(emailBody);
  //window.location.href = mailtoLink;
  
}

function sendEmail() {
  // Get the list of players
  let playerList = document.getElementById("playerTable");

  // Generate the email body with the player list
  let emailBody = "<div style='font-size: 14px; font-family: Arial, sans-serif;'>Here is the list of players:</div><br/>";
  for (let i = 1; i < playerList.rows.length; i++) {
    let playerName = playerList.rows[i].cells[0].innerHTML;
    let position = playerList.rows[i].cells[1].innerHTML;
    emailBody += "<div style='font-size: 12px; font-family: Arial, sans-serif;'><span style='font-weight: bold;'>" + playerName + ":</span> " + position + "</div>";
  }

  // Create the email link with the email body in the body of the email
  let subject = "Netball Player List";
  let mailtoLink = "mailto:?subject=" + subject + "&body=" + encodeURIComponent(emailBody);
  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", mailtoLink);
  linkElement.innerHTML = "Click here to open your email client and send the player list";
  document.body.appendChild(linkElement);
}
