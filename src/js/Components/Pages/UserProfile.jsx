import React from 'react';
import {getCurrentUser, uploadImage} from './../../helpers.jsx';
import moment from 'moment'
import MetaTags from 'react-meta-tags';

class UserProfile extends React.Component {
	constructor() {
		super();

		this.state = {
			user:  {},
		}

		this.handleUploadFile = this.handleUploadFile.bind(this);
	}

	componentDidMount() {
		getCurrentUser((dbUser, authUser) =>  {
			const user = Object.assign(dbUser, authUser);
			console.log(user);
			this.setState({ user })
		});
	}

	handleUploadFile() {
		const name = document.querySelector('#selectedFile');
		const file = name.files.item(0);

		uploadImage(file);
	}


	render() {
		return (<section>
		<MetaTags>
			<title>Forum</title>
			<meta id='meta-description' name='description' content='Simple Forum to share and comment posts. This is an UniNorte project' />
		</MetaTags>
		<h2>User Profile</h2>
		<div className='card'>
			<div className='row' style={{paddingTop: '15px'}}>
				<div className='col-md-1 center'>
					<img src={this.state.user.avatar} className='avatar profilepic' alt='profile image' /><br />
					<input type="file" id="selectedFile" style={{visibility: 'hidden'}} onChange={this.handleUploadFile}/>
					<input type="button" className='btn btn-success' value="upload..." onClick={() => document.getElementById('selectedFile').click()} />
				</div>
				<div className='col-md-11'>
					<table className="table table-user-information">
						<tbody>
							<tr>
								<td>Name:</td>
								<td>{this.state.user.name}</td>
							</tr>
							<tr>
								<td>Email:</td>
								<td>{this.state.user.email}</td>
							</tr>
							<tr>
								<td>CreatedAt:</td>
								<td>{moment(this.state.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
							</tr>
							<tr>
								<td>#Posts:</td>
								<td>{this.state.user.post_counter}</td>
							</tr>
							<tr>
								<td>#Comments:</td>
								<td>{this.state.user.comment_counter}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			
		</div>
		

		</section>);
	}

}

export default UserProfile;

