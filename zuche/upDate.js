var style = {
    wrap:`
        width:100%;
        margin:.1rem auto;
        background:white;
        border-radius:.1rem;
        box-sizing: border-box;
        padding:0 .1rem;
    `,
    div1:`
        height:1rem;
    `,
    div2:`
        text-align:center;
    `,
    div1Input:`
        width:4.4rem;
        padding:.1rem .2rem;
        margin-left:.2rem;
        border-radius:2rem;
        border:1px solid gray;
    `,
    catch:`
        font-size:.3rem;
    `,
    catch1:`
        display:inline-block;
        width:100%;
        font-size:.3rem;
        text-align:left;
        `,
    upImgWrap:`
        width:2rem;
        height:2rem;
        position: relative;
    `,
    upImg:`
        width:100%;
        display:block;
    `,
    file:`
        width:100%;
        position: absolute;
        left:0;
        top:40%;
        opacity:0;
    `,
    upFile:`
        width:95%;
        margin:auto;
        display:flex;
        flex-wrap:wrap;
    `
}



;(function(){
    str = `
    <div class="wrap" style="${style.wrap}">
        <div style="${style.div1}">
            <span style="${style.catch}">赔扣金额:</span><input style="${style.div1Input}" type = "number" />
        </div>
        <div style="${style.div2}">
            <span style="${style.catch1}">还车备注:</span><br/><textarea cols="49" rows="5"></textarea>
        </div>
        <div style="${style.upFile}" class="upFile">
            <div class="upImgWrap" style="${style.upImgWrap}">
                <img style="${style.upImg}" src="./img/rel_icon_upl.png" />
                <input type="file" style="${style.file}" onChange="chooseFile(this)"/>
            </div>
        </div>
    </div>
    
    `

    $(".infoList").after($("<div/>").attr("class","ipt").html(str))
})();

var fileArr = []
function chooseFile(n){
    if(!n.files[0]){
        return
    }else{
        fileArr.push(n.files[0]);
        var url = URL.createObjectURL(n.files[0]);
        var str = `
            <img src="${url}" style="width:100%;display:block;"/>
        `
        $(".upImgWrap").before($("<div/>").attr("class","showImg").html(str).css({
            width:2+'rem',
            height:2+'rem',
            overflow:'hidden'
        }))
    }
}

$(".upFile").on("click",".showImg",function(){
    var index = $(this).index();
    $(this).remove();
    fileArr.splice(index,1);
})