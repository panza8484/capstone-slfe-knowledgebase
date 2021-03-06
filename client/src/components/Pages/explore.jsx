import React, { Component } from "react";
import styled from "styled-components";
import CategoryType from "../PageComponents/CategoryType";
import PropTypes from "prop-types";
import Search from "material-ui-search-bar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { connect } from "react-redux";
import { getEnterprises, getField } from "../../actions/enterpriseActions";
import { getDomains } from "../../actions/enterpriseActions";
import { getDomainEntries } from "../../actions/domainActions";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
  CardFooter
} from "reactstrap";
import Map from "./map.jsx";

const Page = styled.div`
  flex-direction: column;
  min-width: fit-content;
  height: 100%;
  width: 100%;
  background-color: #f3f3f3;
`;

const PageSection = styled.span`
  margin-left: 24px;
  width: 95%;
`;

const FeatCard = styled(Card)`
  height: 540px;
  margin: 25px;
`;

const FeatCardTitle = styled(CardTitle)`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FeatCardText = styled(CardText)`
  max-height: 76px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FeatCardImage = styled(CardImg)`
  margin-bottom: 5px;
`;

const DomainCard = styled(Card)`
  cursor: pointer;
  width: 200px;
  height: 325px;
  margin: 25px 0 0 25px;
  transition: all 0.2s;
  background-color: #d6e0d7;
  &:hover {
    background-color: #00796b;
    transform: scale(1.1);
    font-weight: bold;
    color: white;
  }
`;

const DomainCardImage = styled(CardImg)`
  margin-bottom: 5px;
`;

class explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textChange: null,
      searchTermText: "",
      dataArray: [],
      solutionTypes: null
    };

    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  componentDidMount() {
    document.title = "SLFE Knowledge Base";
  }

  onSubmitClick(al) {
    this.props.history.push(`/browse?searchTerm=${al}`);
  }

  getCategoryItems = () => {
    const { domains = [] } = this.state;

    return domains.map(domain => {
      return (
        <Col xs="auto" sm="3" md="auto">
          <DomainCard
            onClick={() =>
              this.props.history.push(`browse?primaryDomain=${domain.name}`)
            }
          >
            <CardBody>
              <CardTitle>
                <h4>
                  <p style={{ textAlign: "center" }}>{domain.name}</p>
                </h4>
              </CardTitle>
              <DomainCardImage
                top
                width="100%"
                src={domain.image}
                alt={domain.name}
              />

              <CardText>{domain.description}</CardText>
            </CardBody>
          </DomainCard>
        </Col>
      );
    });
  };

  getPopularItems = () => {
    var popularItems = [];
    console.log(this.state.popularSolutions);
    if (this.state.popularSolutions) {
      for (var i = 0; i < this.state.popularSolutions.length; i++) {
        // Only show featured solutions
        if (this.state.popularSolutions[i].isFeatured) {
          popularItems.push(
            <FeatCard>
              <CardBody>
                <FeatCardTitle>
                  <h3>
                    <p class="text-success">
                      {this.state.popularSolutions[i].Name}
                    </p>
                  </h3>
                </FeatCardTitle>
                <FeatCardImage
                  top
                  width="100%"
                  src={this.state.popularSolutions[i].mainImage}
                  alt="Main Image for Solution"
                />
                <CardSubtitle>
                  <h5>
                    <p class="text-muted">
                      {this.state.popularSolutions[i]["Primary Domain"]}
                    </p>
                  </h5>
                </CardSubtitle>
                <FeatCardText>
                  {this.state.popularSolutions[i]["Short Description"]}
                </FeatCardText>
              </CardBody>
              <CardFooter>
                <a href={`/solution/${this.state.popularSolutions[i]._id}`}>
                  <Button outline color="success">
                    Learn More
                  </Button>
                </a>
              </CardFooter>
            </FeatCard>
          );
        }
      }
    }

    return popularItems;
  };

  componentWillMount() {
    const domains = this.props.getDomainEntries();
    domains.then(data => {
      const sorted_cat = [];
      sorted_cat.push(data.payload.find(c => c.name === "Production"));
      sorted_cat.push(data.payload.find(c => c.name === "Processing"));
      sorted_cat.push(data.payload.find(c => c.name === "Distribution"));
      sorted_cat.push(data.payload.find(c => c.name === "Outlets"));
      sorted_cat.push(data.payload.find(c => c.name === "Recycling"));
      sorted_cat.push(data.payload.find(c => c.name === "Integrating"));

      this.setState({
        domains: sorted_cat
      });
    });
    const poulars = this.props.getEnterprises();
    poulars.then(data => {
      this.setState({
        popularSolutions: data.payload
      });
    });
    const fields = this.props.getField("Solution Type", "0");
    fields.then(data => {
      this.setState({
        solutionTypes: data.payload
      });
    });
    while (this.state.dataArray.loading === false) {
      if (this.state.dataArray.loading === true) {
        break;
      }
    }
  }

  mapData(array) {}

  render() {
    const categoryList = this.getCategoryItems();
    const popularList = this.getPopularItems();

    return (
      <Page>
        <PageSection>
          <div style={{ width: "75%", marginTop: "20px", margin: "0 auto" }}>
            <div>
              <h2 class="text-success" style={{ textAlign: "left" }}>
                Search
              </h2>
              <MuiThemeProvider>
                <Search
                  value={this.state.searchTermText}
                  onChange={value => {
                    this.setState({ searchTermText: value });
                  }}
                  onRequestSearch={() => {
                    this.props.history.push(
                      `/browse?searchTerm=${this.state.searchTermText}`
                    );
                  }}
                />
              </MuiThemeProvider>
            </div>
          </div>
        </PageSection>
        <br />
        <div style={{ paddingLeft: "27px" }}>
          <h2 class="text-success" style={{ textAlign: "left" }}>
            Food Economy Domain
          </h2>
        </div>
        <Row>{categoryList}</Row>
        <br />
        <div style={{ paddingLeft: "27px" }}>
          <h2 class="text-success" style={{ textAlign: "left" }}>
            Featured Solutions
          </h2>
        </div>

        <div
          style={{
            width: "100%",
            alignItems: "center",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)"
          }}
        >
          {popularList}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Map width={"100%"} height={"500px"} />
        </div>
      </Page>
    );
  }
}
explore.propTypes = {
  getDomainEntreis: PropTypes.func.isRequired,
  getDomains: PropTypes.func.isRequired,
  getEnterprises: PropTypes.func.isRequired,
  categoryTypes: PropTypes.object,
  enterprise: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  enterprise: state.enterprise
});

export default connect(mapStateToProps, {
  getEnterprises,
  getDomains,
  getField,
  getDomainEntries
})(explore);
