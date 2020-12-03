export default class Helper {

    constructor(){

    };

    zipconcat (a, b) {
        var c = [[]];
        for (var i = 0; i < a.length; i++) {
          c[i] = a[i].concat(b[i]);
        }
        return c;
      };

    shuffle() {
        for (var i = array.length - 1; i > 0; i--)
        {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    }  

}