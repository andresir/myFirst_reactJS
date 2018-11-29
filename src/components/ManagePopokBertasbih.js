import React, { Component } from 'react';
import axios from 'axios';
import '../support/bunting.css';

class ManagePopokBertasbih extends Component {

    state = { listPopok: [] }

    componentDidMount() {
        this.getPopokList();
    }

    getPopokList = () => {
        axios.get('http://localhost:1997/popok')
        .then((res) => {
            this.setState({ listPopok: res.data })
        }).catch((err) => {
            console.log(err)
        })
    }

    onBtnAddClick = () => {
        var nama = this.refs.namaAdd.value;
        var merk = this.refs.merkAdd.value;
        var harga = this.refs.hargaAdd.value;
        var img = this.refs.imgAdd.value;
        var description = this.refs.descAdd.value;

        axios.post('http://localhost:1997/popok', {
            nama, merk, harga, img, description
        }).then((res) => {
            this.getPopokList();
        }).catch((err) => {
            console.log(err)
        })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Yakin nih bro?')){
            axios.delete('http://localhost:1997/popok/' + id)
                .then((res) => {
                    this.getPopokList();
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    renderBodyPopok = () => {
        var listJSXPopok = this.state.listPopok.map(({ id, nama, merk, description, harga, img}) => {
            return (
                <tr>
                    <td>{id}</td>
                    <td>{nama}</td>
                    <td>{merk}</td>
                    <td>{harga}</td>
                    <td><img src={img} width="50px" alt={id}/></td>
                    <td>{description}</td>
                    <td><input className="btn btn-primary" type="button" value="Edit" /></td>
                    <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick(id)} /></td>
                </tr>
            )
        })
        return listJSXPopok;
    }

    render(){
        return (
            <div className="container-fluid">
                <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2 className="section-heading text-uppercase">MANAGE POPOK</h2>
                            
                            </div>
                            </div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nama</th>
                            <th>Merk</th>
                            <th>Harga</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBodyPopok()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td><input ref="namaAdd" type="text" placeholder="Nama Produk" /></td>
                            <td>
                                <select ref="merkAdd">
                                    <option>Bronson</option>
                                    <option>Uchiha</option>
                                    <option>Bunting</option>
                                </select>
                            </td>
                            <td><input ref="hargaAdd" type="number" placeholder="Harga Produk" /></td>
                            <td><input ref="imgAdd" type="text" placeholder="Image URL" /></td>
                            <td>
                                <textarea ref="descAdd" placeholder="Enter The Description Here..."></textarea>
                            </td>
                            <td><input type="button" className="btn btn-success" value="Add" onClick={this.onBtnAddClick}/></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

export default ManagePopokBertasbih;