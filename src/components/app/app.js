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
           ]
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

   render() {
       const {data} = this.state;

       const employees = data.length;
       const increased = data.filter(item => item.increase).length;
       const liked = data.filter(item => item.like).length;


    return (
        <div className="app">
            <AppInfo
                allItems={employees}
                increased={increased}
                liked={liked}/>

            <div className='search-panel'>
                <SearchPanel/>
                <AppFilter/>
            </div>

            <EmployeesList 
                data={this.state.data}
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}/>
            <EmployeesAddForm
                onAdd={this.addItem}/>
        </div>
    );
   }
}

export default App;