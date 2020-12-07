import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Navbar from '../main/Navbar'
import Footer from '../main/Footer';

import Spinner from '../common/Spinner';

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