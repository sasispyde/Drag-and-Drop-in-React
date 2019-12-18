import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from '../layout/Navbar';
import { withRouter } from "react-router-dom";
import { contactDetails } from "../../actions/authActions";
import './css/Contact.css';

var fields;
class Contact extends React.Component
{

	constructor(props){
	    super(props);
	    this.state = {
	      fields: {
	      	'name':'',
	      	'email':'',
	      	'phone':'',
	      	'address':''
	      },
	      errors: {}
	    }
	}

	componentDidMount() {
		
	    if (this.props.auth.isAuthenticated) {
	      this.props.history.push("/contact");
	    }
	}

	componentWillReceiveProps(nextProps) {

	    if (nextProps.errors) {
	      this.setState({
	        errors: nextProps.errors
	      });
	    }
	}

  	contactSubmit(e){

	    e.preventDefault();
	    if(this.handleValidation()){
		    let data={
		        "name":fields['name'],
		        'email':fields['email'],
		        'phone':fields['phone'],
		        'address':fields['address']
		    };
		    this.setState({
		        fields:data,
		        errors:""
		    });
		    this.props.contactDetails(data, this.props.history);
	    }
	}

	handleChange(field, e){

	    fields = this.state.fields;
	    fields[field] = e.target.value;
	    this.setState({
	    	fields:fields
	    });
	}

  	handleValidation(){

	    fields = this.state.fields;
	    let errors = {};
	    let formIsValid = true;

	    //Name Valiadtion (Client Side)
	    if(!fields["name"] || fields["name"]===''){
	      formIsValid = false;
	      errors["name"] = "Please Enter Your Name";
	    }
	    else{
		    if(typeof fields["name"] !== "undefined"){
		      var name = fields["name"].replace(/\s/g,'');
			    if(!name.match(/^[a-zA-Z]+$/)){
			       	formIsValid = false;
			        errors["name"] = "Only letters Are Allowed";
			    }       
		    }
		}

		//Phone Number Valiadtion (Client Side)
	    if(!fields["phone"]){
	      formIsValid = false;
	      errors["phone"] = "Please Enter The Phone Number";
	    }
	    else{
		    if(typeof fields["phone"] !== "undefined"){
		      	if(!fields["phone"].match(/[1-9]/g)){
		        	formIsValid = false;
		        	errors["phone"] = "Only Numbers Are Allowed";
		      	}       
		    }
		}

		//Address Validation (Client Side)
	    if(!fields["address"]){
	      formIsValid = false;
	      errors["address"] = "Please Enter The Address";
	    }

	    //Email Valiadtion (Client Side)
	    if(!fields["email"]){
	      formIsValid = false;
	      errors["email"] = "Please Enter Your Email Id";
	    }
	    else{
		    if(typeof fields["email"] !== "undefined"){
	      		let lastAtPos = fields["email"].lastIndexOf('@');
	      		let lastDotPos = fields["email"].lastIndexOf('.');
			    if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
			        formIsValid = false;
			        errors["email"] = "Email is not valid";
			    }
		    }
		}
	    this.setState({errors: errors});
	    return formIsValid;
	}


	render()
	{
		return(
		<div>
		  	<Navbar />
		  	<div className="row">
		  	<center><h3>Contact Form</h3></center>
				<div className="center col s12">
			        <form name="contactform" id="details_form" className="contactform" onSubmit= {this.contactSubmit.bind(this)}>
			          	<div className="col-md-12">
			            	<div className="input-field col s12">
				            	<input ref="name" id='name' type="text" size="30"  onChange={this.handleChange.bind(this, "name")} value={this.state.fields.name} />
				            	<label htmlFor="name">Name</label>
				              	<p className="error">{this.state.errors["name"]}</p>
			              	</div>
			              	<div className="input-field col s12">
				              	<input refs="email" id='email' type="text" size="30"  onChange={this.handleChange.bind(this, "email")} value={this.state.fields.email} />
				              	<label htmlFor="email">Email</label>
				              	<p className="error">{this.state.errors["email"]}</p>
			              	</div>
			              	<div className="input-field col s12">
				              	<input refs="phone" id='phone' type="text" size="30"  onChange={this.handleChange.bind(this, "phone")} value={this.state.fields.mobile} />
				              	<label htmlFor="phone">Phone</label>
				              	<p className="error">{this.state.errors["phone"]}</p>
				             </div>
				            <div className="input-field col s12">
				              	<input refs="address" id='address' type="text" size="30"  onChange={this.handleChange.bind(this, "address")} value={this.state.fields.address} />
				              	<label htmlFor="address">Address</label>
				              	<p className="error">{this.state.errors["address"]}</p>
			              	</div>
			              	<div className="input-field col s12">
			              	  <button className="btn waves-effect waves-light" type="submit" name="action">Submit
							    <i className="material-icons right">send</i>
							  </button>
							</div>
			          	</div>
			        </form>
			    </div>
		    </div>
		</div>
		);
	}
}

Contact.propTypes = {
  	auth: PropTypes.object.isRequired,
   	contactDetails: PropTypes.func.isRequired,
 	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors:state.errors
});

export default connect(
  mapStateToProps,
  { contactDetails }
)(withRouter(Contact));
