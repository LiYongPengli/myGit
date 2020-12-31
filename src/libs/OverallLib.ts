//格式化时间
export const init_time = function(el:HTMLElement){
    let date = new Date(el.innerHTML);
    el.innerHTML = date.getFullYear()+'-'+
                   (date.getMonth()+1<=9?'0'+(date.getMonth()+1):date.getMonth()+1)+'-'+
                   ((date.getDate()<=9)?'0'+date.getDate():date.getDate())+' '+
                   ((date.getHours()<=9)?'0'+date.getHours():date.getHours())+':'+
                   ((date.getMinutes()<=9)?'0'+date.getMinutes():date.getMinutes())+':'+
                   ((date.getSeconds()<=9)?'0'+date.getSeconds():date.getSeconds())
                   
}