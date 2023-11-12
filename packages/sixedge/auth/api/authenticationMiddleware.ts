import ErrorResponse from '../../api/ErrorResponse';
import{jwtVerify} from '../jwt';

export function getToken(bearerHeader: string) {
    let token = bearerHeader.split('Bearer ')[1]; // Skips the 'Bearer [token]' part
    const decodedData = jwtVerify(token);
    return decodedData
}

export const authentication = (req: any, res: any, next) => {
    try {
        let token = req.headers['authorization'];
        let decodedData = getToken(token);
        req.auth = decodedData; // The data of the token is stored HERE
        next();
    } catch (e) { //"JsonWebTokenError: invalid token"
        ErrorResponse('Unauthorized', res)
    }
}