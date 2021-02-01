import React, {Component} from 'react';
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  h1 {
    font-size: 26px;
    :hover {
      color: red;
    }
  }
  h2 {
    font-size: 1.2rem;
    color: grey;
  }
`;

export default class AppHeader extends Component {
  render () {
    const {liked, allPosts} = this.props;
    return (
      <Header className="app-header">
        <h1>Max Novikov</h1>
        <h2>{allPosts} записей, из них понравилось {liked}</h2>
      </Header>
    )
  }
}