"use server"

import { signIn } from "auth/auth";
import { IFormData } from "interfaces/IFormData";

export async function signInWithCredentials(formData: IFormData) {
    const { email, password } = formData

    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false
        });

        console.log("[signInWithCredentials] Result:", {
            error: result?.error,
            status: result?.status,
            url: result?.url
        });

        return result
    } catch (error) {
        console.log("Ошибка авторизации:", error);
        return { error: "Ошибка при авторизации" };
    }
}