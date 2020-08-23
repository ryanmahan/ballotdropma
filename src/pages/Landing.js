import React from "react";
import {
  notification,
  AutoComplete,
  Select,
} from "antd";
import styled from "styled-components";
import axios from "../utils/axiosInstance";
import mail from "../images/mail_sent.svg"
import Frame from "../components/Frame"

const { Option } = Select;

const Opener = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  width: 100%;
`

const Headings = styled.div`
  text-align: center;
  margin-top: 30px;
  min-width: 55%;
  max-width: 100%;
`

const BallotImage = styled.img`
  max-width: 45%;
  min-width: 300px;
  height: auto;
  padding: 5%;
`

const Center = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`

class Landing extends React.Component {
  state = {
    locations: [],
    town: "",
  }

  componentDidMount () {
    axios.get("/locations", {
      fields: "city",
    }).then((res) => {
      this.setState({ locations: res.data })
    })
  }

  townRedirectOnName = () => {
    const { town, locations } = this.state;
    const filteredLocations = locations.filter(location => location.city === town)
    if (filteredLocations.length === 1) {
      const id = filteredLocations[0]._id;
      this.props.history.push(`/town/${id}`)
    }
    else notification.error({message: "Couldn't find a town with that name"});
  }

  render() {
    const { locations } = this.state;

    return (
      <Frame className="frame">
        <Opener>
          <Headings>
            <h1>Your vote is important</h1>
            <h3>Make sure it gets counted</h3>
          </Headings>
          <BallotImage alt="Successfully sent mail" src={mail}/>
        </Opener>
        <Headings>
          <h2>
            Find your ballot drop off location
          </h2>
        </Headings>
        <Center>
          <AutoComplete
            style={{width: "45vw"}}
            placeholder={"Enter a town"}
            filterOption={(inputValue, option) =>
              option.key.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            onSelect={(town) => this.props.history.push(`/town/${town}`)}
            onChange={(value) => this.setState({ town: value })}
          >
            {
              locations.map(location => (
                <Option key={location.city} value={location._id}>
                  {location.city}
                </Option>
              ))
            }
          </AutoComplete>
        </Center>
        <Center>
          <h2>Learn about mail in ballots</h2>
          {/* arrow down indicating you should scroll */}
        </Center>
        {/* the USPS is requesting that ballots are mailed back 15 days before November 3rd. */}
        {/* timeline of events? */}
        {/* Fraud rates? */}
      </Frame>
    )
  }
  
}

export default Landing;
