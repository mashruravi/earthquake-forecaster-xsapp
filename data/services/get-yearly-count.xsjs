try {

	let aData = [];

    let sStatement = "SELECT \"YEAR\", SUM(\"COUNT\") AS \"YEAR_TOTAL\" FROM \"EQ_FORECAST\".\"earthquake-forecaster.data.tables::daily-count\" GROUP BY \"YEAR\";";

    let conn = $.hdb.getConnection();
    
    let res = conn.executeQuery(sStatement);
    
    for(let i = 0; i < res.length; i++) {
        aData.push({
            'YEAR': res[i].YEAR,
            'COUNT': res[i].YEAR_TOTAL
        });
    }

	$.response.setBody(JSON.stringify(aData));
	$.response.status = $.net.http.OK;
	$.response.contentType = "application/json";

} catch (e) {

	$.response.setBody(e.toString());
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;

}