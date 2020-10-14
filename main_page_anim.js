var flag = false;
var circle = document.getElementById('fp_circle');
circle.onmouseenter = function(){
    if(!flag){
        circle.classList.add('circle_anim');
        for(var i=0;i<3;i++){
            document.getElementsByClassName('fp_titles').item(i).classList.add('fp_titles_appear_delay');
        }
        flag = true;
    }
}
var proj_map = document.getElementById('proj_map'),
    proj_list = document.getElementById('proj_list'),
    account = document.getElementById('account');
proj_map.onmouseenter = function(){
    proj_map.children.item(0).classList.remove('fp_titles_appear_delay');
    if(flag){
        proj_map.children.item(0).classList.remove('fp_titles_appear');
        proj_map.children.item(1).classList.add('fp_intro_appear');
    }
}
proj_map.onmouseleave = function(){
    if(flag){
        proj_map.children.item(1).classList.remove('fp_intro_appear');
        proj_map.children.item(0).classList.add('fp_titles_appear');
    }
}
proj_map.onclick = function(){
    open("travel_projects_map.html");
}

proj_list.onmouseenter = function(){
    proj_list.children.item(0).classList.remove('fp_titles_appear_delay');
    if(flag){
        proj_list.children.item(0).classList.remove('fp_titles_appear');
        proj_list.children.item(1).classList.add('fp_intro_appear');
    }
}
proj_list.onmouseleave = function(){
    if(flag){
        proj_list.children.item(1).classList.remove('fp_intro_appear');
        proj_list.children.item(0).classList.add('fp_titles_appear');
    }
}
proj_list.onclick = function(){
    open("travel_projects_list.html");
}

account.onmouseenter = function(){
    account.children.item(0).classList.remove('fp_titles_appear_delay');
    if(flag){
        account.children.item(0).classList.remove('fp_titles_appear');
        account.children.item(1).classList.add('fp_intro_appear');
    }
}
account.onmouseleave = function(){
    if(flag){
        account.children.item(1).classList.remove('fp_intro_appear');
        account.children.item(0).classList.add('fp_titles_appear');
    }
}
account.onclick = function(){
    open("account.html");
}