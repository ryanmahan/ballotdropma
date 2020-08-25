import React from "react";
import axios from "../utils/axiosInstance";
import moment from "moment";
import swearjar from "swearjar-extended";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faEnvelope, faPhone, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
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
    margin: 0px;
    font-size: min(8vw, 70px);
  }
`

const SneakyBackground = styled.div`
  background: linear-gradient(180deg, #1163B1, #1163B1 15%, #99c8f5 15%, #99c8f5 85%, #F0F2F5 85%);
`

const InfoHeader = styled(Header)`
  background: #99c8f5;
  z-index: 1;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0% 80%);
  flex-direction: column;
  display: flex;
  height: 30vh;
`

const InfoText = styled.h2`
  font-size: min(5vw, 30px);
  padding: 1vh 2vw;
  margin: 0px;
`

const StyledFAI = styled(FontAwesomeIcon)`
  font-size: min(5vw, 30px);
  margin-right: 2vw;
`

const PostButton = styled(Button)`
  margin-top: 2vh;
`

const BackLink = styled.a`
  color: white;
  margin: 2vh 0vw 0vh 2vw;
  font-size: min(4vw, 16px);
`

const Link = styled.a`
  color: black;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }

  &::first-letter {
    text-decoration: none;
  }
`

class Town extends React.Component {
  state = {
    location: {},
    comment: {},
    comments: [],
  }

  componentDidMount () {
    window.scrollTo(0, 0);
    axios.get(`/locations/${this.props.match.params.id}`).then(res => {
      this.setState({ location: res.data })
    })
    axios.get('/comments/', { location: this.props.match.params.id }).then(res => {
      this.setState({ comments: res.data.sort((a, b) => moment(b.created) - moment(a.created))})
    })
  }

  submitComment = () => {
    axios.post("/comments/", {
      comment: swearjar.censor(this.state.comment),
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
        const index = oldState.comments.indexOf(comment);
        if (index !== -1) {
          const newComments = [...oldState.comments];
          newComments[index] = res.data;
          console.log(newComments);
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
          <BackLink href="/"><FontAwesomeIcon icon={faArrowLeft}/> Go Back</BackLink>
          <Header><h1>{location.city}</h1></Header>
          <InfoHeader>
            <InfoText>
              <Link target="_blank" href={`https://maps.google.com/?q=${location.address}, ${location.city}, MA`}>
                <StyledFAI icon={faHome}/>
                {location.address}
              </Link>
            </InfoText>
            <InfoText>
              <Link target="_blank" href={`mailto:${location.email}`}>
                <StyledFAI icon={faEnvelope}/>
                {location.email}
              </Link>
            </InfoText>
            <InfoText>
              <Link target="_blank" href={`tel:${location.fax}`}>
                <StyledFAI icon={faPhone}/>
                {location.fax}
              </Link>
            </InfoText>
          </InfoHeader>
        </SneakyBackground>
        <Frame>
          <Input.TextArea
            rows="3"
            placeholder={`Know something we don't? Submit a comment for ${location.city}. Please include sources for your information!`}
            onChange={({target: { value }}) => this.setState({ comment: value })}>
          </Input.TextArea>
          <PostButton onClick={this.submitComment}>
            Post
          </PostButton>
          {comments.map(comment => <Comment comment={comment} report={() => this.report(comment)}/>)}
        </Frame>
      </>
    )
  }
}

export default Town;