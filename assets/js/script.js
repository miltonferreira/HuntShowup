
// let z = getComputedStyle(document.querySelector('.wrap a'), ':before');

var graphElem = document.querySelectorAll('.wrap a');

for(let q of graphElem){

    q.addEventListener('mouseover', function (event) {
        q.setAttribute('class', 'show');
    });
    
    q.addEventListener('mouseleave', function (event) {
        q.setAttribute('class', 'hide');
    });

}



//console.log(getComputedStyle(document.querySelector('.wrap a'), ':before').getPropertyValue('z-index'));
