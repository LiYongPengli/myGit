require('./wxLogin')
export const Wx  = (obj)=>{
    return new WxLogin(obj)
}