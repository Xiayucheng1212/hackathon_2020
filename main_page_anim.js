var circle = document.getElementById('fp_circle');
circle.onmouseenter = function(){
    circle.classList.add('circle_anim');
    for(var i=0;i<3;i++){
        document.getElementsByClassName('fp_titles').item(i).classList.add('fp_titles_anim');
    }
}