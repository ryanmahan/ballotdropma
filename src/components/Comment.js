import React from "react";
import moment from "moment";
import styled from "styled-components";
import { Button } from "antd";
import Frame from "./Frame";
import SessionContext from "./SessionContext";

const Spread = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Card = styled(Frame)`
  border: rgba(0, 0, 0, 0.2) 1px solid;
  border-radius: 2%;
  padding: 1vh 1vh;
`

const Comment = ({ comment, report }) => {

  const sessionId = React.useContext(SessionContext);
  console.log(sessionId)

  return (
    <Card>
      <p>{comment.comment}</p>
      <Spread>
        <i>{moment(comment.created).format("MMM, DD")}</i> 
        { comment.reports.includes(sessionId) 
          ? <Button disabled>Reported</Button>
          : <Button type="ghost" onClick={report}>Report</Button>
        }
      </Spread>
    </Card>
  )
  
};

export default Comment;