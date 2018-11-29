import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
// import PopokListBertasbih from './PopokItemBertasbih';
import PopokItemBertasbih from './PopokItemBertasbih';

class PopokListBertasbih extends Component {
    state = { listPopok: [] }

    componentDidMount() {
        axios.get('http://localhost:1997/popok')
            .then((res) => {
                this.setState({ listPopok: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    renderListPopok = () => {
        var listJSXPopok = this.state.listPopok.map((item) => {
            return (
                <PopokItemBertasbih popok={item} />
            )
        })
        return listJSXPopok;
    }

    render() {

        if(this.props.username !== "" ){
            return (
                <div>
                    <section className="bg-light" id="portfolio">
                        <div className="container-fluid">
                            <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2 className="section-heading text-uppercase">List Popok</h2>
                                <h3 className="section-subheading text-muted">Best popok in town.</h3>
                            </div>
                            </div>
                            <div className="row">
                                   {this.renderListPopok()}
                            </div>
                        </div>
                    </section>
                </div>
            );
        }

        return <Redirect to='/login'/>
        
    }
}

const mapStateToProps = (state) => {
    return { username: state.auth.username }
}

export default connect(mapStateToProps) (PopokListBertasbih);