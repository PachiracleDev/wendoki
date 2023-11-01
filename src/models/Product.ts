export interface Product {
	nombre: string;
	precio: number;
	imagenes: string[];
	descripcion: string;
	categoria: string;
	stock: number;
	descuento: number;
	fechaDescuento: string | null;
	slug: string;
	color: string;
	marca: string;
	subcategoria: string;
	destacado: string;
}

export interface ProductCart extends Product {
	cantidad: number;
}
