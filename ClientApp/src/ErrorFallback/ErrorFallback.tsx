import { Button } from 'antd';
import React from 'react';

const ErrorFallback : React.FC<any> = ({error, resetErrorBoundary}: any) => (
    <div style={{width:'100%', height:'100%', display: 'flex', justifyContent:'center', alignItems:'center'}}>
      <div style={{display: 'flex', flexFlow: 'column', alignItems: 'center'}}>
        <h1 style={{textAlign: 'center'}}>Something went wrong. Please try again or select another option in sidebar.</h1>
        <div>
          <Button type="primary" size="large" onClick={resetErrorBoundary}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  )

export default ErrorFallback;