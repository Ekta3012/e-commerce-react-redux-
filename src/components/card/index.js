import React, { Component } from "react";
import { connect } from "react-redux";
import * as ReactBootstrap from "react-bootstrap";

import { bindActionCreators } from "redux";
import { getData,addCartData } from "../actions";

class Card extends Component {
    constructor(props){
        super(props);
        this.state={
            cart_data:[],
            show:false,
            displayData : [],
            category:['CL','Jetta','Allroad','Accent','Civic','Mazda6','RX-7','Sportage','Sierra'],
            currentPage:1,
            perPageItem:20
        }
        this.onCardClick = this.onCardClick.bind(this);
        this.showCart = this.showCart.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.change=this.change.bind(this);
        this.handlePageChange=this.handlePageChange.bind(this);
    }
    componentDidMount(){
        this.props.getData();
    }

    onCardClick (id) {
        this.props.addCartData(id);
    }

    showCart(){
        const cartItems = [];
        this.props.cart.map((item)=>{
            cartItems.push(this.props.data[item]);
        });

        this.setState({
            show:true,
            cart_data : [...cartItems]
        })
    }

    formToJSON(elements) {
        return [].reduce.call(elements, (data, element) => {
           data[element.name] = element.value;
           return data;
        }, {});
    }

    handleSubmit(e){
        e.preventDefault();
        const price_data=this.formToJSON(e.target.elements);

        const tmp = this.state.displayData.slice();
        const filter=tmp.filter(product => (
            parseInt(product.Price.replace("$","")) >  price_data.minimum &&
            parseInt(product.Price.replace("$","")) <=  price_data.maximum
        ));

        this.setState({
            displayData: filter
        });        
   }

    change(event){
        event.preventDefault();
        const tmp = this.state.displayData.slice();
        const filter=tmp.filter(product=>(
            product.Category == event.target.value
        ))

        this.setState({
            displayData:filter
        });

    }

    handlePageChange(event){
        event.preventDefault();
        this.setState({currentPage:Number(event.target.id)});
    }

    handleClose() {
        this.setState({ show: false });
      }

    componentWillReceiveProps(newProps){
        const a = newProps.data;
        this.setState({
            displayData:a
        })
    }
    render() {
            const { currentPage,perPageItem,displayData } =this.state; 
            const indexOfLastItem=currentPage*perPageItem;
            const indexOfFirstItem=indexOfLastItem-perPageItem;
            const currentItem = displayData.slice(indexOfFirstItem,indexOfLastItem);

            const renderItem = currentItem.map((item,index)=>{
                return (
                    <div className="card" key = {index}>
                        <img className="card-img-top" src={item.url} alt="Card image cap" width="200" height="150"/>
                        <div className="card-body">
                            <h5 className="card-title">{item.Title}</h5>
                            <p className="card-text">
                                Category :{item.Category}<br/>
                                Price: {item.Price}
                            </p>
                            <button className="btn btn-success cart_button" onClick={ () => 
                                this.onCardClick(item.id)
                                } value={item.id}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                )
            })

            const pageNumbers=[];
            for(let i=1;i<=Math.ceil(displayData.length/perPageItem);i++)
            {
                pageNumbers.push(i);
            }

            const renderPageNumbers=pageNumbers.map(number=>{
                return (
                    <button
                        key={number}
                        id={number}
                        onClick={this.handlePageChange}
                        className="pagination-button">   {number}
                    </button>
                )
            });


        return (
            <div className="Card row">
                <span className="type col-sm-4">
                    <h5 className="select-heading">Select the type : </h5>
                    <select onChange={this.change} className="select"> 
                        {
                            this.state.category.map((item,key)=>{
                               return(
                                <option key={key} value={item}>{item}</option>
                               ) 
                            })
                        }
                    </select>
                </span>
                <span className="price col-sm-8">
                    <form onSubmit={this.handleSubmit}>
                        Min : &nbsp; <input type="text" name="minimum" className="input-price"/> 
                        Max : &nbsp;<input type="text" name="maximum" className="input-price"/>
                        <label>
                            <img src=""/>
                        </label>
                        <input type="submit" className="submit-price-button"/>
                    </form>
                </span>
                <div className="cart-item">
                    <span className="cart">
                        {this.props.cart.length}
                    </span>
                    <span className="glyphicon glyphicon-shopping-cart" onClick={this.showCart} ></span>
                </div>
                
                    {renderItem}
                <div id="page-numbers">
                    {renderPageNumbers}
                </div>

                <ReactBootstrap.Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <ReactBootstrap.Modal.Header closeButton>
                        <ReactBootstrap.Modal.Title id="contained-modal-title">
                            Cart Item
                        </ReactBootstrap.Modal.Title>
                    </ReactBootstrap.Modal.Header>
                    <ReactBootstrap.Modal.Body>
                        <ul className="cartList">
                            {
                                this.state.cart_data.map((item,key)=>{
                                    return (
                                        <li key={item.id}>
                                            <img src={item.url} width="180" height="100"/>
                                            <h4>Category : {item.Category}</h4>
                                            <h4>Title : {item.Title}</h4>
                                            <h5>Price: {item.Price}</h5>
                                        </li>
                                    )
                                }) 
                            }
                        </ul>
                    </ReactBootstrap.Modal.Body>
                    <ReactBootstrap.Modal.Footer>
                        <ReactBootstrap.Button onClick={this.handleClose}>Close</ReactBootstrap.Button>
                    </ReactBootstrap.Modal.Footer>
                </ReactBootstrap.Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) =>  ({
    data:state.data,
    cart:state.cart
});

const mapDispatchToProps = (dispatch) => ({
    getData : bindActionCreators(getData,dispatch),
    addCartData: bindActionCreators(addCartData,dispatch),
});

export default connect(mapStateToProps,mapDispatchToProps)(Card);





