import React, {useState, useEffect} from 'react';
import './App.css';
import Datatable from './components/DataTable';
import Newrec from './components/NewRec';
import Request from './Request';


function App() {
  const [st, setSt] = useState([]);

  useEffect(() => {
      Request.get("/")
        .then(res => { 
          const cellContent = res.data;
          setSt(cellContent)
        })
        .catch((err) => { 
          console.log(err);
        })
  });

    return (
    <div className="App">
      <h2>Таблица с данными</h2>
      <table>
        <tbody>
          <tr>
            <th>
                age
            </th>
            <th>
                email
            </th>
            <th>
                name
            </th>
            <th>
                phone
            </th>
          </tr>
          {st.map(function (cells) {
            if (cells.data !== undefined) {
              return (<Datatable cell={cells} key={cells._id} />)
            }else return null
          }
          )}
        </tbody>
      </table>
      <h3>Добавление новой записи</h3>
        <Newrec/>
      </div>
    );
}

export default App;
