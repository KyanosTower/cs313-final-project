function search(){
    var searchString = $('txtSearch').val();
    console.log('Searching for: ' + searchString);

    connection.connect(function(err) {
            var sql = "SELECT cardName, seriesName, rarity, evolve FROM card WHERE name = ?";
            connection.query(sql, [searchString], function(err, result) {
                if (result.Search && result.Search.length > 0){
                    var resultList = $('#ulResults');
                    resultList.empty();
                }
            });
    });
}