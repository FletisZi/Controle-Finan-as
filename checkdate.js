const data = new Date()
let  mes = String(data.getMonth() + 1).padStart(2,'0')

switch (mes) {
    case '01' :
        mes = 'jan';
        break;
    case '02' :
        mes = 'fev';
        break;
    case '03' :
        mes = 'mar';
        break;
    case '04' :
        mes = 'abr';
        break;  
    case '05' :
        mes = 'mai';
        break;
    case '06' :
        mes = 'jun';
        break;
    case '07' :
        mes = 'jul';
        break;
    case '08' :
        mes = 'ago';
        break;
    case '09' :
        mes = 'set';
        break;  
    case '10' :
        mes = 'out';
        break;
    case '11' :
        mes = 'nov';
        break;
    case '12' :
        mes = 'dez';
        break;  
    default:
        mes = 'nao rolou';
        break;             
}


export default mes