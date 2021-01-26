
export default class ClickAble {
    public click_cnt:number = 10;
    private html: HTMLElement;
    private anim:number|null=null;
    constructor(html: HTMLElement,clickX:number,clickY:number) {
        this.html = html;
        this.htmlOnClick(clickX,clickY)
    }

    private htmlOnClick(X:number,Y:number): void {
        let $elem = document.createElement("b");
        $elem.style.color = "#E94F06";
        $elem.style.zIndex = '9999';
        $elem.style.position = "absolute";
        // $elem.style.select = "none";
        let x =X;
        let y = Y;
        $elem.style.left = (x - 10) + "px";
        $elem.style.top = (y - 20) + "px";
        if(this.anim){
            clearInterval(this.anim);
        }
        switch (this.click_cnt) {
            case 10:
                $elem.innerHTML = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEqADAAQAAAABAAAAEAAAAADgaeE1AAABHElEQVQ4Ea2SrU5DQRCFvynFUUGCoAoSNAZHg4cnQFKBwMA7IFE4DD9V8AwE1SCqqkkQWBJEHWlCA3Q42942Jd27vTRsMtlzz8x8d7K7MGs1/IgbbykqqdJSKjnIOVs4NemTVO1sEGxngJ35QQ2vaZrNAcApzwe682X63E40v0zoKWlc+73cvSzTo8SuAEsYF5pmbdxhnCn3KM+V68v/VHSlnjm09wDycXEQxqlKj6VWfvl5H8YbVdZjh23qiflxlLNKh3K8wf4AMj44sG4cBAvx30dc5zW4eaA8f5pkOuwEqPhE0E6Bik/kNAMo77UWmyhcfYXWf0x0xb59D0HGQxDZ6ulBNllkQ3tdcakIZ9BRfI2Ksv1JV3U+8n4AVzs8dgedKA8AAAAASUVORK5CYII=">`;
                break;
            case 20:
                $elem.innerText = "(๑•́ ∀ •̀๑)";
                break;
            case 30:
                $elem.innerText = "(๑•́ ₃ •̀๑)";
                break;
            case 40:
                $elem.innerText = "(๑•̀_•́๑)";
                break;
            case 50:
                $elem.innerText = "（￣へ￣）";
                break;
            case 60:
                $elem.innerText = "(╯°口°)╯(┴—┴";
                break;
            case 70:
                $elem.innerText = "૮( ᵒ̌皿ᵒ̌ )ა";
                break;
            case 80:
                $elem.innerText = "╮(｡>口<｡)╭";
                break;
            case 90:
                $elem.innerText = "( ง ᵒ̌皿ᵒ̌)ง⁼³₌₃";
                break;
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
                $elem.innerText = "(ꐦ°᷄д°᷅)";
                break;
            default:
                $elem.innerText = "❤";
                break;
        }
        $elem.style.fontSize = Math.random() * 10 + 8 + "px";
        let increase = 0;
        setTimeout( ()=> {
            this.anim = setInterval(()=>{
                if (++increase >= 50) {
                    clearInterval(<number>this.anim);
                    this.html.removeChild($elem);
                }
                $elem.style.top = y - 20 - increase + "px";
                $elem.style.opacity = ((50 - increase) / 50)+"";
            }, 8);
        }, 70);
        this.html.appendChild($elem);
    }
}