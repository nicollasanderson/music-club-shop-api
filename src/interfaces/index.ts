import { GeneratedIdentifierFlags } from "typescript";
import { boolean } from "yup";

export interface IAddressCreate {
  user_id: string;
  street: string;
  number: number;
  cep: string;
  neighborhood: string;
  country: string;
  complement: string;
}

export interface IUserCreate {
  name: string;
  email: string;
  user_name: string;
  birth_date: string;
  password: string;
  is_adm?: boolean
}

export interface IUserId {
  name: string;
  email: string;
  user_name: string;
  birth_date: string;
  password: string;
  id?: string;
}

export interface IUserLogin {
  email?: string;
  user_name?: string;
  password: string;
}

export interface UserDataParams {
  id: string;
}

export interface UserDataParamsUp {
  id: string;
  name?: string;
  email?: string;
  user_name?: string;
  birth_date?: string;
  password?: string;
  is_adm?: boolean;
}

export interface IAddressUpdate {
  id: string;
  street: string;
  number: number;
  cep: string;
  neighborhood: string;
  country: string;
  complement: string;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  img_url: string;
  type: string;
  quantity_stock: number;
  rating: number;
  label: string;
}

export interface IProductId {
  name: string;
  price: number;
  img_url: string;
  type: string;
  quantity_stock: number;
  rating: number;
  label: string;
  id?: string;
}

export interface ICreateProduct {
  name: string;
  price: number;
  img_url: string;
  type: string;
  quantity_stock: number;
  rating: number;
  label: string;
}
export interface IToken{
  email: string;
  is_adm: boolean;
  sub: string;
}