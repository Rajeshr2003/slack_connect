import  { useState } from 'react';
import './App.css';

const mockChannels = [
  { id: 'C01', name: 'general' },
  { id: 'C02', name: 'random' }
];

function App() {
  const [connected, setConnected] = useState(false);
  const [channel, setChannel] = useState(mockChannels[0].id);
  const [message, setMessage] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [scheduled, setScheduled] = useState<any[]>([]);

  const handleConnect = () => {
    // TODO: Redirect to backend OAuth endpoint
    setConnected(true);
  };

  const handleSend = () => {
    // TODO: Send message immediately via backend
    alert(`Message sent to #${channel}: ${message}`);
    setMessage('');
  };

  const handleSchedule = () => {
    // TODO: Schedule message via backend
    const newItem = {
      id: Date.now(),
      channel: mockChannels.find(c => c.id === channel)?.name || channel,
      text: message,
      time: scheduleTime
    };
    setScheduled([...scheduled, newItem]);
    setMessage('');
    setScheduleTime('');
  };

  const handleCancel = (id: number) => {
    // TODO: Cancel scheduled message via backend
    setScheduled(scheduled.filter(item => item.id !== id));
  };

  return (
    <div className="app-container">
      <div className="header">Slack Connect</div>
      {!connected ? (
        <button className="connect-btn" onClick={handleConnect}>
          Connect Slack Workspace
        </button>
      ) : (
        <>
          <form className="form" onSubmit={e => e.preventDefault()}>
            <select className="select" value={channel} onChange={e => setChannel(e.target.value)} title="Select channel">
              {mockChannels.map(c => (
                <option key={c.id} value={c.id}>#{c.name}</option>
              ))}
            </select>
            <input
              className="input"
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <input
              className="input"
              type="datetime-local"
              value={scheduleTime}
              onChange={e => setScheduleTime(e.target.value)}
              title="Schedule time"
              placeholder="Select date and time"
            />
            <div>
              <button className="send-btn" type="button" onClick={handleSend} disabled={!message}>
                Send Now
              </button>
              <button className="schedule-btn" type="button" onClick={handleSchedule} disabled={!message || !scheduleTime}>
                Schedule
              </button>
            </div>
          </form>
          <div className="scheduled-list">
            <h3>Scheduled Messages</h3>
            {scheduled.length === 0 ? (
              <p>No scheduled messages.</p>
            ) : (
              scheduled.map(item => (
                <div className="scheduled-item" key={item.id}>
                  <span>
                    <b>#{item.channel}</b>: {item.text} <br />
                    <small>{item.time}</small>
                  </span>
                  <button className="cancel-btn" onClick={() => handleCancel(item.id)}>Cancel</button>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
