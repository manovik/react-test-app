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
          important: false,
          like: true,
          id: 1
        },
        {
          label: "Going to dream",
          important: true,
          like: false,
          id: 2
        },
        {
          label: "Going to keep",
          important: false,
          like: false,
          id: 3
        }
      ],
      maxId: 3,
      term: '',
      filter: 'all'
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onToggleLiked = this.onToggleLiked.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
  }

  deleteItem(id) {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);

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

  toggleParameter(data, id, param) {
      const index = data.findIndex(elem => elem.id === id);
      const old = data[index];
      const newElem = {...old, [param]: !old[param]};
      const newArr = [...data.slice(0, index), newElem, ...data.slice(index + 1)];

      return newArr;
  }

  onToggleImportant(id) {
    this.setState( ({data} ) => {
      return {
        data: this.toggleParameter(data, id, 'important')
      }
    });
  }

  onToggleLiked(id) {
    this.setState( ({data} ) => {
      return {
        data: this.toggleParameter(data, id, 'like')
      }
    });
  }

  searchPosts(arr, term) {
    if(term.length === 0) return arr;

    return arr.filter( (item) => {
      return item.label.indexOf(term) > -1; 
    });
  }

  onUpdateSearch(term) {
    this.setState({ term });
  }

  filterPosts(arr, filter) {
    if(filter === 'like') {
      return arr.filter(item => item.like)
    } else {
      return arr;
    }
  }

  onFilterSelect(filter) {
    this.setState({ filter  });
  }

  render() {
    const {data, term, filter} = this.state;
    const liked = data.filter(item => item.like).length;
    const allPosts = data.length;

    const visiblePosts = this.filterPosts(this.searchPosts(data, term), filter) 

    return (
      <AppBlock className="app">
        <AppHeader 
          liked={liked}
          allPosts={allPosts}/>
        <div className="search-panel d-flex">
          <SearchPanel
            onUpdateSearch={this.onUpdateSearch}/>
          <PostStatusFilter 
            filter={filter}
            onFilterSelect={this.onFilterSelect}/>
        </div>
        <PostList 
          posts={visiblePosts}
          onDelete={this.deleteItem} 
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked}/>
        <PostAddForm
          onAdd={this.addItem}/>
      </AppBlock>
    )
  }

}