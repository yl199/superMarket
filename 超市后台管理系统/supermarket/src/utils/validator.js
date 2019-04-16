//工具函数
//验证密码(以字母开头，长度在3~6之间，只能包含字符、数字和下划线)
export function passwordReg(val){
    const reg=/^[a-zA-Z]\w{2,5}$/;
    return reg.test(val)
}

//验证商品价格
export function priceReg(val){
    const reg=/^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/;
    return reg.test(val)
}

//验证商品数量
export function quantityReg(val){
    const reg=/^[0-9]*[1-9][0-9]*$/;
    return reg.test(val)
}
