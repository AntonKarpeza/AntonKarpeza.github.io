/**
 * Created by Anton on 3/27/2018.
 */
ymaps.ready(init);

var center = [55.78, 37.695]; //Moscow

var pointsData = {}; //dots on map
var roadData; //road coords

$.ajax({
    url: "./data/points.json"
}).done(function(data) {
    pointsData = data;
});

$.ajax({
    url: "./data/road.json"
}).done(function(data) {
    roadData = data;
});




function init() {
    // Создаем карту.
    var myMap = new ymaps.Map("map", {
        center: [center[0], center[1]],
        zoom: 14,
        controls: ['zoomControl']
    });


    /*_______________________________________________Buttons*/
    var createRoadBtn = new ymaps.control.Button({
        data:{
            content: "Создать маршрут"
        },
        options:{
            maxWidth: [200]
        }
    });

    var editRoadBtn = new ymaps.control.Button({
        data:{
            content: "Редактировать маршрут"
        },
        options:{
            maxWidth: [200]
        }
    });

    var editElemBtn = new ymaps.control.Button({
        data:{
            content: "Редактировать объекты"
        },
        options: {
            maxWidth: [200]
        }
    });

    /********************************************************/

    /*_____________________________________________Создать маршрут*/
    var myPolyline = new ymaps.Polyline(
        // Указываем координаты вершин.
        roadData
        , {}, {
        // Задаем опции геообъекта.
        // Цвет с прозрачностью.
        strokeColor: "#00000088",
        // Ширину линии.
        strokeWidth: 4,
        // Максимально допустимое количество вершин в ломаной.
        //editorMaxPoints: 6,
        // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
        editorMenuManager: function (items) {
            items.push({
                title: "Удалить линию",
                onClick: function () {
                    myMap.geoObjects.remove(myPolyline);
                }
            });
            return items;
        }
    });
    /**************************************************************/





    /*_____________________________________________Элементы маршрута*/
    var objectsGeoQ = ymaps.geoQuery(pointsData);
    ymaps.geoQuery(objectsGeoQ).addToMap(myMap);
    var objectsGeoQRes = ymaps.geoQuery(myMap.geoObjects).searchIntersect(myMap);

    var circle = new ymaps.Circle([[55.79915326887831, 37.69911969219739], 80], null, { draggable: false });






    /*****************************************************************/




    /*_______________________________________________Обработчики на кнопках*/

    //создать маршрут
    createRoadBtn.events.add("select", function () {
        myPolyline.editor.startDrawing();
        myPolyline.editor.startEditing();
    });

    createRoadBtn.events.add("deselect", function () {
        console.log(myPolyline.geometry._childPath._children); //_childPath
        console.log(myPolyline.geometry);
        myPolyline.editor.stopEditing();
        myPolyline.editor.stopDrawing();
    });

    //редактировать маршрут
    editRoadBtn.events.add("select", function () {
        myPolyline.editor.startEditing();
    });
    editRoadBtn.events.add("deselect", function () {
        console.log(myPolyline.geometry._childPath._children); //_childPath
        myPolyline.editor.stopEditing();
    });

    editElemBtn.events.add("select", function(){
        var count = objectsGeoQ._objects.length;
        //collection._collectionComponent._baseArrayComponent._children[count-1].editor.startEditing();
        for(var x = 0; x < count; x++){
            objectsGeoQ._objects[x].editor.startEditing();
        }
    });
    editElemBtn.events.add("deselect", function(){
        var count = objectsGeoQ._objects.length;
        //collection._collectionComponent._baseArrayComponent._children[count-1].editor.startEditing();
        for(var x = 0; x < count; x++){
            objectsGeoQ._objects[x].editor.stopEditing();
        }
    });

    /**********************************************************************/

    /*__________________________________________________________________Видео*/

    var video = document.getElementById("content-video");
    function playVideo(srcPrm) {
        console.log(video.src);
        if(srcPrm !== undefined){
            if(video.src === ""){
                video.src = srcPrm;
                video.style.display = "block";
                console.log("включили видео");
                var intvl = setInterval(function(){

                    console.log("работает интервал");
                    var videoEnded = video.ended;
                    if(videoEnded){
                        clearInterval(intvl);
                        video.removeAttribute("src");
                        console.log("scr видео - " + video.src);
                        video.style.display = "none";
                        console.log("закрыт интервал");
                    }

                }, 1000);
            }
        }
    }


    /***********************************************************************/

    /*_______________________________________________________Изменение движения точки*/
    document.getElementById('startButton').onclick = function () {
        setTimeout(function(){
            circle.geometry._coordinates = [55.798162126649515, 37.70002091442642];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 2000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.79730392206193, 37.700771932950566];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 4000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.79643965458668, 37.70170534168777];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 6000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.795596521950785, 37.702601199498744];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 8000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.79475337099613, 37.703411226621235];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 10000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.79455995743054, 37.70152295147475];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 12000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.79434236601387, 37.6998921683937];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 14000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.794112684872324, 37.69819701229627];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 16000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.79396157811605, 37.696684246411884];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 18000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.79375304982485, 37.69504809891279];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 20000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.79353998715164, 37.693393175950604];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 22000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.7932543906811, 37.69156659161147];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 24000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.792805185451066, 37.69036914878529];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 26000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.79239607747434, 37.68920624767836];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 28000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.79178557553605, 37.68755400692518];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 30000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.791298980476476, 37.68629873310621];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 32000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.79087433818528, 37.685199027410114];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                console.log(video.src);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 34000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.79035977430407, 37.68374795233306];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                console.log(video.src);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 36000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.789679345644736, 37.681928073516445];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                console.log(video.src);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 38000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.78880546281673, 37.679636125913234];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 40000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.78788659891231, 37.67882073437266];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 42000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.78754273327664, 37.67965450593608];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 44000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.78711689549814, 37.68072351515844];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 46000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.78677702162708, 37.6815815497622];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 48000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.78649826571424, 37.68228125194551];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 50000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.78621379552971, 37.68297621214718];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 52000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.78585996616939, 37.68380493150986];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 54000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.78563770846087, 37.684371556181134];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 56000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.785308937040746, 37.685138987504914];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 58000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.78501990014969, 37.685852970756315];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 60000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.78473632959144, 37.686553285135915];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 62000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.78450385729178, 37.68715556997308];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 64000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.784260659162115, 37.68782149281774];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 66000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.78394490947135, 37.688616161695094];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 68000);

        /*------------------------------------------------------------------------------*/

        setTimeout(function(){
            circle.geometry._coordinates = [55.783509606309664, 37.69171679531631];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 70000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.7831226660953, 37.69465649639663];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 72000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.78246969571198, 37.69671643292007];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 74000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.7811395368571, 37.695729380002575];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 76000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.77942203291383, 37.69222407453102];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 78000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.77770493648782, 37.689470616121696];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 80000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.77631422460648, 37.68682788426208];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 82000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.77477832865432, 37.6837559989601];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 84000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.77301248519253, 37.68609488522103];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 86000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.77098045635426, 37.688476686826306];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 89000);


        /*--------------------------------------------------------------------------*/

        setTimeout(function(){
            circle.geometry._coordinates = [55.76927492144824, 37.68877709423599];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 92500);

        setTimeout(function(){
            circle.geometry._coordinates = [55.76801084189919, 37.68804753338394];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 94000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.76723362423756, 37.68755400692518];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 96000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.766361125950034, 37.686942463269766];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 98000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.765670825282456, 37.68646503006511];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 100000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.76520469527159, 37.686140482774306];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 102000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.764472409984705, 37.685687189450775];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 104000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.76375863591082, 37.68519366299204];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 106000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.76317187959932, 37.68479669605783];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 108000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.762536721032816, 37.68435681377944];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 110000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.76282533968757, 37.681997004109434];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 112000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.763043978301724, 37.680151377175605];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 114000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.763225886072156, 37.678606291217214];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 116000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.76338942825706, 37.67727584876293];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 118000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.763592179567, 37.67573086297892];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 120000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.76380243664654, 37.67422880923483];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 122000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.764016445980786, 37.67283405219922];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 124000);

        setTimeout(function(){
            circle.geometry._coordinates = [55.76423045414796, 37.67131054913094];
            console.log("1");
            myMap.geoObjects.add(circle);

            var objectsInsideCircle = objectsGeoQRes.searchInside(circle);
            if(objectsInsideCircle._objects.length !== 0){
                console.log(objectsInsideCircle._objects[0].properties._data.balloonContent);
                playVideo(objectsInsideCircle._objects[0].properties._data.balloonContent);
            }
        }, 126000);






    };




    /*********************************************************************************/










    /*_________________________________________________Инициализация объектов на карте*/
    myMap.controls.add(createRoadBtn, {float: "right"});
    myMap.controls.add(editRoadBtn, {float: "right"});
    myMap.controls.add(editElemBtn, {float: "left"});
    myMap.geoObjects.add(myPolyline);
    myMap.geoObjects.add(circle);


    //reload document
    document.getElementById('destroyButton').onclick = function () {
        myMap.destroy();
        ymaps.ready(init);
    }
}

$(document).ready(function() {
    var owl = $('#owl-first');
    owl.owlCarousel({
        nav: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 1500,
        responsive: {
            0: {
                items: 1
            }
        }
    })
});