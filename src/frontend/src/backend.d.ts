import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    name: string;
}
export interface BirthdayContact {
    name: string;
    birthDay: bigint;
    birthMonth: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addContact(contact: BirthdayContact): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteContact(contactName: string): Promise<void>;
    getAllContacts(user: Principal): Promise<Array<BirthdayContact>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listContacts(): Promise<Array<BirthdayContact>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
