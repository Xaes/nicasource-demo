import { CreatorParams } from "../../../domain/video/entities/creator";
import { CredentialType } from "../../../domain/auth/entities/credential";

export type AddCreatorParams = {
    creator: CreatorParams,
    credential: {
        credentialType?: CredentialType,
        credentialValue: string
    }
}
