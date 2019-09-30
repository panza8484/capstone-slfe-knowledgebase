import React, { Component } from 'react'
import Tabs from "../PageComponents/SolutionTab";
import { connect } from "react-redux";
import { getDomainEntries } from "../../actions/domainActions";
import { addSolutionFunc } from "../../actions/enterpriseActions";
import { uploadFile } from '../../actions/fileActions';
import { withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';

class addSolution extends Component {
  constructor(props) {
    super(props);

    this.state = {
      solution: {
        Name: "",
        ResponsibleOrganization: "",
        ShortDescription: "",
        GeneralDescription: "",
        SolutionType: "",
        PrimaryDomain: "",
        SecondaryDomain: "",
        OrganizationalEntityType: "",
        KeywordDescriptors: "",
        Location: "",
        Country: "United States",
        State: "AZ",
        City: "Tempe",
        ScopeOfActivities: "Regional",
        OperationalArea: "",
        ClimateZone: "",
        CityType: "",
        DateFounded: "0",
        EconomicNetworks: "",
        Associations: "",
        NumberOfEmployees: "",
        References: "",
        AnnualRevenue: "",
        NumberOfWorkers: "",
        ProductDescription: "",
        CustomersDescription: "",
        WorkforceDescription: "",
        ProductionDescription: "",
        SourcingDescription: "",
        SupportingServicesDescription: "",
        OtherOutputsDescription: "",
        DistributingDescription: "",
        RecyclingDescription: "",
        ManagingDescription: "",
        DecisionMakingDescription: "",
        SteeringDescription: "",
        OwnershipDescription: "",
        BusinessModelDescription: "",
        History: "",
        Recognition: "",
        FutureOutlook: "",
        Researcher: "",
        otherImages: [],
        References: [],
        LastUpdated: ""
      },
      imageFileSelected: {},
      referenceFileSelected: {}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageFileSelectChange = this.handleImageFileSelectChange.bind(this);
    this.handleReferenceFileSelectChange = this.handleReferenceFileSelectChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleReferenceUpload = this.handleReferenceUpload.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    
    let temp = this.state.solution;
    temp[name] = target.value;

    this.setState({
      solution: temp
    });
  }

  handleFormSubmit() {
    if (this.state.solution.Name !== "") {
      const apiCall = this.props.addSolutionFunc(this.state.solution);
      apiCall.then(data => {
        this.props.history.push('/solution/' + data.payload._id);
      });
    } else {
      alert("Name is required.");
    }
  }

  handleImageFileSelectChange(event) {
    this.setState({
      imageFileSelected: event.target.files[0]
    });
  }

  handleReferenceFileSelectChange(event) {
    this.setState({
      referenceFileSelected: event.target.files[0]
    });
  }

  handleImageUpload(event) {
    event.preventDefault();

    const apiCall = this.props.uploadFile(this.state.imageFileSelected);
    apiCall.then(data => {
      if (data.payload.success) {
        let temp = this.state.solution;
        temp["otherImages"].push({ img: data.payload.url, caption: "" });
        this.setState({
          solution: temp
        });
        
      } else {
        alert("Image upload fail!");
      }
    });
  }

  handleReferenceUpload(event) {
    event.preventDefault();

    const apiCall = this.props.uploadFile(this.state.referenceFileSelected);
    apiCall.then(data => {
      if (data.payload.success) {
        let temp = this.state.solution;
        temp["References"].push({ ref: data.payload.url });
        this.setState({
          solution: temp
        });
        
      } else {
        alert("Reference upload fail!");
      }
    });
  }

  componentWillMount() {
    const domains = this.props.getDomainEntries();
    domains.then(data => {
      this.setState({
        domains: data.payload
      });

      this.setState({
        PrimaryDomain: data.payload[0].name
      })
    });
  }

  componentDidMount() {
    document.title = "Add Solution";
  }

  getCategoryItems() {
    var categoryTypes = [];
    if (this.state.domains) {
      for (var i = 0; i < this.state.domains.length; i++) {
        categoryTypes.push(
          <option value={this.state.domains[i].name}>
            {this.state.domains[i].name}
          </option>
        );
      }
    }

    return categoryTypes;
  }

  render() {
    const categoryList = this.getCategoryItems();
    let uploadImagesList = this.state.solution.otherImages.map(function(image){
      return (<div><img src={image.img} width="70px" height="50px"></img><br /><input type="button" value="Delete"></input></div>);
    });
    let referenceUploadList = this.state.solution.References.map(function(reference){
      return (<div><a href={reference.ref} target="_blank">{reference.ref}</a><input type="button" value="Delete"></input></div>);
    });

    return (
      <div >
        <h1>Add New Solution</h1> 
        <br />
        <Tabs showCancelBtn={true} showSaveBtn={true} onSave={this.handleFormSubmit}>
          <div label="General">
            <div class="col-6">
              <div class="form-group">
                <label>Name</label> <br />
                <input class="form-control" name="Name" type="text" value={this.state.solution.Name} onChange={this.handleInputChange}></input>
              </div>
              <div class="form-group">
                <label>Responsible Organization</label> <br />
                <input class="form-control" name="ResponsibleOrganization" type="text" value={this.state.solution.ResponsibleOrganization} onChange={this.handleInputChange}></input>
              </div>
              <div class="form-group">
                <label>General Description</label> <br />
                <input class="form-control" name="GeneralDescription" type="text" size="50" value={this.state.solution.GeneralDescription} onChange={this.handleInputChange}></input>
              </div>
              <div class="form-group">
                <label>Short Description</label> <br />
                <input class="form-control" name="ShortDescription" type="text" value={this.state.solution.ShortDescription} onChange={this.handleInputChange}></input>
              </div>
              <div class="form-group">
                <label>Solution Type</label> <br />
                <input class="form-control" name="SolutionType" type="text" value={this.state.solution.SolutionType} onChange={this.handleInputChange}></input>
              </div>
              <div class="form-group">
                <label>Primary Domain</label> <br />
                <select class="form-control" name="PrimaryDomain" onChange={this.handleInputChange}>
                  {categoryList}
                </select>
              </div>
              <div class="form-group">
              <label>Secondary Domain</label> <br />
              <select class="form-control" name="SecondaryDomain" onChange={this.handleInputChange}>
                <option value="">None</option>
                {categoryList}
              </select>
              </div>
              <div class="form-group">
                <label>Keyword Descriptors</label> <br />
                <input class="form-control" name="KeywordDescriptors" type="text" value={this.state.solution.KeywordDescriptors} onChange={this.handleInputChange}></input>
                <small class="form-text text-muted">Keywords should be separated by semi-colons</small>
              </div>
              <div class="form-group">
                <label>Country</label> <br />
                <input class="form-control" name="Country" type="text" value={this.state.solution.Country} onChange={this.handleInputChange}></input>
              </div>
              <div class="form-group">
                <label>State/Region</label> <br />
                <input class="form-control" name="State" type="text" value={this.state.solution.State} onChange={this.handleInputChange}></input>
              </div>
              <div class="form-group">
                <label>City</label> <br />
                <input class="form-control" name="City" type="text" value={this.state.City} onChange={this.handleInputChange}></input>
              </div>
              <div class="form-group">
                <label>Scope of Activities</label> <br />
                <select class="form-control" name="ScopeOfActivities" value={this.state.solution.ScopeOfActivities} onChange={this.handleInputChange}>
                  <option value="Regional">Regional</option>
                  <option value="Statewide">Statewide</option>
                  <option value="National">National</option>
                </select>
              </div>
              <div class="form-group">
                <label>Economic Networks</label> <br />
                <input class="form-control" name="EconomicNetworks" type="text" value={this.state.solution.EconomicNetworks} onChange={this.handleInputChange}></input>
              </div>
            </div>
          </div>
          <div label="Details">
            <div class="col-6">
              <div class="form-group">
                <label>Product Description</label> <br />
                <textarea class="form-control" name="ProductDescription" rows="5" cols="50" value={this.state.solution.ProductDescription} onChange={this.handleInputChange}></textarea>
              </div>
              <div class="form-group">
                <label>Customer Description</label> <br />
                <textarea class="form-control" name="CustomerDescription" rows="5" cols="50" value={this.state.solution.CustomerDescription} onChange={this.handleInputChange}></textarea>
              </div>
              <div class="form-group">
                <label>Workforce Description</label> <br />
                <textarea class="form-control" name="WorkforceDescription" rows="5" cols="50" value={this.state.solution.WorkforceDescription} onChange={this.handleInputChange}></textarea>
              </div>
              <div class="form-group">
                <label>Production Description</label> <br />
                <textarea class="form-control" name="ProductionDescription" rows="5" cols="50" value={this.state.solution.ProductionDescription} onChange={this.handleInputChange}></textarea>
              </div>
              <div class="form-group">
                <label>Sourcing Description</label> <br />
                <textarea class="form-control" name="SourcingDescription" rows="5" cols="50" value={this.state.solution.SourcingDescription} onChange={this.handleInputChange}></textarea>
              </div>
              <div class="form-group">
                <label>Supporting Services Description</label> <br />
                <textarea class="form-control" name="SupportingServicesDescription" rows="5" cols="50" value={this.state.solution.SupportingServicesDescription} onChange={this.handleInputChange}></textarea>
              </div>
              <div class="form-group">
                <label>Supporting Services Description</label> <br />
                <textarea class="form-control" name="SupportingServicesDescription" rows="5" cols="50" value={this.state.solution.SupportingServicesDescription} onChange={this.handleInputChange}></textarea>
              </div>
              <div class="form-group">
                <label>Distributing Description</label> <br />
                <textarea class="form-control" name="DistributingDescription" rows="5" cols="50" value={this.state.solution.DistributingDescription} onChange={this.handleInputChange}></textarea>
              </div>
              <div class="form-group">
                <label>Re-Cycling Description</label> <br />
                <textarea class="form-control" name="RecyclingDescription" rows="5" cols="50" value={this.state.solution.RecyclingDescription} onChange={this.handleInputChange}></textarea>
              </div>
              <div class="form-group">
                <label>Managing Description</label> <br />
                <textarea class="form-control" name="ManagingDescription" rows="5" cols="50" value={this.state.solution.ManagingDescription} onChange={this.handleInputChange}></textarea>
              </div>
              <div class="form-group">
                <label>Decision Making Description</label> <br />
                <textarea class="form-control" name="DecisionMakingDescription" rows="5" cols="50" value={this.state.solution.DecisionMakingDescription} onChange={this.handleInputChange}></textarea>
              </div>
              <div class="form-group">
                <label>Steering Description</label> <br />
                <textarea class="form-control" name="SteeringDescription" rows="5" cols="50" value={this.state.solution.SteeringDescription} onChange={this.handleInputChange}></textarea>
              </div>
              <div class="form-group">
                <label>Ownership Description</label> <br />
                <textarea class="form-control" name="OwnershipDescription" rows="5" cols="50" value={this.state.solution.OwnershipDescription} onChange={this.handleInputChange}></textarea>
              </div>
              <div class="form-group">
                <label>Business Model Description</label> <br />
                <textarea class="form-control" name="BusinessModelDescription" rows="5" cols="50" value={this.state.solution.BusinessModelDescription} onChange={this.handleInputChange}></textarea>
              </div>
              <div class="form-group">
              
              </div>
            </div>
          </div>
          <div label="Images">
            <form onSubmit={this.handleImageUpload}>
              <div class="col-8">
                <div class="form-group">
                  <input type="file" class="form-control-file" accept="image/*" onChange={this.handleImageFileSelectChange}></input>
                  <input type="submit" class="btn btn-light" value="Upload"></input>
                </div>
              </div>
            </form>
            <br /><br />
            {uploadImagesList}
          </div>
          <div label="References">
            <form onSubmit={this.handleReferenceUpload}>
              <input type="file" onChange={this.handleReferenceFileSelectChange}></input>
              <input type="submit" value="Upload"></input>
            </form>
            <br /><br />
            {referenceUploadList}
          </div>            
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  enterprise: state.enterprise
});

export default withRouter(connect(
  mapStateToProps,
  { getDomainEntries, addSolutionFunc, uploadFile }
)(addSolution));
