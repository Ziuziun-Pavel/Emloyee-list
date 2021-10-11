import './app-info.css';

const AppInfo = ({employees, increased, liked}) => {
    return (
        <div className="app-info">
            <h1>Учёт сотрудников в компании <span>*Z*ustem *P*echnologies</span></h1>
            <h2>Общее число сотрудников: {employees}</h2>
            <h2>Премию получат: {increased}</h2>
            <h2>Лучшие сотрудники: {liked}</h2>
        </div>
    )
}

export default AppInfo;