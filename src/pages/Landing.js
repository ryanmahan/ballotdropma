import React from "react";
import {
  notification,
  AutoComplete,
  Select,
  Button,
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

const InfoGrid = styled.div`
  h3 {
    color: #1163B1;
    margin-bottom: 0.5em;
  }
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
    const filteredLocations = locations.filter(location => location.city.toLowerCase() === town.toLowerCase())
    if (filteredLocations.length === 1) {
      const id = filteredLocations[0]._id;
      this.props.history.push(`/town/${id}`)
    }
    else notification.error({message: "Couldn't find a town with that name"});
  }

  render() {
    const { locations } = this.state;

    return (
      <Frame className="frame" style={{minHeight: "12"}}>
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
            style={{width: "45vw", fontSize: "16px"}}
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
          <Button style={{marginLeft: "10px"}} onClick={this.townRedirectOnName}>Go</Button>
        </Center>
        <Center>
          <h2>More info about mail in voting</h2>
        </Center>
          <InfoGrid>
            <h3>You can apply online for a mail in ballot online.</h3>
            <p><a href="https://www.sec.state.ma.us/ele/eleev/early-voting-by-mail.htm">Right here.</a></p>
            <h3>USPS Suggests 15 days of travel time for ballots</h3>
            <p>
              The USPS has <a href="https://about.usps.com/newsroom/national-releases/2020/0529-usps-provides-recommendations-for-successful-2020-election-mail-season.htm">sent letters to 46 states</a>
              &nbsp;reccommending 15 days of travel time for ballots to reach election offices.
              <strong>This means you would need to mail your ballot before October 20th</strong>! Or look up your town on this site to find the best place 
              to drop off you ballot to ensure it reaches your town or city's election offices safely.
            </p>
            <h3>You can track the status of your ballot online</h3>
            <p>Introduced in August 2020, you can track &nbsp;
              <a href="https://www.sec.state.ma.us/wheredoivotema/track/trackmyballot.aspx">the status of your mail in ballot online.</a>
            </p>
            <h3>MA has had 4 cases of voter fraud since 2012</h3>
            <p>
              <a href="https://www.heritage.org/voterfraud/search?state=MA">According to the Heritage Foundation</a>,
              there have been 4 cases of MA voter fraud since 2012. Two of which were absentee ballot related.
              For comparison, 3.3 million ballots were cast in 2016 alone.
            </p>
            <h3>More Questions?</h3>
            <p>Contact your local election office. You can find their contact info by using this tool!</p>
          </InfoGrid>
      </Frame>
    )
  }
  
}

export default Landing;
