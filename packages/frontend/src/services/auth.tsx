import AxiosClient from "../axios";
import { APIOkSingleResponse, Creator } from "../types";

export interface CreatorParams {
    name: string
    email: string
}

export interface CredentialParams {
    credentialType: "password",
    credentialValue: string
}

export interface RegisterParams {
    creator: CreatorParams,
    credential: CredentialParams
}

export interface LoginParams {
    email: string;
    password: string;
}

export function getJwtToken() {
    return sessionStorage.getItem("jwt")
}

export function setJwtToken(token: string) {
    sessionStorage.setItem("jwt", token)
}

export interface SessionToken {
    accessToken: string;
    refreshToken: string;
    expiredAt: string;
}

export const register = async (params: RegisterParams): Promise<APIOkSingleResponse<Creator>> => {
    return (await AxiosClient.post<APIOkSingleResponse<Creator>>("/user", params)).data;
}

export const login = async (params: LoginParams): Promise<APIOkSingleResponse<SessionToken>> => {
    const sessionToken = (await AxiosClient.post<APIOkSingleResponse<SessionToken>>("user/login", params)).data;
    setJwtToken(sessionToken.data.accessToken);
    return sessionToken;
}
