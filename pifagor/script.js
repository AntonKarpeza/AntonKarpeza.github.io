var pif = document.getElementById("pifagor");

var arr = [];
for(var x = 3; x < 1500; x++ ){
    for(var y = 4; y < 1500; y++){
        //сумма квадратов
        var sum = Math.pow(x, 2) + Math.pow(y, 2);
        //длинна гипотенузы
        var z = Math.sqrt(sum);
        //int значение гипотенузы
        var prsZ = parseInt(Math.sqrt(sum));
        if(z%prsZ === 0){
            //добавляем в массив точки
            arr.push([x,y,z]);
            arr.push([-x,y,z]);
            arr.push([x,-y,z]);
            arr.push([-x,-y,z]);
        }
    }
}
console.log("Весь массив троек:");
console.log(arr);
console.log("************************************************************");
console.log("Массив точек, лежащих на одной окружности: ");
for(var num = 0; num < 5000; num++){
    var count = 0;
    var oneHundred = [];
    for(var i = 0; i<arr.length; i++){
        if(arr[i][2] === num){
            count++;
            oneHundred.push(arr[i]);
        }
    }
    if(count > 100){
        console.log(oneHundred);
    }
}