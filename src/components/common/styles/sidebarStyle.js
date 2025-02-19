import styled from 'styled-components';

const StyledSidebar = styled.div`
  display: flex;
  width: 20%;
  flex-direction: column;
  border: none;
  padding: 1.5% 10px 3% 20px;
  margin: 1.5% 1% 3.5% 2%;
  height: 100vh;
  justify-content: space-around;
  background-color: #141414;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 12px;
  a {
    color: white;
    text-decoration: none;
    font-size: 1.8rem;
    font-weight: 520;
    transition: 0.25s;

    :hover {
      opacity: 0.5;
    }
  }
  .active-sidebar-room {
    color: white;
    background-color: #0d0d0d;
    width: 93%;
    padding: 3% 10px 3% 10px;
    margin: 2% 0% 2% 1%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 8px;
  }
`;

export default StyledSidebar;
