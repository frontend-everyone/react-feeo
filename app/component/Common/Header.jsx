import React from 'react';

// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

import '../../public/css/common/Index.pcss';
import Loading from '../common/Loading';
import Toast from '../common/Toast';

const Header = () =>
    <div className="Header">
        <Toast ref={c => window.Toast = c}/>
        <Loading ref={c => window.Loading = c}/>
    </div>
;

export default Header;