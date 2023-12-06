import styled from "styled-components";

export const StyledMenu = styled.menu`
  margin-left: auto;
  .nav-item {
    background-color: ${({ theme }) => theme.navbarLinkBgColor};

    @media (min-width: 992px) {
      background-color: ${({ theme }) => theme.transparent};
    }
  }
`;
