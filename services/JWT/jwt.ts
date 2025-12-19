import { TokentInteface } from "@/interfaces/Token/tokenInterface"
import jwt from "jsonwebtoken"
export class JWTSERVICES{
    createToken(tokenPayload:TokentInteface):string | null{
        try {
          const token = jwt.sign(
            tokenPayload,
            process.env.JWT_SECRET as string
          );

          return token;
        } catch {
            return null 
        }
    }
}