function getTeamScore(team, matchkey) {
    const username = 'justin';
    const password = 'e0d8c48d-0bc4-42e0-8336-15b52f7416f4';
    const auth = btoa(`${username}:${password}`);

    const options = {
        url: 'https://example.com/api/endpoint',
        method: 'GET',
        headers: {
            'Authorization': `Basic ${auth}`
        },
        data: {
            team: team,
            matchkey: matchkey
        }
    };

    $.ajax(options)
        .done(function(response) {
            console.log(response);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error(`Request failed: ${textStatus}, ${errorThrown}`);
        });
}