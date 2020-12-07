import React, { Component, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Dropzone, {useDropzone} from 'react-dropzone';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Moment from 'react-moment';
import Navbar from '../main/Navbar'
import Footer from '../main/Footer';

import Spinner from '../common/Spinner';

import TextField from '../input/TextField';
import TextArea from '../input/TextArea';

import { job_get_by_id, job_update_type, job_upload } from '../../actions/jobsActions';

class Job extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
      // gets job id from url
      const job_id = this.props.match.params.job_id;

      // request for a single job
      this.props.job_get_by_id (job_id); 
  }

  handleSubmit(e){
    e.preventDefault();
    const job_id = this.props.match.params.job_id;
    this.props.job_update_type({id: job_id ,type: e.target.value});
  }

  render () {
      const job = this.props.jobs.job;
      const jobs_loading = this.props.jobs.loading;

      const processes = ['GrayScale', 'Shift', 'Clamp', 'RGB to HUE'];
      const process_values = [ 'GRAYSCALE', 'SHIFT', 'CLAMP', 'RGB_TO_HUE'];
      const processItem = processes.map((process, idx) =>
          <option key={idx} value={process_values[idx]}>{process}</option>
      );

      

      // TODO:
      let content = <div className="container"><Spinner /></div>;

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
            {jobs_loading || job === null 
              ? content 
              : 
              <div>
                <h1>Job {job._id.$oid}</h1>
                <div className="card">
                    <div className="card-body">
                      <h5 style={{textAlign: "right"}}>{job.status === 0 
                        ? "None" 
                        : job.status === 1 ? "Waiting"
                        : job.status === 2 ? "Ready"
                        : job.status === 3 ? "Running"
                        : job.status === 6 ? "Finished"
                        : "None"
                      }</h5>
                        <h2><span > Name:  </span>{job.name}</h2>
                        <h2>Description: {job.description}</h2>

                        <table className="table mt-5">
                            <thead style={{backgroundColor: "#024a75", color: "#ffffff"}}>
                                <tr>
                                    <th scope="col">Created</th>
                                    <th scope="col">Started</th>
                                    {/* <th scope="col">Stopped</th> */}
                                    <th scope="col">Ended</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><Moment>{job.created.$date}</Moment></td>
                                    <td><Moment>{job.started.$date}</Moment></td>
                                    {/* <td><Moment>{job.stopped.$date}</Moment></td> */}
                                    <td><Moment>{job.ended.$date}</Moment></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="form-group row mt-5 ml-1">
                            <h3 htmlFor="inputState">Processes</h3>
                            <div className="col-sm-4 ml-3">
                                <select id="inputState" defaultValue={process_values[job.type]}
                                   className="form-control" onChange={this.handleSubmit}>
                                    <option value="NONE">Choose...</option>
                                    {processItem}
                                </select>
                            </div>
                        </div>

                        <Previews job_id={job._id.$oid}  job_upload={this.props.job_upload}/>

                    </div>
                </div>
              </div>
            }
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
    width:100,
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
        // let aux = files;
        // aux.push(acceptedFiles.map(file => Object.assign(file, {
        //   preview: URL.createObjectURL(file)
        // })));
        // setFiles(aux);
        setFiles([...files, acceptedFiles.map(file => Object.assign(
            file, {
              preview: URL.createObjectURL(file)
            }
          )) 
        ]);
      }
    });
    
    const thumbs = files.map((file, idx) => 
    {
      return (
        <div key={idx} style={thumb} >
          <div style={thumbInner}>
            <img
              width="100px"
              height="100px"
              src={file[0].preview}
              style={img} />
          </div>
        </div>
      );
    });
  
    // useEffect(() => () => {
    //   // Make sure to revoke the data uris to avoid memory leaks
    //   files.forEach(file => URL.revokeObjectURL(file.preview));
    // }, [files]);

    return (
        <section className="container h-100">
          <div  {...getRootProps({className: 'dropzone'})} style={{display:"flex", flexFlow:"column", justifyContent:"center", alignItems:"center", border:"1px dashed black", height:"200px"}}>
            <input {...getInputProps()} />
            {files.length === 0 
              ?<p>Drag 'n' drop your images here, or click to select files</p>
              : <aside style={thumbsContainer}>
                  {thumbs}
                </aside>
            }
            
            
          </div>
          <button onClick={()=>props.job_upload({
            files: files,
            id: props.job_id
          })}
            className={files.length > 0 
              ? "btn btn-lg btn-block btn-info mt-2" 
              : "btn btn-lg btn-block btn-secondary mt-2"}>Upload</button>
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
    connect (mapStateToProps, { job_get_by_id, job_update_type, job_upload }) 
)(Job);