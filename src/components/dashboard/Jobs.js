import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Moment from 'react-moment';
import Navbar from '../main/Navbar'
import Footer from '../main/Footer';

import Spinner from '../common/Spinner';

import TextField from '../input/TextField';
import TextArea from '../input/TextArea';

import { jobs_get_all, jobs_create } from '../../actions/jobsActions';

class Header extends Component {

	render () {
		return (
		<section className="docs-header p-40px-b">
			<div className="container">
				<div className="row align-items-center justify-content-center">
					<div className="col-12 col-lg-8 text-center">
						<div>
							<h1 className="main-dark-blue font-w-700 font-60px md-font-40px sm-font-30px">Jobs</h1>
							<br></br>
						</div>
					</div>
				</div>
			</div>
		</section>
		);
	}

}

class Jobs extends Component {

	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state= {
				name: "",
				description: "",
				creating: false
		};
		this.fetchJob = this.fetchJob.bind(this);
	}

	componentDidMount () {
		// request for all jobs
		this.props.jobs_get_all ();
	}

	handleSubmit(e){
		e.preventDefault();
		this.setState({creating: true});

		this.props.jobs_create (this.state) ;
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	fetchJob(job_id) {
		window.location.href = "/jobs/" + job_id;
	}

	render () {
		const jobs = this.props.jobs.jobs;
		const jobs_loading = this.props.jobs.loading;

		let content = <div className="container"><Spinner /></div>;

		return (
		<div>
			<Navbar />
			
			<Header />

			{/* Create div */}
			<div style={{display: "flex", justifyContent: "center", marginTop: "1%", marginBottom: "1%"}}>
				<div className="card" style={{width: "65%"}}>
					<div className="card-body">
						<h2 className="card-title">Create</h2>
						<form onSubmit={this.handleSubmit}>
							<TextField
								icon=""
								onChange={this.handleChange}
								value={this.state.name}
								placeholder="Name"
								name="name"
								/>
							<TextArea
								onChange={this.handleChange}
								value={this.state.description}
								placeholder="Description"
								name="description"
								/>
							<button type="submit" className="m-btn m-btn-theme m-btn-radius btn-lg w-100">
								Create
							</button>
						</form>
					</div>
				</div>
			</div>
			{jobs_loading || jobs === null
				? content
				:
				<div>
					{/* Waiting div */}
					<div style={{display: "flex", justifyContent: "center", marginTop: "1%", marginBottom: "1%"}}>
						<div className="card" style={{width: "65%"}}>
							<div className="card-body">
									<h2 className="card-title">Waiting</h2>
									{jobs.filter((j) => j.status === 1 ).length > 0
										? <table className="table text-center">
											<thead style={{backgroundColor: "#024a75", color: "#ffffff"}}>
												<tr>
													<th scope="col">Name</th>
													<th scope="col">Description</th>
													<th scope="col">Created</th>
												</tr>
											</thead>
												<tbody>
													{jobs.filter((j) => j.status === 1 ).map((j) => {
														return (
														<tr onClick={() => this.fetchJob(j._id.$oid)}>
															<th scope="row">{j.name}</th>
															<td scope="row">{j.description}</td>
															<td><Moment format="DD-MM-YYYY hh:mm:ss">{j.created.$date}</Moment></td>
														</tr>
													)})}
												</tbody>
										</table>
										: <h4 style={{fontWeight:"500"}}>There are no waiting jobs, create one</h4>
									}
								</div>
						</div>
					</div>

					{/* Ready div */}
					<div style={{display: "flex", justifyContent: "center", marginTop: "1%", marginBottom: "1%"}}>
						<div className="card" style={{width: "65%"}}>
							<div className="card-body">
								<h2 className="card-title">Ready</h2>
								{jobs.filter((j) => j.status === 2 ).length > 0
									?
									<table className="table text-center">
										<thead style={{backgroundColor: "#024a75", color: "#ffffff"}}>
											<tr>
												<th scope="col">Name</th>
												<th scope="col">Images</th>
												<th scope="col">Type</th>
											</tr>
										</thead>
										<tbody>
											{
												jobs.filter((j) => j.status === 2 ).map((j) => {
													return (
													<tr onClick={() => this.fetchJob(j._id.$oid)}>
														<th scope="row">{j.name}</th>
														<td scope="row">{j.imagesCount}</td>
														<td>{j.type}</td>
													</tr>
												)})
											}
										</tbody>
								</table>
									: <h4 style={{fontWeight:"500"}}>There are no ready jobs</h4>
								}
							</div>
						</div>
					</div>
					{/* Current */}
					<div style={{display: "flex", justifyContent: "center", marginTop: "1%", marginBottom: "1%"}}>
						<div className="card" style={{width: "65%"}}>
							<div className="card-body">
								<h2 className="card-title">Current</h2>
								{jobs.filter((j) => j.status === 3 ).length > 0
									?
									<table className="table text-center">
										<thead style={{backgroundColor: "#024a75", color: "#ffffff"}}>
											<tr>
												<th scope="col">Name</th>
												<th scope="col">Started</th>
												<th scope="col">Images</th>
											</tr>
										</thead>
										<tbody>
											{
												jobs.filter((j) => j.status === 3 ).map((j) => {
													return (
													<tr onClick={() => this.fetchJob(j._id.$oid)}>
														<th scope="row">{j.name}</th>
														<td scope="row"><Moment format="DD-MM-YYYY hh:mm:ss">{j.started.$date}</Moment></td>
														<td>{j.images.filter((i) => i.result !== "null").length}/{j.images.length}</td>
													</tr>
												)})
											}
										</tbody>
									</table>
									:<h4 style={{fontWeight:"500"}}>There are no jobs running</h4>
								}
							</div>
						</div>
					</div>
					<div style={{display: "flex", justifyContent: "center", marginTop: "1%", marginBottom: "3%"}}>
						<div className="card" style={{width: "65%"}}>
							<div className="card-body">
								<h2 className="card-title">Finished</h2>
									{jobs.filter((j) => j.status === 6 ).length > 0
									? <table className="table text-center">
											<thead style={{backgroundColor: "#024a75", color: "#ffffff"}}>
												<tr>
													<th scope="col">Name</th>
													<th scope="col">Started</th>
													<th scope="col">Finished</th>
													<th scope="col">Images</th>
												</tr>
											</thead>
											<tbody>
												{
													jobs.filter((j) => j.status === 6 ).map((j) => {
														return (
														<tr onClick={() => this.fetchJob(j._id.$oid)}>
															<th scope="row">{j.name}</th>
															<td scope="row"><Moment format="DD-MM-YYYY hh:mm:ss">{j.started.$date}</Moment></td>
															<td scope="row"><Moment format="DD-MM-YYYY hh:mm:ss">{j.ended.$date}</Moment></td>
															<td>{j.imagesCountMin}/{j.imageCountMax}</td>
														</tr>
													)})

												}
											</tbody>
										</table>
										: <h4 style={{fontWeight:"500"}}>There are no finished jobs</h4>
									}
							</div>
						</div>
					</div>
				</div>
			}

			<br></br>

			<Footer />
		</div>
		);
	}

}

Jobs.propTypes = {
	jobs: PropTypes.object.isRequired,
	jobs_get_all: PropTypes.func.isRequired,
	jobs_create : PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	jobs: state.jobs,
	auth: state.auth
});

export default compose(
	withRouter,
	connect (mapStateToProps, { jobs_get_all, jobs_create })
)(Jobs);