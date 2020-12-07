import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Navbar from '../main/Navbar'
import Footer from '../main/Footer';

import Spinner from '../common/Spinner';

import TextField from '../input/TextField';
import TextArea from '../input/TextArea';

import { jobs_get_all } from '../../actions/jobsActions';

class Jobs extends Component {

    componentDidMount () {
        // request for all jobs
        this.props.jobs_get_all (); 
    }

    render () {
        const jobs = this.props.jobs.jobs;
        const jobs_loading = this.props.jobs.loading;

        // TODO:
        // let content = <div className="container"><Spinner /></div>;

        // if (users === null || user_loading) {
        //     content = (
        //         <div className="container-fluid"><Spinner /></div>
        //     );
        // } else {
        //     content = (
        //         <Users className="h-100" location={this.props.locations.highlight} user={this.props.auth.user} users={users} real_days={real_days}/>
        //     );
        // }

        return (
        <div>
            <Navbar />

            <div style={{display: "flex", justifyContent: "center", marginTop: "1%", marginBottom: "1%"}}>
                <div className="card" style={{width: "65%"}}>
                    <div className="card-body">
                        <h2 className="card-title">Create</h2>
                        <form>
                            <TextField 
                                placeholder="Name"
                                name="name"
                            />
                            <TextArea
                                placeholder="Description"
                                name="description"
                            />
                            <button type="submit" className="m-btn m-btn-theme m-btn-radius btn-lg w-100"><i className="fas fa-plus"></i> Create</button>
                        </form>
                    </div>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "center", marginTop: "1%", marginBottom: "1%"}}>
                <div className="card" style={{width: "65%"}}>
                    <div className="card-body">
                        <h2 className="card-title">Waiting</h2>
                        <table className="table">
                            <thead style={{backgroundColor: "#024a75", color: "#ffffff"}}>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Created</th>
                                    <th scope="col">Images</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Nombre1</th>
                                    <td>Fecha Inicio</td>
                                    <td>1 / 10</td>
                                </tr>
                                <tr>
                                    <th scope="row">Nombre2</th>
                                    <td>Fecha Inicio</td>
                                    <td>2 / 10</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "center", marginTop: "1%", marginBottom: "1%"}}>
                <div className="card" style={{width: "65%"}}>
                    <div className="card-body">
                        <h2 className="card-title">Current</h2>
                        <table className="table">
                            <thead style={{backgroundColor: "#024a75", color: "#ffffff"}}>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Started</th>
                                    <th scope="col">Images</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Nombre1</th>
                                    <td>Fecha Inicio</td>
                                    <td>1 / 10</td>
                                </tr>
                                <tr>
                                    <th scope="row">Nombre2</th>
                                    <td>Fecha Inicio</td>
                                    <td>2 / 10</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "center", marginTop: "1%", marginBottom: "3%"}}>
                <div className="card" style={{width: "65%"}}>
                    <div className="card-body">
                        <h2 className="card-title">Finished</h2>
                        <table className="table">
                            <thead style={{backgroundColor: "#024a75", color: "#ffffff"}}>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Started</th>
                                    <th scope="col">Finished</th>
                                    <th scope="col">Images</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Nombre1</th>
                                    <td>Fecha Inicio</td>
                                    <td>Fecha Fin</td>
                                    <td>1 / 10</td>
                                </tr>
                                <tr>
                                    <th scope="row">Nombre2</th>
                                    <td>Fecha Inicio</td>
                                    <td>Fecha Fin</td>
                                    <td>2 / 10</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        );
    }

}

Jobs.propTypes = { 
    jobs: PropTypes.object.isRequired,
    jobs_get_all: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    jobs: state.jobs,
    auth: state.auth
});

export default compose(
    withRouter,
    connect (mapStateToProps, { jobs_get_all }) 
)(Jobs);