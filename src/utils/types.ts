import { Request } from "express"

export interface RequestAuth extends Request {
    user: {
        role: string
        _id: string
    }
}