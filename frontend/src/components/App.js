import React, { Component } from 'react';
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Category from './Category'
import AppSettgins from '../AppSettings'
import ApiService from '../utils/ApiService'

import '../css/app.css'

class App extends Component {

	componentDidMount(){
		
	}

	render() {
		return (
			<div>				
				<AppBar style={{position:"fixed"}} title={"Readable Home"} showMenuIconButton={false}/>				
				<div className="app-body">
				<Category/>
				</div>
				<div style={{height:1500}}></div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps)(App)
