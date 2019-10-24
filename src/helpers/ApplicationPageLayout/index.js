import React from 'react';
import './index.scss';

export default function ApplicationPageLayout({
   children
}) {
   return (
       <div className='application-page-layout'>     
           {children}
       </div>
   );
};