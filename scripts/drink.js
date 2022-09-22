export default class Drink {
	constructor(name, image, description, price, order) {
		this.name = name;
		this.image = image;
		this.description = description;
		this.price = price;
		this.element = null;
		this.order = order;

		this.draw();
		this.setup();
	}

	setup() {
		this.element?.addEventListener("click", () => {
			this.select();

			this.order.drink = { name: this.name, price: this.price };

			this.verifyOrder();
		});
	}

	select() {
		const selected = document.querySelector(".bebida .selecionado");
		if (selected) {
			selected.classList.remove("selecionado");
		}

		this.element?.classList.add("selecionado");
	}

	draw() {
		const drink = this.build();

		const drinkSection = document.querySelector(".opcoes.bebida");
		drinkSection.append(drink);

		this.element = drink;
	}

	build() {
		const innerHTML = `
        <img src="${this.image}" />
        <div class="titulo">${this.name}</div>
        <div class="descricao">${this.description}</div>
        <div class="fundo">
            <div class="preco">R$ ${this.price.toFixed(2)}</div>
            <div class="check">
                <ion-icon name="checkmark-circle"></ion-icon>
            </div>
        </div>
    `;

		const drink = document.createElement("div");
		drink.classList.add("opcao");
		drink.innerHTML = innerHTML;

		return drink;
	}

	verifyOrder() {
		const orderBtn = document.querySelector(".fazer-pedido");
		if (this.order.dish && this.order.drink && this.order.dessert) {
			orderBtn.classList.add("ativo");
			orderBtn.disabled = false;
			orderBtn.innerHTML = "Fazer Pedido";
		}
	}
}
