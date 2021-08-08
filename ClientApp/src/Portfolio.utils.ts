export function logError(error: Error, info: {componentStack: string}) {
    fetch('/api/logging/log',
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },  
        body: JSON.stringify({ 
            name: error.name, 
            message: error.message,
            callStack: error.stack,
            componentCallStack: info.componentStack,
            url: window.location.href
        })
      }).then(response => {
        if (response.status !== 200) {
            // todo: retry logic?
        }
      }).catch(e => {
        //todo: retry logic?
      });
};
