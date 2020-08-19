import React from "react";
import axios from "../utils/axiosInstance";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components"
import { Input, Button } from "antd";
import Comment from "../components/Comment";
import Frame from "../components/Frame";

const Header = styled.div`
  background: #1163B1;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0% 80%);
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  h1 {
    color: white;
    font-size: 12vw;
    text-align: center;
  }
`

const SneakyBackground = styled.div`
  background: linear-gradient(180deg, #99c8f5 85%, #F0F2F5 85%);
`

const InfoHeader = styled(Header)`
  background: #99c8f5;
  z-index: 1;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0% 80%);
  flex-direction: column;
`

const InfoText = styled.h2`
  font-size: 5vw;
  padding: 1vw 2vw;
`

const StyledFAI = styled(FontAwesomeIcon)`
  font-size: 5vw;
  margin-right: 2vw;
`

class Town extends React.Component {
  state = {
    location: {},
    comment: {},
    comments: [],
  }

  componentDidMount () {
    axios.get(`/locations/${this.props.match.params.id}`).then(res => {
      this.setState({ location: res.data })
    })
    axios.get('/comments/', { location: this.props.match.params.id }).then(res => {
      this.setState({ comments: res.data.sort((a, b) => moment(b.created) - moment(a.created))})
    })
  }

  submitComment = () => {
    axios.post("/comments/", {
      comment: this.state.comment,
      location: this.props.match.params.id
    }).then((res) => {
      this.setState((oldState) => {
        return {
          comments: [res.data, ...oldState.comments],
        }
      })
    })
  }

  report = (comment) => {
    axios.patch(`/comments/report/${comment._id}`).then((res) => {
      this.setState((oldState) => {
        const index = oldState.comments.indexOf(res.data);
        if (index !== -1) {
          const newComments = [...oldState.comments];
          newComments[index] = res.data;
          return {
            comments: newComments
          }
        }
      })
    })
  }

  render() {
    const { location, comments } = this.state;

    return (
      <>
        <SneakyBackground>
          <Header><h1>{location.city}</h1></Header>
          <InfoHeader>
            <InfoText><StyledFAI icon={faHome}/>{location.address}</InfoText>
            <InfoText><StyledFAI icon={faEnvelope}/><a href={`mailto:${location.email}`}>{location.email}</a></InfoText>
            <InfoText><StyledFAI icon={faPhone}/><a href={`tel:${location.fax}`}>{location.fax}</a></InfoText>
          </InfoHeader>
        </SneakyBackground>
        <Frame>
          <Input.TextArea
            placeholder={`Know something we dont? Submit a comment for ${location.city}`}
            onChange={({target: { value }}) => this.setState({ comment: value })}>
          </Input.TextArea>
          <Button onClick={this.submitComment}>
            Post
          </Button>
          {comments.map(comment => <Comment comment={comment} report={() => this.report(comment)}/>)}
        </Frame>
        {/* town information */}
        {/* comments section? */}
        
      </>
    )
  }
}

export default Town;