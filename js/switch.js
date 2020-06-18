function myChar() {
    var text;
    var number = document.getElementById("favno").value;
//SWITCH CASE WITH INPUT VALUES
    switch(number) {
        case "1":
            text = "You are are Great";
        break;
        case "2":
        text = "You have a tactical mind";
        break;
        case "3":
        text = "You are Great Thinker";
        break;
        case "4":
        text = "You are Smart!";
        break;
        case "5":
        text = "You Love Sports !";
        break;
        case "6":
        text = "You are Understanding person";
        break;
        case "7":
        text = "You are Handsome! :)";
        break;
        case "8":
        text = "You are Fabulous! :)";
        break;
        case "9":
        text = "You are Intelligent! :)";
        break;
        case "10":
        text = "You are Cunning! :)";
        break;
        default:
        text = "I have never heard of that number...";
    }
    document.getElementById("demo").innerHTML = text;
}