import jwt, { JwtPayload } from 'jsonwebtoken';

export class JsonWebToken {

    sign(object: { payload: string | object | Buffer; secretOrPrivateKey: jwt.Secret; options?: jwt.SignOptions | undefined }): string {
        return jwt.sign(object.payload, object.secretOrPrivateKey, object.options || { algorithm: 'HS512' });
    }

    verify(object: { token: string; secretOrPrivateKey: jwt.Secret }): boolean | string | JwtPayload {
        try {
            return jwt.verify(object.token, object.secretOrPrivateKey);
        } catch (error) {
            return false;
        }
    }

}