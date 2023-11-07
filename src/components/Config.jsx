function Config({ start, setCity, city, isOnline }) {
    return (
        <>
            <div>
                <div>
                    <span>City Name</span>
                </div>
                <input id='inCity'
                    placeholder="Enter city here..."
                    defaultValue={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={start} className={isOnline ? 'on' : ''}>Start</button>
                <button onClick={() => window.location.reload()}>Refresh</button>
            </div>
        </>
    );   
}

export default Config;