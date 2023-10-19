import PropTypes from "prop-types"
import React from "react"
import Headroom from "react-headroom"
import styled from "styled-components"
import Flex from "./Flex"
import Separator from "./Separator"
import TapTarget from "./TapTarget"
import StarIcon from "./icons/Star"
import ChevronIcon from "./icons/Chevron"
import NavBarTabs from "./NavBarTabs"

const NavBar = ({navBarConfig}) => {
  const {goBack, isFollowing, onClickFollow, tabs} = navBarConfig

  return (
    <Headroom>
      <OuterFlex alignItems="center" justifyContent="flex-end">
        {goBack && (
          <ButtonDiv isLeft>
            <TapTarget onClick={goBack}>
              <ButtonFlex alignItems="center" justifyContent="center">
                <ChevronIcon />
              </ButtonFlex>
            </TapTarget>
          </ButtonDiv>
        )}
        <TabsDiv>
          <NavBarTabs tabs={tabs} />
        </TabsDiv>
        {onClickFollow && (
          <ButtonDiv>
            <TapTarget onClick={onClickFollow}>
              <ButtonFlex alignItems="center" justifyContent="center">
                <StarIcon isColored={isFollowing} />
              </ButtonFlex>
            </TapTarget>
          </ButtonDiv>
        )}
      </OuterFlex>
      <Separator />
    </Headroom>
  )
}

const ButtonDiv = styled(({isLeft, ...props}) => <div {...props} />)`
  position: absolute;
  top: 0;
  ${(props) => (props.isLeft ? "left" : "right")}: 0;
`

const ButtonFlex = styled(Flex)`
  height: ${(props) => props.theme.navBar.outerHeight}px;
  width: ${(props) => props.theme.navBar.outerHeight}px;
`

const OuterFlex = styled(Flex)`
  background-color: ${(props) => props.theme.color.background.primary};
  height: ${(props) => props.theme.navBar.outerHeight}px;
`

const TabsDiv = styled.div`
  flex-grow: 1;
`

NavBar.propTypes = {
  isSticky: PropTypes.bool,
  navBarConfig: PropTypes.shape({
    goBack: PropTypes.func,
    isFollowing: PropTypes.bool,
    onClickFollow: PropTypes.func,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        isActive: PropTypes.bool,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func,
      })
    ),
  }),
}

NavBar.defaultProps = {
  isSticky: false,
  navBarConfig: {},
  tabs: [],
}

export default React.memo(NavBar)
