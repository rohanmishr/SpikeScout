class Notifications{
    static async input(msg){
        /*$("#input-box").css("display", "flex");
        $("#input-box-question").html(msg);

        while (!this.submittedData) {
            await new Promise((resolve) => setTimeout(resolve, 100));
        }

        const data = this.submittedData;
        this.submittedData = null;
        $("#input-box").css("display", "none");
        return data;*/
        return window.prompt(msg);
    }

    static submittedData = null;

    static confirm(msg){
        return window.confirm(msg);
    }
}