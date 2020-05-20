const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];
const { products } = require('../src/data/products');
//etShoppingCart([120, 230, 310, 490], products);
function getShoppingCart(ids, productsList) {
	let productsSelected = [];
	let priceRegular, priceThatDescount;
	let cart = {
		products: [],
		promotion: '',
		totalPrice: '',
		discountValue: '',
		discount: ''
	};
	productsSelected = productSelected(ids, productsList);
	cart.products = productSelectedAdd(productsSelected);
	cart.promotion = definePromotion(productsSelected);
	priceRegular = defineRegularPrice(productsSelected);
	priceThatDescount = defineTotalPriceReal(productsSelected, cart.promotion);
	cart.totalPrice = priceThatDescount.toFixed(2).toString();

	cart.discountValue = (priceRegular - priceThatDescount).toFixed(2).toString();

	let percent = (((priceRegular - priceThatDescount)/priceRegular)*100).toFixed(2);

	cart.discount = percent+"%";
	//console.log(cart);
	return cart;
}
function definePromotion(products){
	let categorys = [];
	products.forEach(product => {
		categorys.push(product[0].category);
	});
	let contaCategori = [0,0,0,0];
	categorys.forEach(category => {
		if(category == "T-SHIRTS"){
			contaCategori[0]++;
			}else if (category == "PANTS"){
				contaCategori[1]++;
				}else if(category == "SHOES"){
					contaCategori[2]++;
					}else if(category == "BAGS"){
						contaCategori[3]++;
					}
	});
	let zeros = 0;
	let sumProduct = contaCategori[0]+contaCategori[1]+contaCategori[2]+contaCategori[3];
	contaCategori.forEach(category=>{
		if(category == 0){
			zeros++;
		}
	});
	if(contaCategori.indexOf(4)>=1){
		return promotions[3];
		}else if(zeros == 1){
			return promotions[2];
			}else if(zeros == 2){
				return promotions[1];
				}else if(zeros == 3){
					return promotions[0];
				}else if(sumProduct==4){
					return promotions[3];
				}
}
function productSelected(ids, productsList){
	let products = [];
	ids.forEach(id => {
		let product = productsList.filter(prod => prod.id == id);
		products.push(product);
	});
	return products;
}
function productSelectedAdd(productSelected){
	let products = [];
	productSelected.forEach(product => {
		products.push({
			name : product[0].name,
			category : product[0].category 
		});
	});
	return products;
}
function defineRegularPrice(productSelected){
	let valorTotal = 0;
	productSelected.forEach(product => {
		valorTotal += product[0].regularPrice;
	});
	return valorTotal;
}
function defineTotalPriceReal(productSelected, promotionActived){
	let valorTotal = 0;
	productSelected.forEach(product => {
		let aux = product[0].promotions.length-1;
		let somado = false;
		product[0].promotions.filter((promotion,index)=>{
			if(promotion.looks.indexOf(promotionActived)>=0){
				somado = true;
				valorTotal += promotion.price;
			}else if((somado == false)&&(aux == index)){
				valorTotal += product[0].regularPrice;
			}
		},0);
	});
	return valorTotal;
}
module.exports = { 
	getShoppingCart
};
