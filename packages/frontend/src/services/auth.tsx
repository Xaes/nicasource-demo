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
    challenge: string;
    credentialType?: "password";
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

export const isLoggedIn = (): boolean => !!getJwtToken()

export const register = async (params: RegisterParams): Promise<APIOkSingleResponse<Creator>> => {
    return (await AxiosClient.post<APIOkSingleResponse<Creator>>("/user", params)).data;
}

export const login = async (params: LoginParams): Promise<APIOkSingleResponse<SessionToken>> => {
    const sessionToken = (await AxiosClient.post<APIOkSingleResponse<SessionToken>>("user/login", params)).data;
    setJwtToken(sessionToken.data.accessToken);
    AxiosClient.defaults.headers.common["Authorization"] = `Bearer ${getJwtToken()}`;
    return sessionToken;
}

export const logout = (): void => {
    sessionStorage.removeItem("jwt");
    AxiosClient.defaults.headers.common["Authorization"] = undefined;
}
