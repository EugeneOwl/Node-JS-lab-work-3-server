import { authService } from '../services/security/auth-service'
import { jwtTokenService } from "../services/security/jwt-token-service";
import { JWT_TOKEN_KEY } from "../consts/json-keys";
import { JWT_COOKIE_LIFETIME_MILLISECONDS } from "../consts/security-const";
import { JsonWebTokenError } from "jsonwebtoken";
import { NO_JWT_TOKEN_PROVIDED } from "../consts/messages-const";
import { JWT_TOKEN_VALIDATION } from "../consts/logs-const";
import { AUTH_IS_AUTHORIZED_URL, AUTH_LOGIN_URL } from "../routes/routes";

class AuthController {

    async login(socket, data) {
        const errorMessage = await authService.login(data.username, data.password);
        const authorized = !errorMessage;
        const token = authorized ? jwtTokenService.createToken() : '';
        socket.emit(AUTH_LOGIN_URL, {
            authorized: authorized,
            token: token,
            errorMessage: errorMessage
        });
        // if (errorMessage) {
        //     response.status(401).send({ message: errorMessage });
        //     return;
        // }
        // response.cookie(
        //     JWT_TOKEN_KEY,
        //     jwtTokenService.createToken(),
        //     {
        //         maxAge: JWT_COOKIE_LIFETIME_MILLISECONDS,
        //         httpOnly: true
        //     }
        // ).send();
    }

    async isAuthorized(socket, data) {
        console.log(JWT_TOKEN_VALIDATION, data.token);
        let authorized = true;

        try {
            await jwtTokenService.verifyToken(data.token);
        } catch (e) {
            console.log(NO_JWT_TOKEN_PROVIDED, data.token);
            authorized = false;
        }

        console.log('is auth: ', authorized);
        socket.emit(AUTH_IS_AUTHORIZED_URL, {
            authorized: authorized
        });
    }

    // async isAuthorized(request, response) {
    //     const token = request.cookies[JWT_TOKEN_KEY];
    //     console.log(JWT_TOKEN_VALIDATION, token);
    //     try {
    //         await jwtTokenService.verifyToken(token);
    //     } catch (e) {
    //         if (e instanceof JsonWebTokenError) {
    //             response.send(false);
    //             return;
    //         }
    //         console.log(NO_JWT_TOKEN_PROVIDED, token);
    //     }
    //     response.send(true);
    // }
}

const authController = new AuthController();

export { authController }
