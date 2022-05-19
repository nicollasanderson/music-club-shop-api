import AppDataSource from "../../data-source";
import Order from "../../entities/order.entity";
import { Product } from "../../entities/product.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const cartAddProdService = async (product_id: string, userEmail: string) => {
  const fixedFloat = (value: number) => {
    return Number.parseFloat(value.toFixed(2));
  };
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email: userEmail,
    },
  });

  const cartRepository = AppDataSource.getRepository(Order);

  const cart = await cartRepository.findOne({
    where: {
      id: user?.cart.id,
    },
  });

  const productRepository = AppDataSource.getRepository(Product);

  const productToAdd = await productRepository.findOne({
    where: {
      id: product_id,
    },
  });

  if (!productToAdd) {
    throw new AppError(404, "Product not found");
  }

  if (cart && productToAdd) {
    if (
      cart.products.filter((prod) => prod.name === productToAdd.name).length > 0
    ) {
      throw new AppError(409, "Product is already in the cart");
    }

    cart.products = [...cart.products, productToAdd];
    cart.total = fixedFloat(cart.total + productToAdd.price);

    await cartRepository.save(cart);

    return cart;
  }
};

export default cartAddProdService;
