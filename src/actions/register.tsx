"use server"

import { IFormData } from "interfaces/IFormData";
import { saltAndHashPassword } from "utils/password";
import prisma from "utils/prisma";

export async function registerUser(formData: IFormData) {
    const { email, password, confirmPassword } = formData

    if (!email || !password) {
        return { error: "Wrong credentials" }
    }

    if (password !== confirmPassword) {
        return { error: "Passwords aren't the same" };
    }

    if (password.length < 6) {
        return { error: "Password must be longer then 6 symbols" }
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return { error: "This email is already used" }
        }

        const pwHash = await saltAndHashPassword(password)

        const user = await prisma.user.create({
            data: {
                email: email,
                password: pwHash
            }
        })

        return user
    } catch (error) {
        console.log(error)
    }
}