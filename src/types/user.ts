type Role = 'user' | 'admin'

export type User   = {
    id:string;
    name: string;
    email: string;
    role: Role;
    createdAt: string;
}

export type UserRegister = {
    name:string,
    email:string,
    password:string,
}


export type UserResponse = {
    accessToken: string;
    user: User
}