function booleanToInt(name) {
    if (name === true) {
        return 1;
    } else if (name === false) {
        return 0;
    } else {
        return name;
    }
}

var test = true;
