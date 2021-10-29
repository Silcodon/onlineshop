import React, { Component } from "react";
import withContext from "../withContext";
import { Redirect } from "react-router-dom";
import axios from 'axios';

const initState = {
  name: "",
  price: "",
  stock: "",
  shortDesc: "",
  description: "",
  image: null
};

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  save = async (e) => {
    e.preventDefault();
    const { name, price, stock, shortDesc, description, image} = this.state;

    if (name && price) {
      const id = Math.random().toString(36).substring(2) + Date.now().toString(36);

      await axios.post(
        'http://localhost:3001/products',
        { id, name, price, stock, shortDesc, description, image},
      )

      this.props.context.addProduct(
        {
          name,
          price,
          shortDesc,
          description,
          stock: stock || 0,
          image
        },
        () => this.setState(initState)
      );
      this.setState(
        { flash: { status: 'is-success', msg: 'Produto adicionado com sucesso!' }}
      );

    } else {
      this.setState(
        { flash: { status: 'is-danger', msg: 'Insira nome e preço do produto!' }}
      );
    }
  };

  onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
	const base64 = await this.convertToBase64(img);
      this.setState({
        image: base64
      });
    }
  };

  remove = e => {
  	this.setState({
  		image: null
  	})
  	
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  render() {
    const { name, price, stock, shortDesc, description } = this.state;
    const { user } = this.props.context;

    return !(user && user.accessLevel < 1) ? (
      <Redirect to="/" />
    ) : (
      <>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Adicionar Produto</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.save}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
             <div className="field">
                <label className="label">Foto do Produto: </label>
                {this.state.image && (
            	<img src={this.state.image} />)}
            	{this.state.image ? (
            	<div class="control">
                <button
                  className="button is-primary is-pulled-down"
                  type="submit"
                  onClick={this.remove}
                >
                  Remover Foto
                </button>
                </div>
              	):(
              	<div class="file is-primary">
  				<label class="file-label">
              	<input class="file-input" type="file" name="image" accept=".jpeg, .png, .jpg" onChange={this.onImageChange} />
              	<span class="file-cta">
			      <span class="file-label">
			        Adicionar Foto
			      </span>
			    </span>
			  </label>
			</div>
            	)}
            	
            	
         	</div>
              <div className="field">
                <label className="label">Nome do Produto: </label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Preço: </label>
                <input
                  className="input"
                  type="number"
                  name="price"
                  value={price}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Disponibilidade em Stock: </label>
                <input
                  className="input"
                  type="number"
                  name="stock"
                  value={stock}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Descrição curta: </label>
                <input
                  className="input"
                  type="text"
                  name="shortDesc"
                  value={shortDesc}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Descrição: </label>
                <textarea
                  className="textarea"
                  type="text"
                  rows="2"
                  style={{ resize: "none" }}
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                />
              </div>
              {this.state.flash && (
                <div className={`notification ${this.state.flash.status}`}>
                  {this.state.flash.msg}
                </div>
              )}
              <div className="field is-clearfix">
                <button
                  className="button is-primary is-outlined is-pulled-right"
                  type="submit"
                  onClick={this.save}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default withContext(AddProduct);