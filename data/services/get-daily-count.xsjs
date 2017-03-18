// Allowed URL parameters
const allowedParameters = [
    "startDate",
    "endDate"
];

// Build a map of the allowed URL parameters
var oParameters = {};
allowedParameters.forEach(function(sParamName) {
    oParameters[sParamName] = null;
});

// Get url parameters 
for(let i = 0; i < allowedParameters.length; i++) {
    
    let sParamName = allowedParameters[i];
    let sParamValue = $.request.parameters.get(sParamName);
    
    if(sParamValue) {
        oParameters[sParamName] = sParamValue;
    }
    
}


/* 
 * Get the SELECT statement to use to query the database
 * Parameters: none
 * Returns: SQL SELECT statement (string)
*/
function getSelectStatement() {
    
    let sStatement = "SELECT \"YEAR\", \"MONTH\", \"DAY\", \"COUNT\" FROM \"EQ_FORECAST\".\"earthquake-forecaster.data.tables::daily-count\"";
    
    let aConditionStrings = [];
    
    // Consider start date parameter
    if(oParameters.startDate) {
        
        // Date is in YYYY-MM-DD format
        let aStartDateComponents = oParameters.startDate.split("-");
        
        let startYear = aStartDateComponents[0];
        let startMonth = aStartDateComponents[1];
        let startDay = aStartDateComponents[2];
        
        let sStartCondition = "\"DAY\" >= " + startDay + " AND \"MONTH\" >= " + startMonth + " AND \"YEAR\" >= " + startYear;
        aConditionStrings.push(sStartCondition);
        
    }
    
    // Consider end date parameter
    if(oParameters.endDate) {
        
        // Date is in YYYY-MM-DD format
        let aEndDateComponents = oParameters.endDate.split("-");
        
        let endYear = aEndDateComponents[0];
        let endMonth = aEndDateComponents[1];
        let endDay = aEndDateComponents[2];
        
        let sEndCondition = "\"DAY\" <= " + endDay + " AND \"MONTH\" <= " + endMonth + " AND \"YEAR\" <= " + endYear;
        aConditionStrings.push(sEndCondition);
        
    }
    
    // Concatenate condition strings
    if(aConditionStrings.length > 0) {
        
        sStatement += (" WHERE " + aConditionStrings[0]);
        
        for(let i = 1; i < aConditionStrings.length; i++) {
            sStatement += (" AND " + aConditionStrings[i]);
        }
        
    }
    
    sStatement += ";";
    
    return sStatement;
}

/*
 * Get the required data given the parameters
 * Parameters: none
 * Returns: An array of data to send back to the client
*/
function getDailyCount() {
    
    let aData = [];
    
    // Build the SELECT statement to get data from the database
    let sSelectStatement = getSelectStatement();
    
    // Open a connection to the database
    let conn = $.hdb.getConnection();
    
    // Query for data
    let res = conn.executeQuery(sSelectStatement);
    
    // Build result array to send back
    for(let i = 0; i < res.length; i++) {
        aData.push({
            'DAY': res[i].DAY,
            'MONTH':res[i].MONTH,
            'YEAR': res[i].YEAR,
            'COUNT': res[i].COUNT
        });
    }
    
    // Return the data
    return aData;
    
}

try {
    
    let aCountData = getDailyCount();
    // let aCountData = getSelectStatement();
    
    $.response.setBody(JSON.stringify(aCountData));
    $.response.status = $.net.http.OK;
    $.response.contentType = "application/json";
    
} catch(e) {
    
    $.response.setBody(e.toString());
    $.response.status = $.net.http.INTERNAL_SERVER_ERROR;

}