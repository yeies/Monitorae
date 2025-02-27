function filterItems() {
    let input = document.getElementById("search-bar").value.toLowerCase();
    let items = document.querySelectorAll("#item-list .item");
    let visibleCount = 0;

    items.forEach(item => {
        let text = item.textContent.toLowerCase();

        if (input && text.includes(input) && visibleCount >= 0) {
            item.style.display = "block"; // Primeiro, exibe o item
            setTimeout(() => item.classList.add("show"), 0);
            visibleCount++;
        } else {
            item.classList.remove("show");
            setTimeout(() => item.style.display = "none", 0);
        }
    });
}
