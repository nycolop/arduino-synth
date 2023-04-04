module.exports = `
    <button>Start app</button>
    
    <h1>Note is: ${null}</h1>
    
    <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
    <script>
        const socket = io();
        const h1 = document.querySelector('h1');

        socket.on('sending note', note => {
            h1.innerText = 'Current note: ' + note;
        });
    </script>
`;
