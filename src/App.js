import React , {Component } from 'react';
import './App.css';

import AddProduct from './AddProduct.js';
import ProductItem from './ProductItem.js';

const products = [
  {
    name : 'Adobe Subscription',
    price: 3000
  },
  {
    name: 'Courses',
    price: 10000
  }
];
 
//Stroring products array in local Storage.
localStorage.setItem('products',JSON.stringify(products));

class App extends Component {
  constructor(props){
    super(props);

    this.state ={
      products: JSON.parse(localStorage.getItem('products'))
    };
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  componentDidMount(){
    const products = this.getproducts();
    this.setState({ products});
  }
  getproducts(){
    return this.state.products
  }
  onAdd(name, price){
   const products  = this.getproducts();

   products.push({
     name,
     price
   })
    this.setState({ products });
  }
  onDelete(name){
    const products = this.getproducts();
    const filteredProducts = products.filter(product =>{
      return product.name !== name;
     
    })
    this.setState({products : filteredProducts});
  }
  onEditSubmit(name,price, originalName){
    let products = this.getproducts();

    products = products.map(product =>{
      if(product.name === originalName){
        product.name = name;
        product.price = price;
      }
      return product;
    });
    this.setState({products});
  }
render(){
  return (
    <div className="App">
     <h1>Wishlist</h1>

     <AddProduct
     onAdd={this.onAdd}
     />
     {
       //mapping the products from array 
       this.state.products.map(product => {
         return(
          <ProductItem 
          key={product.name}
          name={product.name}
          price={product.price}
          onDelete={this.onDelete}
          onEditSubmit={this.onEditSubmit}
          />
         );
       }
       )
     }
    </div>
  );
}
}

export default App;
