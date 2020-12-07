import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Navbar from '../main/Navbar'
import Footer from '../main/Footer';

import Spinner from '../common/Spinner';

import { job_get_by_id } from '../../actions/jobsActions';

class Job extends Component {

    componentDidMount () {
        // gets job id from url
        const job_id = this.props.match.params.job_id;

        // request for a single job
        this.props.job_get_by_id (job_id); 
    }

    render () {
        const job = this.props.jobs.job;
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

Job.propTypes = { 
    jobs: PropTypes.object.isRequired,
    job_get_by_id: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    jobs: state.jobs,
    auth: state.auth
});

export default compose(
    withRouter,
    connect (mapStateToProps, { job_get_by_id }) 
)(Job);