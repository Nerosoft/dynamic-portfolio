 class cars{
    public  name:string ;
    public model:number;
    constructor(name:string ,model:number){
        console.log("IAM HERRRRRRRRRRRRRR");
        this.name=name;
        this.model=model;
    }

    
}




abstract class creadit {

    private creaditID:number;
    private pass:number;
    constructor(creaditID:number, pass:number){
        this.creaditID=creaditID;
        this.pass=pass;
    }
        
    public getCreaditID():number{
        return this.creaditID;
    }

    public getPassOfCreadit() :number  {
         return this.pass;
    }

}

export interface creditOp{

    machine:string;
    
    loginCredit(pass:number);
}

export  class employ extends creadit implements creditOp {
    machine: string;
    public fullName:string;
    public age:number;

    constructor(fullName:string, age:number , creaditID:number, pass:number){
        super(creaditID,pass);
        this.fullName=fullName;
        this.age=age;
        this.machine="atmv1";
    }

    loginCredit(pass: number) {
       if(pass == this.getPassOfCreadit()){

            console.log(this.fullName + " successfully login ");
            console.log( "your creadit is " + this.getCreaditID());

       }else console.log("roooooong pass");
    }
}
