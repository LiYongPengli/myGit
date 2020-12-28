import xlsx, { WorkSheet } from 'xlsx';

export default class Table2Xlsx {
    constructor(data:any[],filename:string) {
        let sheet = xlsx.utils.json_to_sheet(data);
        let blob = this.sheet2blob(sheet);
        this.openDownloadDialog(blob,filename+'.xlsx')
    }

    // 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
    private sheet2blob(sheet: WorkSheet, sheetName: string = "") {
        sheetName = sheetName || 'sheet1';
        let workbook = {
            SheetNames: [sheetName],
            Sheets: {}
        };
        workbook.Sheets[sheetName] = sheet;
        let wbout = xlsx.write(workbook, {
            bookType: 'xlsx', // 要生成的文件类型
            bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容�
            type: 'binary'
        });
        let blob = new Blob([this.string2arraybuffer(wbout)], { type: "application/octet-stream" });

        return blob;
    }

    // 字符串转ArrayBuffer
    private string2arraybuffer(s: string) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    /**
* 通用的打开下载对话框方法，没有测试过具体兼容�
* @param blob 下载地址，也可以是一个blob对象，必�
* @param saveName 保存文件名，可�
*/
    private openDownloadDialog(blob: Blob, saveName: string) {
        let url: string = "";
        if (typeof blob == 'object' && blob instanceof Blob) {
            url = URL.createObjectURL(blob); // 创建blob地址
        }
        let aLink = document.createElement('a');
        aLink.href = url;
        aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生�
        let event;
        if (window.MouseEvent) event = new MouseEvent('click');
        else {
            event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        }
        aLink.dispatchEvent(event);
        aLink.remove();
    }
}