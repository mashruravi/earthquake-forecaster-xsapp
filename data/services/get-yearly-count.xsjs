try {

	let aData = [];
	let aNewData = [];

    let sStatement = "SELECT \"YEAR\", SUM(\"COUNT\") AS \"YEAR_TOTAL\" FROM \"EQ_FORECAST\".\"earthquake-forecaster.data.tables::daily-count\" GROUP BY \"YEAR\";";

    let sNewStatement = "SELECT \"YEAR\", COUNT(*) AS \"NEW_YEAR_TOTAL\" FROM \"EQ_FORECAST\".\"DETAILS\" GROUP BY \"YEAR\";";

    let conn = $.hdb.getConnection();
    
    let res = conn.executeQuery(sStatement);
    
    for(let i = 0; i < res.length; i++) {
        aData.push({
            'YEAR': res[i].YEAR,
            'COUNT': res[i].YEAR_TOTAL
        });
    }
    
    res = conn.executeQuery(sNewStatement);
    
    for(let i = 0; i < res.length; i++) {
        aNewData.push({
            'YEAR': res[i].YEAR,
            'COUNT': parseInt(res[i].NEW_YEAR_TOTAL, 10)
        });
    }

	$.response.setBody(JSON.stringify({
	    oldData: aData,
	    newData: aNewData
	}));
	$.response.status = $.net.http.OK;
	$.response.contentType = "application/json";

} catch (e) {

	$.response.setBody(e.toString());
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;

}