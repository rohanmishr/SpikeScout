class Notifications{
    static input(msg){
        return window.prompt(msg);
    }

    static confirm(msg){
        return window.confirm(msg);
    }
}