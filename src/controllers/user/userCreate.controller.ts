import { Request, Response } from "express";
import userCreateService from "../../services/user/userCreate.service";
import "express-async-errors";
import { AppError, handleError } from "../../errors/AppError";
import { instanceToPlain } from "class-transformer";

const userCreateController = async (req: Request, res: Response) => {
  try {
    
    const { name, email, user_name, birth_date, password, is_adm,tel } = req.body;
  

    if(process.env.NODE_ENV === "test"){
      const newUser = await userCreateService({
        name,
        email,
        user_name,
        birth_date,
        password,
        is_adm,
        tel
      });
      return res.status(201).send(instanceToPlain(newUser));
    }
    else{
      const newUser = await userCreateService({
        name,
        email,
        user_name,
        birth_date,
        password,
        tel
      });
      return res.status(201).send(instanceToPlain(newUser));

    }

  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userCreateController;
