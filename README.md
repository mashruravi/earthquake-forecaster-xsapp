# Local Development

Prerequisite: You need to have Node installed (v6.x.x recommended)

Install the dependencies required by running
```
$ npm install
```

Start the local server by running
```
$ npm start
```


# Services

## get-daily-count
Get the count of earthquakes by day.

### Return format:
```
[
    {DAY: '1', MONTH: '1', YEAR: '2016', COUNT: 146},
    ...
]
```

### Optional parameters:
#### startDate:
Get a daily count of earthquakes after the specified date. The date should be in the format YYYY-MM-DD

Usage:
```
/get-daily-count.xsjs?startDate=2015-3-14
```

#### endDate:
Get a daily count of earthquakes up to the specified date. The date should be in the format YYYY-MM-DD

Usage:
```
/get-daily-count.xsjs?endDate=2016-12-31
```

The startDate and endDate parameters can be used together as follows:
```
/get-daily-count.xsjs?startDate=2015-12-1&endDate=2015-12-31
```

# Tables

## daily-count
Stores a count of earthquakes that occured.
### Fields:
- YEAR
- MONTH
- DAY
- COUNT
