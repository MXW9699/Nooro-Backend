import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { StatusCodes } from "http-status-codes";
import { Response } from "express";

export function handleError(error: unknown, res: Response){
    console.log(error)
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.meta?.cause || error.message });
    } else if (error instanceof TypeError){
      res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'unknown error has occurred' });
    }
  };