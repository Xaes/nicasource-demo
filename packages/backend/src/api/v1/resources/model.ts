import { Creator, CreatorParams } from "../../../domain/video/entities/creator";
import { CredentialType } from "../../../domain/auth/entities/credential";
import { UpdateVideoParams, VideoParams } from "../../../domain/video/entities/video";
import { SessionToken } from "../../../domain/auth/entities/sessiontoken";

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

export type CreatorIdParam = { creatorId: string };

export type CreateVideoParams = Omit<VideoParams, "creatorId">;

export type VideoIdParam = { videoId: string };

export type PatchVideoParams = UpdateVideoParams;

export type LoginResponse = {
    session: SessionToken;
    creator: Creator;
}
