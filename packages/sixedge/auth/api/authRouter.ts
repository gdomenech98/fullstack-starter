import { MongoDB } from "../../db";
import ErrorResponse from "../../api/ErrorResponse";
import { crypt, validate } from '../crypt';
import { Auth } from "../models/Auth";
import { UserModel, UserType } from "../models/User";
import { SessionModel } from "../models/Session";

require('dotenv').config({ path: __dirname + '/../../../../../.env' });

export const authRouter = (app) => {
    app.post('/api/v1/auth/login', async (req, res) => {
        const { email, password }: { email: string, password: string } = req.body;
        try {
            Auth.validateLogin({ identifier: email, password });
            const mongodb = await MongoDB.connect(process.env.DB_URI);
            const user = await mongodb.read('users', { identifier: email.toLowerCase() });
            await validate(password, user.password) // user.password = password hash
            // Update last login for user
            await mongodb.update('users', { id: user.id }, { ...user, lastLogin: Date.now() });
            const session = SessionModel.generateSession({ id: user.identifier, type: user.type }) // Generate session
            res.send(session);
        } catch (e) {
            ErrorResponse(e, res)
        }
    });

    app.post('/api/v1/auth/register', async (req, res) => {
        const { email, password } = req.body;
        try {
            Auth.validateRegister({ identifier: email, password });
            const hash = await crypt(password);
            const userData = UserModel.create({ identifier: email.toLowerCase(), hash }).validate().getData();
            const mongodb = await MongoDB.connect(process.env.DB_URI);
            const user = await mongodb.create('users', userData);
            const session = SessionModel.generateSession({ id: user.identifier, type: user.type })
            res.send(session);
        } catch (e) {
            ErrorResponse(e, res)
        }
    });

    // app.post('/api/v1/users/forgotpassword', async (req, res) => {
    //     const payload = req.body;
    //     const email = payload.email.toLowerCase();
    //     try {
    //         const user = await MongoDB.readOne('users', { email });
    //         const dataToSign = { "email": user.email, "type": "recover" }
    //         const jwtToken = jwtSign(dataToSign, '10m');// Obtain Token
    //         const recoverUrl = `${process.env.SERVER_URL}/changepassword?token=${jwtToken}`
    //         await Mailgun.sendRecoverEmail('support@sixedge.es', user.email, recoverUrl) // Send recover email
    //         res.send({});
    //     } catch (e) {
    //         ErrorResponse(e, res)
    //     }
    // });

    // app.post('/api/v1/users/changepassword', async (req: any, res: any) => {
    //     const payload = req.body;
    //     const newPassword = payload.password;
    //     try {
    //         const jwtToken = req?.query?.token
    //         const decodedData: any = jwtVerify(jwtToken)
    //         if (!decodedData) throw 'Server error'
    //         const oldUser = await MongoDB.readOne('users', { email: decodedData?.email });
    //         const newPasswordHash = await User.generateHash(newPassword);
    //         const newUser = {
    //             ...oldUser,
    //             password: newPasswordHash
    //         }
    //         await MongoDB.update('users', { _id: newUser._id }, newUser)
    //         res.send({});
    //     } catch (e) {
    //         ErrorResponse(e, res)
    //     }
    // });
} 