import React, {Component} from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import styled from "styled-components";

const AppBlock = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          label: "Going to swim",
          important: true,
          id: 1
        },
        {
          label: "Going to dream",
          important: false,
          id: 2
        },
        {
          label: "Going to keep",
          important: false,
          id: 3
        }
      ],
      maxId: 3
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);

  }

  deleteItem(id) {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);
      const indexes = data.map(elem => elem.id);
      console.log(indexes);

      const before = data.slice(0, index);
      const after = data.slice(index + 1);
      const newArr = [...before, ...after];
      return {
        data: newArr
      }
    });
  }

  addItem(body) {
    const newId = this.state.maxId + 1;
    const newItem = {
      label: body,
      important: false,
      id:  newId
    }
    this.setState(({data}) => {
      const newData = [...data, newItem];
      return {
        data: newData,
        maxId: newId
      };
    });
  }

  render() {
    return (
      <AppBlock className="app">
        <AppHeader/>
        <div className="search-panel d-flex">
          <SearchPanel/>
          <PostStatusFilter/>
        </div>
        <PostList 
          posts={this.state.data}
          onDelete={this.deleteItem} />
        <PostAddForm
          onAdd={this.addItem}/>
      </AppBlock>
    )
  }

}