let nelat = $.request.parameters.get("nelat");
let nelng = $.request.parameters.get("nelng");
let swlat = $.request.parameters.get("swlat");
let swlng = $.request.parameters.get("swlng");

let conn = $.hdb.getConnection();

let sql = "SELECT TOP 100000 \"LONG\", \"LAT\", \"MAGNITUDE\" FROM \"EQ_FORECAST\".\"DETAILS\"";

if (nelat && nelng && swlat && swlng) {
    sql += (" WHERE \"LAT\" > '" + swlat + "' AND \"LAT\" < '" + nelat +
            "' AND \"LONG\" > '" + swlng + "' AND \"LONG\" < '" + nelng + "'"); 
}

sql += "ORDER BY \"MAGNITUDE\" DESC";

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
