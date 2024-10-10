import logo from './logo.svg';
import './App.css';
import Counter from './counter';
import Toggle from './toggle';
import FormName from './formName';
import NameList from './nameList'
import SearchableNameList from './searchName';
import SimpleClock from './simpleClock'
import TodoList from './todoList'

const ex1 = <p>Hello, world!</p>;

function UserGreeting(props) {
    return <p>Hello, {props.name}!</p>;
}

function App() {

    return (
        <div className="App">
            <header className="App-header">
                ex:1
                {ex1}
                ex:2
                <UserGreeting name="Nhu Khanh"/>
                <a href="./counter">ex3:</a>
                <Counter/>
                ex4:
                <Toggle/>
                ex:5
                <FormName/>
                ex:6
                <NameList/>
                ex:7
                <SearchableNameList/>
                ex:8
                <SimpleClock/>
                ex:9
                <TodoList/>
            </header>
        </div>
    );
}

export default App;
