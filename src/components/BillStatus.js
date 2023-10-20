import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Text from "./Text"
import Gutter from "./Gutter"

const BillStatus = ({status}) => {
  return (
    <>
      {status.map(({actions, date, isActive, key, label}, index) => {
        const isCompleted = !!date
        const isLastStep = index === status.length - 1

        return (
          <StepDiv key={key}>
            {index < status.length - 1 && <StepLineDiv isCompleted={isCompleted} />}
            <IndicatorDiv isActive={isActive} isCompleted={isCompleted} />
            <ContentDiv isCompleted={isCompleted}>
              <Text
                color={isActive || isCompleted ? "content.primary" : "content.tertiary"}
                fontWeight="bold"
                isBlock
                lineHeight="condensed"
              >
                {label}
              </Text>
              {(isActive || isCompleted) && <Text fontSize="p2">{isActive ? "Now" : date}</Text>}
              {actions.map((action, index) => {
                return (
                  <ActionDiv isLastStep={isLastStep} key={index}>
                    <Gutter>
                      <Text fontSize="p2" fontWeight="bold">
                        {action.message}
                      </Text>{" "}
                      <Text fontSize="p2">— {action.date}</Text>
                    </Gutter>
                  </ActionDiv>
                )
              })}
            </ContentDiv>
          </StepDiv>
        )
      })}
    </>
  )
}

const ActionDiv = styled(({isLastStep, ...props}) => <div {...props} />)`
  background-color: ${(props) => props.theme.color.background.secondary};
  border-radius: 4px;
  margin-top: ${(props) => props.theme.gutter.medium}px;
  position: relative;

  &::before {
    border-bottom: 8px solid ${(props) => (props.isLastStep ? "#616C77" : "transparent")};
    border-left: ${(props) => props.isLastStep && "8px solid transparent"};
    border-right: 8px solid ${(props) => (props.isLastStep ? "transparent" : props.theme.color.background.secondary)};
    border-top: 8px solid transparent;
    content: "";
    display: block;
    height: 0;
    left: 0;
    position: absolute;
    top: ${(props) => (props.isLastStep ? 0 : "50%")};
    transform: ${(props) => (props.isLastStep ? "translate(16px, -16px)" : "translate(-8px, -50%)")};
    width: 0;
  }

  .link {
    color: ${(props) => props.theme.color.link.primary};
  }
`

const ContentDiv = styled(({isCompleted, ...props}) => <div {...props} />)`
  padding-left: ${(props) => props.theme.gutter.medium * 1.5}px;
`

const IndicatorDiv = styled(({isActive, isCompleted, ...props}) => <div {...props} />)`
  height: ${(props) => props.theme.fontSize.p1}px;
  left: 0;
  position: absolute;
  top: 0;
  width: ${(props) => props.theme.fontSize.p1}px;

  &::before {
    background-color: ${(props) => (!props.isCompleted ? "white" : props.theme.color.content.primary)};
    border: 2px solid
      ${(props) =>
        !props.isActive && !props.isCompleted ? props.theme.color.content.tertiary : props.theme.color.content.primary};
    border-radius: 50%;
    content: "";
    display: block;
    height: 8px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
  }
`

const StepDiv = styled.div`
  position: relative;

  &:not(:last-of-type) {
    padding-bottom: ${(props) => props.theme.gutter.medium}px;
  }
`

const StepLineDiv = styled(({isCompleted, ...props}) => <div {...props} />)`
  border-right: 2px ${(props) => (props.isCompleted ? "solid" : "dashed")}
    ${(props) => (props.isCompleted ? props.theme.color.content.primary : props.theme.color.content.tertiary)};
  bottom: -8px;
  left: ${(props) => props.theme.fontSize.p1 / 2}px;
  position: absolute;
  top: 8px;
  transform: translateX(-1px);
`

BillStatus.propTypes = {
  status: PropTypes.arrayOf(
    PropTypes.shape({
      actions: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.string.isRequired,
          message: PropTypes.string.isRequired,
        })
      ).isRequired,
      date: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default BillStatus
