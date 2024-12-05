import { ObjectId } from "mongodb";

const jwt = require('jsonwebtoken');
require('dotenv').config()

export class LoginService {

  verifyJWT(request: Request) : {name:string, id:ObjectId, exp: number} | null
  {
    const token = request.headers["authorization"].replace('Bearer ', '');
    const secret = process.env.SECRET_KEY;
    try {
        const decoded = jwt.verify(token, secret);
        const now = Date.now();

        if (now > decoded.exp)
            return null;
        return decoded;
    }
    catch(err)
    {
        console.log(err)
        return null;
    }
  } 
}
