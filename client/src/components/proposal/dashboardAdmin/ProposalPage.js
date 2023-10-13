import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../../../services/authAdminProposal.service";
import ProposalService from "../../../services/proposal.service";
import Navbar from './layout/Navbar';
import Table from "./TabelProposal";

import Swal from 'sweetalert2';

// Icon
import { Plus, Trash, EyeFill, PencilSquare } from 'react-bootstrap-icons';

// Css
import '../../../css/arsipSurat/suratMasukdanKeluar.css';

const formatTanggal = (tanggal) => {
   const event = new Date(tanggal);
   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
   return event.toLocaleDateString('id-ID', options);
}

function ProposalPage() {

    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);
    const [dataProposal, setDataProposal] = useState([]);

    const dataProposalRef = useRef();
    dataProposalRef.current = dataProposal;

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

        ProposalService.getDataProposal()
          .then((response) => {
            setDataProposal(response.data);
          })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteSurat = (rowIndex) => {
      const id = dataProposalRef.current[rowIndex].id;
      const filePdf = dataProposalRef.current[rowIndex].file_proposal;
      ProposalService.deleteProposal(id)
          .then((response) => {
            
            ProposalService.deleteFileProposal(filePdf);

            navigate("/admin_proposal")
            let newDataProposal = [...dataProposalRef.current];
            newDataProposal.splice(rowIndex, 1);
            setDataProposal(newDataProposal);

            Swal.fire(
              {title: 'Berhasil Menghapus Proposal',
                icon: 'success'}
            )
          })
    }

    const columns = useMemo(
      () => [
        {
          Header: 'Nama Lengkap',
          accessor: 'nama_lengkap',
          // Use our custom `fuzzyText` filter on this column
          filter: 'fuzzyText',
        },
        {
          Header: 'No Telpon',
          accessor: 'no_telp',
          // Use our custom `fuzzyText` filter on this column
          filter: 'fuzzyText',
        },
        {
          Header: 'Email',
          accessor: 'email',
          // Use our custom `fuzzyText` filter on this column
          filter: 'fuzzyText',
        },
        {
          Header: 'Perihal',
          accessor: 'perihal',
          // Use our custom `fuzzyText` filter on this column
          filter: 'fuzzyText',
        },
        {
          Header: 'Tanggal Pengajuan',
          accessor: d => formatTanggal(d.createdAt),
          // Use our custom `fuzzyText` filter on this column
          filter: 'fuzzyText',
        },
        {
          Header: 'Asal Instansi',
          accessor: 'asal_instansi',
          // Use our custom `fuzzyText` filter on this column
          filter: 'fuzzyText',
        },
        {
          Header: 'Status',
          accessor: 'status',
          // Use our custom `fuzzyText` filter on this column
          filter: 'fuzzyText',
        },
        {
          Header: 'Action',
          accessor: 'action',
          disableGlobalFilter: true,
          Cell: (props) => {
            const rowIdx = props.row.id;
            return (
              <div>
                <Link to={`/admin_proposal/detail/${dataProposalRef.current[rowIdx].id}`} className="btn btn-primary">
                  <EyeFill />
                </Link>
                <Link to={`/admin_proposal/edit/${dataProposalRef.current[rowIdx].id}`} className="btn btn-warning">
                  <PencilSquare />
                </Link>
                <button className="btn btn-danger" onClick={() => deleteSurat(rowIdx)}>
                  <Trash />
                </button>
              </div>
            )
          },
        },
      ], // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    )


    return (
      <div>
        {currentUser &&

        <Navbar currentUserLogin={currentUser}>
          <Table columns={columns} dataSurat={dataProposal}>
          </Table>
        </Navbar>

        }
      </div>
    )
}

export default ProposalPage;