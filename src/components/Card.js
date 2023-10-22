import styled from "styled-components"
import PropTypes from "prop-types"
import React from "react"
import Flex from "./Flex"
import Gutter from "./Gutter"
import Spacer from "./Spacer"
import Text from "./Text"

const Card = ({children, description, slot, title}) => {
  return (
    <OuterDiv>
      {(title || slot) && (
        <Flex isWrapped={false}>
          <Gutter style={{flexGrow: 1}}>
            {title && (
              <Text fontWeight="black" isBlock>
                {title}
              </Text>
            )}
            {description && (
              <>
                <Spacer size="small" />
                <Text>{description}</Text>
              </>
            )}
          </Gutter>
          {slot}
        </Flex>
      )}
      {children}
    </OuterDiv>
  )
}

const OuterDiv = styled.div`
  background-color: ${(props) => props.theme.color.background.primary};
`

Card.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string,
  slot: PropTypes.node,
  title: PropTypes.string,
}

Card.defaultProps = {
  description: "",
  slot: null,
  title: "",
}

export default Card
