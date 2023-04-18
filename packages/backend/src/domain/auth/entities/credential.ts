import bcrypt from "bcrypt";
import Entity, { EntityAttributes } from "../../common/entity";

export enum CredentialType {
    PASSWORD = "password",
    TOTP = "totp"
}

export interface CredentialAttributes extends EntityAttributes {
    credentialType: CredentialType,
    credentialValue: string,
    userId: string,
}

export interface CredentialParams {
    credentialType?: CredentialType,
    credentialValue: string,
    userId: string,
}

export class Credential extends Entity<CredentialAttributes, CredentialParams> {

    public credentialType!: CredentialType;
    public credentialValue!: string;
    public userId!: string;

    private static readonly SALT_ROUNDS = 10;

    static async hashPassword(password: string): Promise<string> {
        console.log(password);
        return await bcrypt.hash(password, Credential.SALT_ROUNDS);
    }

    public static async newInstance(params: CredentialParams): Promise<Credential> {
        const type = params.credentialType || CredentialType.PASSWORD;
        if (type !== CredentialType.PASSWORD)
            throw new Error("Only password credentials are supported at this time.");

        const credential = new Credential(params);
        credential.credentialValue = await Credential.hashPassword(params.credentialValue);
        return credential;
    }

    verify(challenge: string): Promise<boolean> {
        return bcrypt.compare(challenge, this.credentialValue);
    }

}
