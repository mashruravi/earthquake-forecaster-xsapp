let conn = $.hdb.getConnection();

let sql = "SELECT TOP 100000 \"LONG\", \"LAT\", \"MAGNITUDE\" FROM \"EQ_FORECAST\".\"DETAILS\" ORDER BY \"MAGNITUDE\" DESC";

let res = conn.executeQuery(sql);

var aData = [];

// let responseString = "";

for(let i = 0; i < res.length; i++) {
    aData.push({
        lat: res[i].LAT,
        lng: res[i].LONG,
        mag: res[i].MAGNITUDE
    });
    // responseString += (res[i].YEAR + ', ' + res[i].MONTH + ', ' + res[i].DAY + ', ' + res[i].LAT + ', ' + res[i].LONG + ', ' + res[i].MAGNITUDE + "\n" );
}

$.response.setBody(JSON.stringify(aData));
// $.response.setBody(responseString);
