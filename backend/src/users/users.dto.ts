export interface IUserDTO {
	id?: number,
  name: string,
	email: string,
	password: string,
  cpf?: string,
  cnpj: string,
	phone: string,
	gender: string,
	birth: number,
	cep: string,
	address: string,
	number: number,
	complement: string,
	referency: string,
	neighborhood: string,
	city: string,
	state: string 
}

export interface IUserUpdateDTO {
	id?: number,
  name?: string,
	email?: string,
	password?: string,
  cpf?: string,
  cnpj?: string,
	phone?: string,
	gender?: string,
	birth?: number,
	cep?: string,
	address?: string,
	number?: number,
	complement?: string,
	referency?: string,
	neighborhood?: string,
	city?: string,
	state?: string 
}