import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/authAdminProposal.service";
import Navbar from './layout/Navbar';

// Css
import '../../../css/arsipSurat/dashboardAdminArsipSurat.css';

const DashboardAdminProposal = () => {

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    AuthService.whoami()
      .then((response) => {
        setCurrentUser(response);
      })
      .catch((error) => {
        if(error.response.status === 401){
           setCurrentUser(undefined);
           navigate("/login_admin_proposal")
        }
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  return (
    <div>
    {currentUser && 
      <Navbar currentUserLogin={currentUser}>
        <h1 className="mt-5 text-center">Dashboard Admin</h1> 
      </Navbar>
    }
    </div>
      
  );
};
export default DashboardAdminProposal;