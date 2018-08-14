import React, { Component } from "react";
import { connect } from "react-redux";
import * as ReactBootstrap from "react-bootstrap";
import Pagination from "react-js-pagination";
const Loader=require("react-loader");

import { bindActionCreators } from "redux";
import { getData,addCartData } from "../actions";
import { applyPriceFilter,applyCategoryFilter } from "../../api";

class Card extends Component {
    constructor(props){
        super(props);
        this.state={
            cart_data:[],
            show:false,
            displayData : [],
            category:['CL','Jetta','Allroad','Accent','Civic','Mazda6','RX-7','Sportage','Sierra'],
            activePage:1,
            loaded : false
        }
        this.onCardClick = this.onCardClick.bind(this);
        this.showCart = this.showCart.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.change=this.change.bind(this);
        this.onPageClick=this.onPageClick.bind(this);
    }

    componentDidMount(){
        this.props.getData(1);
        
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
        console.log("price data",price_data);
        applyPriceFilter(price_data)
        .then(res=>{
            const filter_data=res.data;
            this.setState({
                displayData:filter_data
            })
        })
   }

    change(event){
        event.preventDefault();
        /* const tmp = this.state.displayData.slice();
        const filter=tmp.filter(product=>(
            product.Category == event.target.value
        ))
        this.setState({
            displayData:filter
        }); */
        applyCategoryFilter(event.target.value)
        .then(res => {
            const filter_data = res.data;
            this.setState({
                displayData:filter_data
            })
        })
    }

    onPageClick (pageNum){
        this.setState({
            activePage:pageNum
        })
        this.props.getData(this.state.activePage);
    }

    handleClose() {
        this.setState({ show: false });
    }

    componentWillReceiveProps(newProps){
        const a = newProps.data;
        console.log("props",newProps.data)
        setTimeout(
            this.setState({
                displayData:a,
                loaded:true
            }),10000
        )
    }

    render() {
        return (
            <div className="Card row">
                <Loader loaded={this.state.loaded} className="spinner"></Loader>
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
                        </label>
                        <input type="submit" className="submit-price-button"/>
                    </form>
                </span>
                <div className="col-md-12">
                    {
                        this.state.displayData ?  (
                            this.state.displayData.map((item,key)=>{
                                return (
                                    <div className="card" key = {key}>
                                        <img className="card-img-top" src={item.url} alt="Card image cap" width="200" height="150"/>
                                        <div className="card-body">
                                            <h5 className="card-title">{item.Title}</h5>
                                            <p className="card-text">
                                                Category :{item.Category}<br/>
                                                Price: {item.Price}
                                            </p>
                                            <button className="btn btn-success cart_button" onClick={ () => this.onCardClick(item.id)} value={item.id}>
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                )
                            })    
                        ) :  (
                                <div> No more result</div>
                        )       
                    }
                </div>
               
                <div className="cart-item">
                    <span className="cart">
                        {this.props.cart.length}
                    </span>
                    <span className="glyphicon glyphicon-shopping-cart" onClick={this.showCart} ></span>
                </div>
                <div>
                     <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={20}
                        totalItemsCount={1000}
                        pageRangeDisplayed={5}
                        onChange={this.onPageClick}
                        />                    
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
