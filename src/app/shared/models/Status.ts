export class Status{

    private one : boolean[];
    private two : boolean[];
    private three : boolean[];
    private four: boolean[];

    constructor(){

        this.one = [];
        this.two = [];
        this.three = [];
        this.four = [];

    }

    public getOne():boolean[]{
        return this.one;
    }

    public getTwo():boolean[]{
        return this.two;
    }

    public getThree():boolean[]{
        return this.three;
    }

    public getFour():boolean[]{
        return this.four;
    }


    public setOne(values : boolean[]):void{
        this.one = values;
    }

    public setTwo(values : boolean[]):void{
        this.two = values;
    }

    public setThree(values : boolean[]):void{
        this.three = values;
    }

    public setfour(values : boolean[]):void{
        this.four = values;
    }

    public resetAll():void{
        this.one = [];
        this.two = [];
        this.three = [];
        this.four = [];


    }



}