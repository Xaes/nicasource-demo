export interface APIOkSingleResponse<T> {
    data: T;
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
