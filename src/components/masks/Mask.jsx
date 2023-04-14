export function cep(e){

    console.log(e)
    e.currentTarget.maxLength = 9;
    let value = e.currentTarget.value;

    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");

    e.currentTarget.value = value

    return e;
}