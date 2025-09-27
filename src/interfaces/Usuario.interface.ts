import { Privilegios } from ".";

export interface Usuario{
    uid:string,
    email:string,
    privilegios:Privilegios
}