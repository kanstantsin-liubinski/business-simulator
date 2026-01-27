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
            ok: result?.ok,
            error: result?.error,
            status: result?.status
        });

        return result
    } catch (error) {
        console.log("Ошибка авторизации:", error);
        throw error
    }
}