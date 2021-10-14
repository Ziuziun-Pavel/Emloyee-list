import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import nextId from "react-id-generator";

import './app.css';

class App extends Component {
      
    constructor(props) {
        super(props);
        this.state = {
            data: [
               {name: 'Nick M.', salary: '800', increase: false,like: true, id: nextId()},
               {name: 'Sam S.', salary: '3000', increase: false,like: false, id: nextId()},
               {name: 'Paul Z.', salary: '6000', increase: true,like: false, id: nextId()},
           ],
           term: '',
           filter: 'all'
   }     
    }

    deleteItem = (id) => {
        this.setState(({data}) => {

            return {
                data: data.filter(item => item.id !== id)
            }
        });
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            like: false,
            id: nextId()
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if(term.length === 0 ) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
        
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    filterPost = (items, filter) => {
        switch(filter) {
            case 'rise':
                return items.filter(item => item.like);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000)
            default: 
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

   render() {
       const {data, term, filter} = this.state;
       const employees = data.length;
       const increased = data.filter(item => item.increase).length;
       const liked = data.filter(item => item.like).length;
       const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    return (
        <div className="app">
            <AppInfo
                allItems={employees}
                increased={increased}
                liked={liked}/>

            <div className='search-panel'>
                <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                <AppFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
            </div>

            <EmployeesList 
                data={visibleData}
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}/>
            <EmployeesAddForm
                onAdd={this.addItem}/>
        </div>
    );
   }
}

export default App;