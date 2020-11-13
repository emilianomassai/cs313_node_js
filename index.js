const express = require("express");
const app = express();

// the following is the correct way to assign a port in a
// node application. You should first try to read the value of
// environment variable called PORT.
const port = process.env.PORT || 5000;
var params = { type_of_mail: "", weight: "", result: "" };

// tell it to use the public directory as one where static files live
// app.use(express.static(__dirname + "/public"));
app.use(express.static("public"));

// views is directory for all template files
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// set up a rule that says requests to "/math" should be handled by the
// postalRateCalculation function below
app.get("/getRate", postalRateCalculation);

app.get("/zoneNum", zoneNum);

// start the server listening
app.listen(port, function () {
  console.log("Node app is running on port", port);
});

/**********************************************************************
 * Ideally the functions below here would go into a different file
 * but for ease of reading this example and seeing all of the pieces
 * they are listed here.
 **********************************************************************/

function postalRateCalculation(request, response) {
  const type_of_mail = request.query.type_of_mail;
  const weight = Number(request.query.weight);

  // TODO: Here we should check to make sure we have all the correct parameters

  calculateRate(response, type_of_mail, weight);
}

function calculateRate(response, op, left) {
  op = op.toLowerCase();
  let result = "";

  if (op == "letters (stamped)") {
    switch (true) {
      case left <= 1:
        result = "$0.55";
        break;
      case left <= 2:
        result = "$0.70";
        break;
      case left <= 3:
        result = "$0.85";
        break;
      case left <= 3.5:
        result = "$1.00";
        break;
      default:
        result =
          "Your package exceed the maximum weight for this service. Try with another type of mail.";
    }
  } else if (op == "letters (metered)") {
    switch (true) {
      case left <= 1:
        result = "$0.50";
        break;
      case left <= 2:
        result = "$0.65";
        break;
      case left <= 3:
        result = "$0.80";
        break;
      case left <= 3.5:
        result = "$0.95";
        break;
      default:
        result =
          "Your package exceed the maximum weight for this service. Try with another type of mail.";
    }
  } else if (op == "large envelopes (flats)") {
    switch (true) {
      case left <= 1:
        result = "$1.00";
        break;
      case left <= 2:
        result = "$1.20";
        break;
      case left <= 3:
        result = "$1.40";
        break;
      case left <= 4:
        result = "$1.60";
        break;
      case left <= 5:
        result = "$1.80";
        break;
      case left <= 6:
        result = "$2.00";
        break;
      case left <= 7:
        result = "$2.20";
        break;
      case left <= 8:
        result = "$2.40";
        break;
      case left <= 9:
        result = "$2.60";
        break;
      case left <= 10:
        result = "$2.80";
        break;
      case left <= 11:
        result = "$3.00";
        break;
      case left <= 12:
        result = "$3.20";
        break;
      case left <= 13:
        result = "$3.40";
        break;
      default:
        result =
          "Your package exceed the maximum weight for this service. Try with another type of mail.";
    }
  } else {
    // It would be best here to redirect to an "unknown operation"
    // error page or something similar.
  }

  // Set up a JSON object of the values we want to pass along to the EJS result page
  // const params = { type_of_mail: op, weight: left, result: result };
  params = { type_of_mail: op, weight: left, result: result };
  // Render the response, using the EJS page "result.ejs" in the pages directory
  // Makes sure to pass it the parameters we need.
  if (
    op == "letters (stamped)" ||
    op == "letters (metered)" ||
    op == "large envelopes (flats)"
  ) {
    response.render("pages/result", params);
  } else if (op == "first-class package service—retail") {
    response.render("pages/service-retail", params);
  }
}

function zoneNum(request, response) {
  // const type_of_mail = request.query.type_of_mail;
  // const weight = Number(request.query.weight);
  const zone = Number(request.query.zone);
  // const zone_typeOfMail = params.type_of_mail;
  const zone_weight = Number(params.weight);

  computeZonePrice(response, zone_weight, zone);

  // console.log(
  //   "type_of_mail: " +
  //     zone_typeOfMail +
  //     " weight: " +
  //     zone_weight +
  //     " zone: " +
  //     zone
  // );
}

function computeZonePrice(response, weight, zone) {
  let zoneResult = "";
  switch (zone) {
    case 1:
    case 2:
      if (weight <= 4) {
        zoneResult = weight * 3.8;
      } else if (weight <= 8 && weight > 4) {
        zoneResult = weight * 4.6;
      } else if (weight <= 12 && weight > 8) {
        zoneResult = weight * 5.3;
      } else if (weight <= 13 && weight > 12) {
        zoneResult = weight * 5.9;
      } else {
        zoneResult =
          "Your package exceed the maximum weight for this service. Try with another type of mail.";
      }
      break;

    case 3:
      if (weight <= 4) {
        zoneResult = weight * 3.85;
      } else if (weight <= 8 && weight > 4) {
        zoneResult = weight * 4.65;
      } else if (weight <= 12 && weight > 8) {
        zoneResult = weight * 5.35;
      } else if (weight <= 13 && weight > 12) {
        zoneResult = weight * 5.95;
      } else {
        zoneResult =
          "Your package exceed the maximum weight for this service. Try with another type of mail.";
      }
      break;
    case 4:
      if (weight <= 4) {
        zoneResult = weight * 3.9;
      } else if (weight <= 8 && weight > 4) {
        zoneResult = weight * 4.7;
      } else if (weight <= 12 && weight > 8) {
        zoneResult = weight * 5.4;
      } else if (weight <= 13 && weight > 12) {
        zoneResult = weight * 6.05;
      } else {
        zoneResult =
          "Your package exceed the maximum weight for this service. Try with another type of mail.";
      }
      break;

    case 5:
      if (weight <= 4) {
        zoneResult = weight * 3.95;
      } else if (weight <= 8 && weight > 4) {
        zoneResult = weight * 4.75;
      } else if (weight <= 12 && weight > 8) {
        zoneResult = weight * 5.45;
      } else if (weight <= 13 && weight > 12) {
        zoneResult = weight * 6.15;
      } else {
        zoneResult =
          "Your package exceed the maximum weight for this service. Try with another type of mail.";
      }
      break;

    case 6:
      if (weight <= 4) {
        zoneResult = weight * 4.0;
      } else if (weight <= 8 && weight > 4) {
        zoneResult = weight * 4.8;
      } else if (weight <= 12 && weight > 8) {
        zoneResult = weight * 5.5;
      } else if (weight <= 13 && weight > 12) {
        zoneResult = weight * 6.2;
      } else {
        zoneResult =
          "Your package exceed the maximum weight for this service. Try with another type of mail.";
      }
      break;

    case 7:
      if (weight <= 4) {
        zoneResult = weight * 4.05;
      } else if (weight <= 8 && weight > 4) {
        zoneResult = weight * 4.9;
      } else if (weight <= 12 && weight > 8) {
        zoneResult = weight * 5.65;
      } else if (weight <= 13 && weight > 12) {
        zoneResult = weight * 6.4;
      } else {
        zoneResult =
          "Your package exceed the maximum weight for this service. Try with another type of mail.";
      }
      break;

    case 8:
    case 9:
      if (weight <= 4) {
        zoneResult = weight * 4.2;
      } else if (weight <= 8 && weight > 4) {
        zoneResult = weight * 5.0;
      } else if (weight <= 12 && weight > 8) {
        zoneResult = weight * 5.75;
      } else if (weight <= 13 && weight > 12) {
        zoneResult = weight * 6.5;
      } else {
        zoneResult =
          "Your package exceed the maximum weight for this service. Try with another type of mail.";
      }
      break;

    default:
      zoneResult =
        "Your package exceed the maximum weight for this service. Try with another type of mail.";
  }
  if (
    zoneResult !=
    "Your package exceed the maximum weight for this service. Try with another type of mail."
  ) {
    let result = "$" + zoneResult.toFixed(2);
    params = { weight: weight, zone: zone, zoneResult: result };
  } else {
    params = { weight: weight, zone: zone, zoneResult: zoneResult };
  }
  response.render("pages/retail-result", params);
}
