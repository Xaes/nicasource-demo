import jwt from "jsonwebtoken";
import CredentialRepository, { ICredentialRepository } from "../../persistence/repositories/credentialRepository";
import { Credential, CredentialParams, CredentialType } from "./entities/credential";
import { SessionToken } from "./entities/sessiontoken";
import DomainException from "../common/exception";
import Config from "../../../config/config";
import { User } from "./entities/user";

export interface SessionPayload extends jwt.JwtPayload {
    userId: string
}

export class Auth {
    private readonly privateKey: string;
    private credentialRepository: ICredentialRepository;

    constructor(credentialRepository: ICredentialRepository, privateKey?: string) {
        this.privateKey = privateKey || Config.AUTH.PRIVATE_KEY;
        this.credentialRepository = credentialRepository;
    }

    async addCredential(params: CredentialParams): Promise<Credential>  {
        const credential = await Credential.newInstance(params);
        return await this.credentialRepository.save(credential);
    }

    async authenticate(user: User, credentialType: CredentialType, challenge: string): Promise<SessionToken> {
        const credential = await this.findCredentialByUserId(user.id, credentialType);
        if (!credential) throw new DomainException(`Credential not found for user ${user.id} and type ${credentialType}.`);

        const isVerified = await credential.verify(challenge);
        if (!isVerified) throw new DomainException("Invalid credential.");

        const accessToken = await this.generateAccessToken({ userId: user.id });
        return new SessionToken(accessToken, "refreshToken", new Date());
    }

    async verifyAccessToken(accessToken: string): Promise<SessionPayload> {
        return new Promise((resolve, reject) => {
            jwt.verify(accessToken, this.privateKey, (err, decoded) => {
                if (err) reject(err);
                else resolve(decoded as SessionPayload);
            });
        });
    }

    /*
    async refreshAccessToken(refreshToken: string): Promise<SessionToken> {
        throw new Error("Not implemented.");
    }
    */

    private generateAccessToken(payload: SessionPayload): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.privateKey, { algorithm: "HS256", expiresIn: "1 day" }, (err, token) => {
                if (err) reject(err);
                else resolve(token as string);
            });
        });
    }

    private findCredentialByUserId(userId: string, credentialType: CredentialType): Promise<Credential | null> {
        return this.credentialRepository.findOne({ where: { userId, credentialType } });
    }
}


const auth = new Auth(CredentialRepository);
export default auth;
