import React, { useEffect, useState } from "react"
import axios from "axios"
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';

function App() {
  const [sessions, setSessions ] = useState([]);
  const [session, setSession] = useState(null)

  const getSessions = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}sessions`)
    setSessions(data)
  }

  const seeReplay = async (item) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}records-sessions/${item.sessionId}`)
    setSession(data)
  }

  useEffect(() => {
    getSessions()
  }, [])

  useEffect(() => {
    if (session) {
      const playerElement = document.querySelector(".rr-player");
      if (playerElement) playerElement.remove()
      new rrwebPlayer({
        target: document.body, 
        props: {
          events: session.events,
        },
      });
    }
  }, [session])



  return (
    <div className="">
      <ul>
        { 
          sessions.map(item => {
            return (
              <li>
                  Session: {item.sessionId} | 
                  Route: {item.route} | 
                  User agent: {item.userAgent} |
                  Created At: {item.createdAt} &nbsp;
                  <button onClick={() => seeReplay(item)}>See replay</button>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
