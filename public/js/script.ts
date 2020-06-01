function typingEvent(event):void {
    if (event.keyCode === 13) {
        searchCharacters();
    }

    if (event.keyCode === 32) {
    }
}


function searchCharacters():string {
    // send api request to backend
    return generateResults();
}


function generateResults():string {
    let html: string = '';
    console.log(10)
    for (let i: number = 0; i<10; i++) {
        html += '<p>character ' + i + '</p>';
    }
    console.log(html)
    return html;
}
