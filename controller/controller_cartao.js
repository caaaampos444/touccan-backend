const message = require('./modulo/config.js')
const cartaoDAO = require('../model/DAO/cartao.js')
const controller_user = require('./controller_usuario.js')
const controller_client = require('./controller_cliente.js')

const postClientCard = async function(data, contentType) {
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            let json={}
            if(
                data.numero.length!=16      || data.numero==null       || data.numero==''            || data.numero==undefined       || isNaN(data.numero) ||
                data.validade.length!=5     || data.validade==null     || data.validade==''          || data.validade==undefined     ||
                data.cvv.length!=3          || data.cvv==null          || data.cvv==''               || data.cvv==undefined          || isNaN(data.cvv)    ||
                data.nome_titular.length>40 || data.nome_titular==null || data.nome_titular==''      || data.nome_titular==undefined ||
                data.cpf.length!=11         || data.cpf==null          || data.cpf==''               || data.cpf==undefined          || isNaN(data.cpf)    ||
                data.id_cliente==null       || data.id_cliente==''     || data.id_cliente==undefined || isNaN(data.id_cliente)                            
            )
                return message.ERROR_REQUIRED_FIELDS
            else{
                let validateStatus=false
                if(data.apelido!=null&&data.apelido!=''&&data.apelido!=undefined){
                    if(data.apelido.length>45)
                        return message.ERROR_REQUIRED_FIELDS
                    else
                        validateStatus=true
                }
                else
                    validateStatus=true
                if(validateStatus){
                    let client=await controller_client.getClientId(data.id_cliente)
                    if(client.status==true){
                        let rtnDAO=await cartaoDAO.insertClientCard(data)
                        if(rtnDAO){
                            json.cartao=data
                            json.status=message.SUCCESS_CREATED_ITEM.status
                            json.status_code=message.SUCCESS_CREATED_ITEM.status_code
                            json.message=message.SUCCESS_CREATED_ITEM.message
                            return json
                        }
                        else
                            return message.ERROR_INTERNAL_SERVER_DB
                    }
                    else
                        return message.ERROR_NOT_FOUND
                }
            }
        }
        else
            return message.ERROR_CONTENT_TYPE
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const postUserCard = async function(data, contentType) {
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            let json={}
            if(
                data.numero.length!=16      || data.numero==null       || data.numero==''            || data.numero==undefined       || isNaN(data.numero) ||
                data.validade.length!=5     || data.validade==null     || data.validade==''          || data.validade==undefined     ||
                data.cvv.length!=3          || data.cvv==null          || data.cvv==''               || data.cvv==undefined          || isNaN(data.cvv)    ||
                data.nome_titular.length>40 || data.nome_titular==null || data.nome_titular==''      || data.nome_titular==undefined ||
                data.cpf.length!=11         || data.cpf==null          || data.cpf==''               || data.cpf==undefined          || isNaN(data.cpf)    ||
                data.id_usuario==null       || data.id_usuario==''     || data.id_usuario==undefined || isNaN(data.id_usuario)                            
            )
                return message.ERROR_REQUIRED_FIELDS
            else{
                let validateStatus=false
                if(data.apelido!=null&&data.apelido!=''&&data.apelido!=undefined){
                    if(data.apelido.length>45)
                        return message.ERROR_REQUIRED_FIELDS
                    else
                        validateStatus=true
                }
                else
                    validateStatus=true
                if(validateStatus){
                    let user=await controller_user.getUserId(data.id_usuario)                    
                    if(user.status==true){
                        let rtnDAO=await cartaoDAO.insertUserCard(data)
                        if(rtnDAO){
                            json.cartao=data
                            json.status=message.SUCCESS_CREATED_ITEM.status
                            json.status_code=message.SUCCESS_CREATED_ITEM.status_code
                            json.message=message.SUCCESS_CREATED_ITEM.message
                            return json
                        }
                        else
                            return message.ERROR_INTERNAL_SERVER_DB
                    }
                    else
                        return message.ERROR_NOT_FOUND
                }
            }
        }
        else
            return message.ERROR_CONTENT_TYPE
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const putClientCard=async function(data, id, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json'){
            if (
                data.numero == '' || data.numero == undefined || data.numero == null || data.numero.length > 16 ||
                data.validade == '' || data.validade == undefined || data.validade == null || data.validade.length > 5 ||
                data.cvv == '' || data.cvv == undefined || data.cvv == null || data.cvv.length > 3 ||
                data.nome_titular == '' || data.nome_titular == undefined || data.nome_titular == null || data.nome_titular.length > 40 ||
                data.cpf == '' || data.cpf == undefined || data.cpf == null || data.cpf.length > 11 ||
                data.apelido == '' || data.apelido == undefined || data.apelido == null || data.apelido.length > 45
            ) 
                return message.ERROR_REQUIRED_FIELDS 
            else if(id==''||id==undefined||id==null||isNaN(id))
                return message.ERROR_INVALID_ID     
            else{
                let json={}
                let rtnDAO=await cartaoDAO.updateClientCard(data, id)
                if(rtnDAO){
                    json.cartao=data
                    json.status=message.SUCCESS_UPDATED_ITEM.status
                    json.status_code=message.SUCCESS_UPDATED_ITEM.status_code
                    json.message=message.SUCCESS_UPDATED_ITEM.message
                    return json
                }
                else
                    return message.ERROR_INTERNAL_SERVER_DB
            }      
        }
        else
            return message.ERROR_CONTENT_TYPE
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const putUserCard=async function(data, id, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json'){
            if (
                data.numero == '' || data.numero == undefined || data.numero == null || data.numero.length > 16 ||
                data.validade == '' || data.validade == undefined || data.validade == null || data.validade.length > 5 ||
                data.cvv == '' || data.cvv == undefined || data.cvv == null || data.cvv.length > 3 ||
                data.nome_titular == '' || data.nome_titular == undefined || data.nome_titular == null || data.nome_titular.length > 40 ||
                data.cpf == '' || data.cpf == undefined || data.cpf == null || data.cpf.length > 11 ||
                data.apelido == '' || data.apelido == undefined || data.apelido == null || data.apelido.length > 45
            ) 
                return message.ERROR_REQUIRED_FIELDS 
            else if(id==''||id==undefined||id==null||isNaN(id))
                return message.ERROR_INVALID_ID     
            else{
                let json={}
                let rtnDAO=await cartaoDAO.updateUserCard(data, id)
                if(rtnDAO){
                    json.cartao=data
                    json.status=message.SUCCESS_UPDATED_ITEM.status
                    json.status_code=message.SUCCESS_UPDATED_ITEM.status_code
                    json.message=message.SUCCESS_UPDATED_ITEM.message
                    return json
                }
                else
                    return message.ERROR_INTERNAL_SERVER_DB
            }      
        }
        else
            return message.ERROR_CONTENT_TYPE
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const getClientCard = async function(id) {
    try {
        let idC = id
        if (idC == null || idC == undefined || idC == '' || isNaN(idC)) {
            return message.ERROR_INVALID_ID
        } else {
            let client = await controller_client.getClientId(id)          
            if (client) {
                let data = await cartaoDAO.selectClientCard(idC)
                if (data) {
                    if (data.length > 0) {
                        let json = {}
                        json.cartao = data
                        json.quantidade=data.length
                        json.status_code=200
                        return json
                    } else {
                        return message.ERROR_NOT_FOUND
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            } else {
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getUserCard = async function(id) {
    try {
        let idU = id
        if (idU == null || idU == undefined || idU == '' || isNaN(idU)) {
            return message.ERROR_INVALID_ID
        } else {
            let user = await controller_user.getUserId(idU)          
            if (user) {
                let data = await cartaoDAO.selectUserCard(idU)
                if (data) {
                    if (data.length > 0) {
                        let json = {}
                        json.cartao = data
                        json.quantidade=data.length
                        json.status_code=200
                        return json
                    } else {
                        return message.ERROR_NOT_FOUND
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            } else {
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports={
    postClientCard,
    postUserCard,
    putClientCard,
    putUserCard,
    getClientCard,
    getUserCard
}