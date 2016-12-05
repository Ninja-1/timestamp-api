var express = require('express');

var app = express();

app.get('/:time', function(req, res) {
  var time = req.params.time;
  var date;
  if (Number.isInteger(Number(time))) {
    date = new Date(time * 1000);
  } else {
    date = new Date(decodeURIComponent(time));
  }
  if (!isNaN(date.valueOf())) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var timeMs = (date.valueOf() / 1000);
    var timeYear = date.getUTCFullYear();
    var timeMonth = monthNames[date.getUTCMonth()];
    var timeDate = date.getUTCDate();

    res.status(200).send({
      "unix": timeMs,
      "natural": timeMonth + " " + timeDate + ", " + timeYear
    });
  } else {
    res.status(422).send({
      "unix": null,
      "natural": null
    });
  }
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  // running
});
