import PropTypes from "prop-types"
import React from "react"
import Gutter from "./Gutter"
import Separator from "./Separator"

const BillVotes = ({votes}) => {
  return (
    <>
      {votes.map((vote) => {
        return (
          <div key={vote.id}>
            <Gutter>
              <div>
                {vote.month} {vote.day} {vote.time}
              </div>
              <div>{vote.chamber}</div>
              <div>{vote.question}</div>
              <div>Roll call: {vote.rollCall}</div>
              <div>Yes: {vote.totalYes}</div>
              <div>No: {vote.totalNo}</div>
              <div>Not voting: {vote.totalNotVoting}</div>
              <div>Result: {vote.result}</div>
            </Gutter>
            <Separator />
          </div>
        )
      })}
    </>
  )
}

BillVotes.propTypes = {
  votes: PropTypes.arrayOf(PropTypes.shape({})),
}

BillVotes.defaultProps = {
  votes: [],
}

export default BillVotes
