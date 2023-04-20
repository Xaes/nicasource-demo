export interface APIOkSingleResponse<T> {
    data: T;
    statusCode: number;
}

export interface APIErrorResponse {
    errorName: string;
    errorMessage: string;
    statusCode: number;
}

export interface APIOkMultipleResponse<T> {
    data: T[];
    statusCode: number;
}

export interface EntityAttributes {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface Creator extends EntityAttributes {
    name: string;
    email: string;
}

export interface Video extends EntityAttributes {
    title: string;
    description: string;
    publishedAt?: Date;
    isPublished: boolean;
    videoUrl: string;
    creatorId: string;
    creator: Creator
}

export interface CreateVideoParams {
    title: string;
    description: string;
    videoUrl: string;
}

export interface UpdateVideoParams {
    id: string;
    title: string;
    description: string;
}
