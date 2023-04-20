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
    return sessionStorage.getItem("jwt");
}

export function setJwtToken(token: string) {
    sessionStorage.setItem("jwt", token);
}

export interface SessionToken {
    accessToken: string;
    refreshToken: string;
    expiredAt: string;
}

export interface LoginResponse {
    session: SessionToken,
    creator: Creator
}

export const isLoggedIn = (): boolean => !!getJwtToken();

export const register = async (params: RegisterParams): Promise<APIOkSingleResponse<Creator>> => {
    return (await AxiosClient.post<APIOkSingleResponse<Creator>>("/user", params)).data;
};

export const login = async (params: LoginParams): Promise<APIOkSingleResponse<LoginResponse>> => {
    const sessionToken = (await AxiosClient.post<APIOkSingleResponse<LoginResponse>>("user/login", params)).data;
    setJwtToken(sessionToken.data.session.accessToken);
    AxiosClient.defaults.headers.common["Authorization"] = `Bearer ${sessionToken.data.session.accessToken}`;
    return sessionToken;
};

export const logout = (): void => {
    sessionStorage.removeItem("jwt");
    AxiosClient.defaults.headers.common["Authorization"] = undefined;
};
