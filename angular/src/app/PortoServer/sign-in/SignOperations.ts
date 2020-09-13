import { SignUser } from './SignUser';

export interface SignOperations{
    validationId(user:SignUser,key:Number)
}