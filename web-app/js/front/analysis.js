function renderAnalyzers(DATASET){
    var teams = DATASET.teams();
    $("#analyze-manual")[0].innerHTML = "";
    for(var i = 0; i < teams.length; i++){
        $("#analyze-manual")[0].innerHTML += `
            <div class="analyzer-team"><p>${teams[i]}<p></div>
        `;
    }

    const container = document.getElementById('analyze-manual');
    const items = container.querySelectorAll('.analyzer-team');
    let draggingItem = null;

    items.forEach((item)=> {
        item.addEventListener('mousedown', (e) => {
            draggingItem = item;
            container.insertBefore(document.createElement('div'), item);
            item.classList.add('dragging');
            console.log(draggingItem);
        });
    });

    document.addEventListener('mouseup', (e) => {
        console.log(draggingItem !== null);
        if (draggingItem !== null) {
            var closestItem = e.target.closest('.analyzer-team');
            console.log(closestItem)
            if (closestItem !== null) {
                container.insertBefore(draggingItem, closestItem.nextSibling);
            }
            draggingItem = null;
        }
        item.classList.remove('dragging');
    });
}