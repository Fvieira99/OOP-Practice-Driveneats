import Dish from "./dish.js";
import Drink from "./drink.js";
import Dessert from "./dessert.js";
import Order from "./order.js";

const dishes = [
	{
		nome: "Estrombelete de Frango",
		imagem: "img/frango_yin_yang.png",
		descricao: "Um pouco de batata, um pouco de salada",
		preco: 14.9,
	},
	{
		nome: "Asa de Boi",
		imagem: "img/frango_yin_yang.png",
		descricao: "Com molho shoyu",
		preco: 14.9,
	},
	{
		nome: "Carne de Monstro",
		imagem: "img/frango_yin_yang.png",
		descricao: "Com batata assada e farofa",
		preco: 14.9,
	},
];
const drinks = [
	{
		nome: "Coquinha gelada",
		imagem: "img/coquinha_gelada.png",
		descricao: "Lata 350ml",
		preco: 4.9,
	},
	{
		nome: "Caldo de Cana",
		imagem: "img/coquinha_gelada.png",
		descricao: "Copo 600ml",
		preco: 4.9,
	},
	{
		nome: "Corote Gelado",
		imagem: "img/coquinha_gelada.png",
		descricao: "Garrafa 400ml",
		preco: 4.9,
	},
];

const desserts = [
	{
		nome: "Pudim",
		imagem: "img/pudim.png",
		descricao: "Gosto de doce de leite",
		preco: 7.9,
	},
	{
		nome: "Flam",
		imagem: "img/pudim.png",
		descricao: "Gosto de chocolate",
		preco: 7.9,
	},
	{
		nome: "Brigadeiro",
		imagem: "img/pudim.png",
		descricao: "3 unidades",
		preco: 7.9,
	},
];

window.onload = () => {
	const order = new Order();

	generateDishes(order);
	generateDrinks(order);
	generateDesserts(order);

	const confirmBtn = document.querySelector(".confirmar");
	const cancelBtn = document.querySelector(".cancelar");
	const orderBtn = document.querySelector(".fazer-pedido");

	confirmBtn.addEventListener("click", () => {
		enviarZap(order);
	});

	cancelBtn.addEventListener("click", () => {
		cancelarPedido(order);
	});

	orderBtn.addEventListener("click", () => {
		confirmarPedido(order);
	});
};

function generateDishes(order) {
	dishes.forEach((dish) => {
		new Dish(dish.nome, dish.imagem, dish.descricao, dish.preco, order);
	});
}

function generateDrinks(order) {
	drinks.forEach((drink) => {
		new Drink(drink.nome, drink.imagem, drink.descricao, drink.preco, order);
	});
}

function generateDesserts(order) {
	desserts.forEach((dessert) => {
		new Dessert(
			dessert.nome,
			dessert.imagem,
			dessert.descricao,
			dessert.preco,
			order
		);
	});
}

function getPrecoTotal(order) {
	return order.dish.price + order.drink.price + order.dessert.price;
}

function confirmarPedido(order) {
	const modal = document.querySelector(".overlay");
	modal.classList.remove("escondido");

	console.log(order.dish);

	document.querySelector(".confirmar-pedido .prato .nome").innerHTML =
		order.dish.name;
	document.querySelector(".confirmar-pedido .prato .preco").innerHTML =
		order.dish.price.toFixed(2);

	document.querySelector(".confirmar-pedido .bebida .nome").innerHTML =
		order.drink.name;
	document.querySelector(".confirmar-pedido .bebida .preco").innerHTML =
		order.drink.price.toFixed(2);

	document.querySelector(".confirmar-pedido .sobremesa .nome").innerHTML =
		order.dessert.name;
	document.querySelector(".confirmar-pedido .sobremesa .preco").innerHTML =
		order.dessert.price.toFixed(2);

	document.querySelector(".confirmar-pedido .total .preco").innerHTML =
		getPrecoTotal(order).toFixed(2);
}

function cancelarPedido() {
	const modal = document.querySelector(".overlay");
	modal.classList.add("escondido");
}

function enviarZap(order) {
	const telefoneRestaurante = 553299999999;
	const encodedText = encodeURIComponent(
		`Olá, gostaria de fazer o pedido: \n- Prato: ${
			order.dish.name
		} \n- Bebida: ${order.drink.name} \n- Sobremesa: ${
			order.dessert.name
		} \nTotal: R$ ${getPrecoTotal(order).toFixed(2)}`
	);

	const urlWhatsapp = `https://wa.me/${telefoneRestaurante}?text=${encodedText}`;
	window.open(urlWhatsapp);
}
