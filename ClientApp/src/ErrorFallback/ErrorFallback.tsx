import { Button } from 'antd';
import React from 'react';

const ErrorFallback : React.FC<any> = ({error, resetErrorBoundary}: any) => (
    <div style={{width:'100%', height:'100%', display: 'flex', justifyContent:'center', alignItems:'center'}}>
      <div style={{display: 'flex', flexFlow: 'column', alignItems: 'center'}}>
        <h1 style={{textAlign: 'center'}}>Something went wrong. Please reload the page.</h1>
        <div>
          <Button type="primary" size="large" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      </div>
    </div>
  )

export default ErrorFallback;