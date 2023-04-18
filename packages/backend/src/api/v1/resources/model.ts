import { CreatorParams } from "../../../domain/video/entities/creator";
import { CredentialType } from "../../../domain/auth/entities/credential";
import { VideoParams } from "../../../domain/video/entities/video";

export type AddCreatorParams = {
    creator: CreatorParams,
    credential: {
        credentialType?: CredentialType,
        credentialValue: string
    }
}

export type LoginParams = {
    email: string,
    credentialType: CredentialType,
    challenge: string
}

export type CreateVideoParams = Omit<VideoParams, "creatorId">;
