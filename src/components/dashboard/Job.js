import React, { Component, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import {useDropzone} from 'react-dropzone';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Navbar from '../main/Navbar'
import Footer from '../main/Footer';

import Spinner from '../common/Spinner';

import TextField from '../input/TextField';
import TextArea from '../input/TextArea';

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

        const processes = ['Process 1', 'Process 2', 'Process 3', 'Process 4'];
        const processItem = processes.map((process) =>
            <option>{process}</option>
        );

        

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

            <div className="container mt-2 mb-9">
                <h1>Job (id)</h1>

                <div className="card">
                    <div className="card-body">
                        <h5 style={{textAlign: "right"}}>Waiting</h5>
                        <h2>Name: (name)</h2>
                        <h2>Description: (descriptrion)</h2>

                        <table className="table mt-5">
                            <thead style={{backgroundColor: "#024a75", color: "#ffffff"}}>
                                <tr>
                                    <th scope="col">Created</th>
                                    <th scope="col">Started</th>
                                    <th scope="col">Stopped</th>
                                    <th scope="col">Ended</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Created Date</td>
                                    <td>Started Date</td>
                                    <td>Stopped Date</td>
                                    <td>Ended Date</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="form-group row mt-5 ml-1">
                            <h3 htmlFor="inputState">Processes</h3>
                            <div className="col-sm-4 ml-3">
                                <select id="inputState" className="form-control">
                                    <option selected>Choose...</option>
                                    {processItem}
                                </select>
                            </div>
                        </div>

                        <Previews />
 
                    </div>
                </div>

            </div>

            <Footer />
        </div>
        );
    }

}

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
const thumb = {
display: 'inline-flex',
borderRadius: 2,
border: '1px solid #eaeaea',
marginBottom: 8,
marginRight: 8,
width: 100,
height: 100,
padding: 4,
boxSizing: 'border-box'
};

const thumbInner = {
display: 'flex',
minWidth: 0,
overflow: 'hidden'
};

const img = {
display: 'block',
width: 'auto',
height: '100%'
};

function Previews(props) {
    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
      accept: 'image/*',
      onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
      }
    });
    
    const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
          />
        </div>
      </div>
    ));
  
    useEffect(() => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section className="container">
          <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <aside style={thumbsContainer}>
            {thumbs}
          </aside>
        </section>
      );
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