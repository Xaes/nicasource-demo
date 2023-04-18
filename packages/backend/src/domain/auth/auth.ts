import * as jwt from "jsonwebtoken";
import { ICredentialRepository } from "../../persistence/repositories/credentialRepository";
import { Credential, CredentialParams, CredentialType } from "./entities/credential";
import { SessionToken } from "./entities/sessiontoken";
import { User } from "./entities/user";
import DomainException from "../common/exception";

export class Auth {
    private readonly privateKey: string;
    private credentialRepository: ICredentialRepository;

    constructor(privateKey: string, credentialRepository: ICredentialRepository) {
        this.privateKey = privateKey;
        this.credentialRepository = credentialRepository;
    }

    async addCredential(params: CredentialParams): Promise<Credential>  {
        const credential = await Credential.newInstance(params);
        return await this.credentialRepository.create(credential);
    }

    async authenticate(user: User, credentialType: CredentialType, challenge: string): Promise<SessionToken> {
        const credential = await this.findCredentialByUserId(user.id, credentialType);
        if (!credential) throw new DomainException(`Credential not found for user ${user.id} and type ${credentialType}.`);

        const isVerified = await credential.verify(challenge);
        if (!isVerified) throw new DomainException("Invalid credential.");

        const accessToken = await this.generateAccessToken({ userId: user.id });
        return new SessionToken(accessToken, "refreshToken", new Date());
    }

    /*
    async refreshAccessToken(refreshToken: string): Promise<SessionToken> {
        throw new Error("Not implemented.");
    }
    */

    private generateAccessToken(payload: Record<string, string>): Promise<string> {
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
