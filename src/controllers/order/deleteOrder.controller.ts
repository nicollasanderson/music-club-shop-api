import { AppError, handleError } from "../../errors/AppError";
import { Request, Response } from "express";
import orderDeleteService from "../../services/order/deleteOrder.service";
import { instanceToPlain } from "class-transformer";

const orderDeleteController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const order = await orderDeleteService(id);

    return res.status(204).json({ message: "Order deleted with sucess!" });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default orderDeleteController;