interface UserHistory{
    phone_number:string;
    historys:string[];
}

export default class IDBDriver{
    private static idbdriver:IDBDriver;
    public table!:string;
    private db!:IDBDatabase;

    public static getInstance():IDBDriver{
        if(!this.idbdriver){
            this.idbdriver = new IDBDriver();
        }
        return this.idbdriver;
    }

    /**
     * 打开数据库
     * @param db 数据库名字
     * @param table 表名字
     */
    public connect(db:string,table:string):Promise<IDBObjectStore>{
        this.table = table;
        return new Promise((resolve,reject)=>{
            let request = indexedDB.open(db);
            request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
                let db = (<IDBOpenDBRequest>e.target).result;
                if (!db.objectStoreNames.contains(table)) {
                  db.createObjectStore("userHistory", { keyPath: "phone_number" });
                }
              };
              request.onsuccess = (e: Event) => {
                this.db = (<IDBOpenDBRequest>e.target).result;
                let table1 = this.db.transaction(table,'readwrite').objectStore(table);
                resolve(table1)
              };
              request.onerror = (e:Event)=>{
                reject(e)
              }
        })
    }

    //查询所有
    public findAll():Promise<any[]>{
        let table = this.db.transaction(this.table,'readwrite').objectStore(this.table);
        return new Promise((res,err)=>{
            let opcur = table.openCursor()
            opcur.onsuccess = (e:Event)=>{
                let curor = (<IDBRequest>e.target).result;
                if(curor){
                    console.log(curor)
                }else{
                    res([]);
                }
            }
            opcur.onerror = e=>{
                err(e);
            }
        })
    }

    //添加数据
    public add(phone:string,history:string[]){
        let table = this.db.transaction(this.table,'readwrite').objectStore(this.table);
        return new Promise((res,err)=>{
            let req = table.add({phone_number:phone,historys:history});
            req.onsuccess = ()=>{
                res('success')
            }
            req.onerror = e=>{
                err(e);
            }
        })
    }

    //读取一条数据
    public read(phone_number:string):Promise<UserHistory|null>{
        let table = this.db.transaction(this.table,'readwrite').objectStore(this.table);
        return new Promise((res,err)=>{
            let req = table.get(phone_number);
            req.onsuccess = ()=>{
                if(req.result){
                    res(req.result)
                }else{
                    res(null);
                }
            }
            req.onerror = e=>{
                err(e);
            }
        })
    }

    //更新一条数据
    public put(phone_number:string,historys:string[]){
        let table = this.db.transaction(this.table,'readwrite').objectStore(this.table);
        return new Promise((res,err)=>{
            let req = table.put({phone_number:phone_number,historys:historys});
            req.onsuccess = ()=>{
                res('success');
            }
            req.onerror = e=>{
                err(e);
            }
        })
    }
}