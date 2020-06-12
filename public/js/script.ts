function typingEvent(event): void {
    if (event.keyCode === 13) {
        searchCharacters();
    }
}


function searchCharacters(): void {
    let searchInput: HTMLInputElement = (<HTMLInputElement>(document.getElementById('search-input')));
    searchInput.placeholder = searchInput.value;
    let tags: Array<string> = searchInput.value.split(' ');
    searchInput.value = "";
    // send api request to backend
    // fetch data from backend from fulltext search query

    // for each of the results
    // create object
    generateResult(testParameters);

}


let testParameters: Array<object> = [{
    'name': "Thor",
    'genre': "Series",
    'title': "Thor (Marvel)",
    'gender': "Male"
}, {
    'image': "https://i.pinimg.com/originals/1e/e6/eb/1ee6eb21f89e36307bfc293f8b73b972.jpg",
    'name': "Mirio",
    'genre': "Anime ",
    'title': "My Hero Academia",
    'eyecolor': 'blue',
    'haircolor': 'blonde',
    'height': 'tall',
    'age': '18',
    'tags': ['hero', 'optimistic', 'funny', 'meelee']
}];


let entryHTML = function (param: object): string {
    return '<tr>' +
        '<th><a href="' + param['image'] + '"><img class="table-image" src="' + param['image'] + '" alt="' + param['name'] + '"></a></th>' +
        '<td>' + param['name'] + '</td>' +
        '<td>' + param['genre'] + '</td>' +
        '<td>' + param['title'] + '</td>' +
        '<td>' + param['gender'] + '</td>' +
        '<td>' + param['eyecolor'] + '</td>' +
        '<td>' + param['haircolor'] + '</td>' +
        '<td>' + param['height'] + '</td>' +
        '<td>' + param['age'] + '</td>' +
        '<td>' + param['tags'] + '</td>' +
        '</tr>';
}

function generateResult(parameters: Array<object>): void {
    document.getElementById('table-header').style.visibility = "visible";
    let tbody: any = document.getElementById('table-body');
    for (let i = 0; i < parameters.length; i++) {
        tbody.innerHTML += entryHTML(parameters[i]);
    }
}
