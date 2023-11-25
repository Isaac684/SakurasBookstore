const find = document.querySelector('[Search]');



find.addEventListener('click', function(){

    const elements = document.getElementsByName('books');
    elements.forEach(element => {
        console.log(element.children[0].children[1].children[1].children[2].textContent);
    });
});