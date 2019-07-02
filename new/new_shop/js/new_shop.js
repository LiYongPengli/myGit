/* 
接口地址：http://m.nst1688.com/mobile/index.php?m=console&c=view&a=start_business
传值方式：post
参数：  page:1
	sort:desc
	type:distance
	lng:1.1111
	lat:5.1111
page：页数
sort：排序（asc，desc）（正序，倒叙）
type：排序方式（time,distance）（时间，距离）
lnt：经度
lat：纬度

*/






var URL = "http://m.nst1688.com/mobile/index.php?m=console&c=view&a=start_business"

var data = {
    lng:'',
    lat:'',
    sortTime:0,
    sortLocagion:0,
    page:1,
    type:'desc',
    sort:'distance',
    totalPage:'',
    right:false,//是否正序
    data:[],
}


// $(document).ready(function(){
    //geolocation()
// })

// function geolocation(){
//     var geolocation = new BMap.Geolocation();
// 	geolocation.getCurrentPosition(function(r){
// 		if(this.getStatus() == BMAP_STATUS_SUCCESS){
//             data.lng = r.point.lng
//             data.lat = r.point.lat
//             getData("desc","distance")
// 			//alert('您的位置：'+r.point.lng+','+r.point.lat);
// 		}
// 		else {
//             alert("定位失败");
//             data.lng = 0
//             data.lat = 0
//             getData("desc","distance")
//         }
//     });
// }

function getData(st,tp){
    let obj = {
        page:data.page,
        sort:st,
	    type:tp,
	    lng:data.lng,
	    lat:data.lat
    }
    $.post(URL,obj,res=>{
        console.log(JSON.parse(res))
        if(data.page == 1){
            data.data = JSON.parse(res).list
        }else{
            data.data = data.data.concat(JSON.parse(res).list)
        }
        data.page = JSON.parse(res).page-0;
        data.totalPage = JSON.parse(res).totalPage-0;
        showPage(data.data)
    })
}

function showPage(arr){
    var str = "";
    var str_time = "";
    for(let i=0;i<arr.length;i++){
        if(arr[i].start_status >= 0){
            str_time = '倒计时';
        }else if(arr[i].start_status < 0){
            str_time = '已开业';
        }
        str += `
            <div class="text">
                <div class="text_top">
                    <div class="left">
                        <p>${arr[i].shop_name}</p>
                        <p>
                            <img src="./img/num8.png" />
                            开业时间: ${arr[i].start_time}
                        </p>
                        <p>
                            <img src="./img/num7.png" />
                            ${arr[i].address}
                        </p>
                    </div>
                    <div class="right">
                        <p>`+str_time+`</p>
                        <p><span>${arr[i].surplus_day}</span>天</p>
                        <p>距您: ${arr[i].distance}Km</p>
                    </div>
                </div>
                <div class="footer">
                    <div class="footer_wrap"></div>
                </div>
            </div>
        `
    }
    $(".center").html(str);
    for(let j=0;j<arr.length;j++){
        showPageFoot(arr[j].img,j)
    }
}

function sortFromTime(){
    data.sort = "time";
    if(data.sortTime == 0){
        $(".header-next .right div").css("display","none");
        data.sortTime = 1;
        data.type = "asc"
        data.right = true;
        $(".header-next .left div").eq(1).css("display","none");
        $(".header-next .left div").eq(0).css("display","block");
    }else{
        if(data.right){
            data.type = "desc";
            data.right = false
            $(".header-next .left div").eq(0).css("display","none");
            $(".header-next .left div").eq(1).css("display","block");
        }else{
            data.type = "asc";
            data.right = true;
            $(".header-next .left div").eq(1).css("display","none");
            $(".header-next .left div").eq(0).css("display","block");
        }
    }
    data.page = 1;
    getData(data.type,data.sort)
    
}
function sortFromLocation(){
    data.sort = "distance";
    if(data.sortTime == 1){
        data.sortTime = 0;
        $(".header-next .left div").css("display","none");
        data.type = "asc"
        data.right = true;
        $(".header-next .right div").eq(0).css("display","block");
        $(".header-next .right div").eq(1).css("display","none");
    }else{
        if(data.right){
            data.type = "desc";
            data.right = false
            $(".header-next .right div").eq(0).css("display","none");
            $(".header-next .right div").eq(1).css("display","block");
        }else{
            data.type = "asc";
            data.right = true;
            $(".header-next .right div").eq(0).css("display","block");
            $(".header-next .right div").eq(1).css("display","none");
        }
    }
    getData(data.type,data.sort)
}

function showPageFoot(arr,index){
    for(let i=0;i<arr.length;i++){
        var str = "<img src='"+arr[i].img_url+"' />"
        //var str = "<img src='./img/"+parseInt(Math.random()*3+1)+".png' />"
        $(".center .text:nth-of-type("+(index+1)+") .footer .footer_wrap").append($("<div/>").html(str))
    }
}

$(".center").on("click",".text",function(){
    var arr = $(".footer_wrap").eq($(this).index()).children();
    console.log($(this).index())
    showInfoImage(arr)
    $("body").css("overflow","hidden");
})

function showInfoImage(arr){
    var height = 0;
    var maxHeight;
    var str = `<div class="swiper-container">
                    <div class="swiper-wrapper">`;
    for(let i=0;i<arr.length;i++){
        str += `
            <div class="swiper-slide">
                <img src="${arr[i].children[0].src}" />
            </div>
        `
    }
    str+=`      </div>
                
            </div>`
    $(".infoImages").html(str);
    $(".infoImages").css({"display":"block","animation":"show 0.2s linear"})
    for(let j=0;j<arr.length;j++){
        if($(".swiper-slide").eq(j).height()>height){
            height = $(".swiper-slide").eq(j).height()
        }
    }
    maxHeight = parseInt(window.screen.height*0.7);
    if(height>maxHeight){
        height = maxHeight
    }
    $(".swiper-slide").css({
        'height':height+"px",
        'display':'flex',
        'align-items':'center'
    })
    setTimeout(function(){
        new Swiper('.swiper-container',{
            /* pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
            }, */
        })
    },100)
}

/* $(".swiper-container").click(function(){
    event.stopPropagation()
}) */
$(".infoImages").click(function(){
    $(this).css({"display":"none"})
    $("infoImages").html("");
    $("body").css("overflow","auto")
})

$(window).scroll(function(){
    if($(window).scrollTop()+$(window).height()==$(document).height()){
        if(data.page <data.totalPage){
            ++data.page;
            getData(data.type,data.sort)
        }
    }
})

function back(){
    history.back()
}