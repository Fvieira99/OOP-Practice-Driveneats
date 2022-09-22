export default class Dish {
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

			this.order.dish = { name: this.name, price: this.price };

			this.verifyOrder();
		});
	}

	select() {
		const selected = document.querySelector(".prato .selecionado");
		if (selected) {
			selected.classList.remove("selecionado");
		}

		this.element?.classList.add("selecionado");
	}

	draw() {
		const dish = this.build();

		const dishSection = document.querySelector(".opcoes.prato");
		dishSection.append(dish);

		this.element = dish;
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

		const dish = document.createElement("div");
		dish.classList.add("opcao");
		dish.innerHTML = innerHTML;

		return dish;
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
