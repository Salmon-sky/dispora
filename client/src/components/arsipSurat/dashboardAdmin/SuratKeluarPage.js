import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../../../services/authAdminArsipSurat.service";
import ArsipSuratService from "../../../services/arsipSurat.service";
import Navbar from './layout/Navbar';
import Table from "./TabelDataSurat";

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

function SuratKeluarPage() {

    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);
    const [dataSuratMasuk, setDataSuratMasuk] = useState([]);

    const dataSuratMasukRef = useRef();
    dataSuratMasukRef.current = dataSuratMasuk;

    useEffect(() => {
      AuthService.whoami()
        .then((response) => {
          setCurrentUser(response);
        })
        .catch((error) => {
          if(error.response.status === 401){
             setCurrentUser(undefined);
             navigate("/login_admin_arsip_surat")
          }
        });

        ArsipSuratService.getDataSuratKeluar()
          .then((response) => {
            setDataSuratMasuk(response.data);
          })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteSurat = (rowIndex) => {
      const id = dataSuratMasukRef.current[rowIndex].id;
      const filePdf = dataSuratMasukRef.current[rowIndex].file_pdf;
      ArsipSuratService.deleteSuratKeluar(id)
          .then((response) => {
            
            ArsipSuratService.deleteFileSuratKeluar(filePdf);

            navigate("/admin_surat_keluar")
            let newDataSurat = [...dataSuratMasukRef.current];
            newDataSurat.splice(rowIndex, 1);
            setDataSuratMasuk(newDataSurat);

            Swal.fire(
              {title: 'Berhasil Menghapus Surat Keluar',
                icon: 'success'}
            )
          })
    }

    const columns = useMemo(
      () => [
        {
          Header: 'Tanggal Masuk',
          accessor: d => formatTanggal(d.tanggal_masuk),
          // Use our custom `fuzzyText` filter on this column
          filter: 'fuzzyText',
        },
        {
          Header: 'Kode Surat',
          accessor: 'kode_surat',
          // Use our custom `fuzzyText` filter on this column
          filter: 'fuzzyText',
        },
        {
          Header: 'Nomor Surat',
          accessor: 'nomor_surat',
          // Use our custom `fuzzyText` filter on this column
          filter: 'fuzzyText',
        },
        {
          Header: 'Kepada',
          accessor: 'kepada',
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
          Header: 'Bagian',
          accessor: 'bagian',
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
          Header: 'Hak Akses',
          accessor: 'hak_akses',
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
                <Link to={`/admin_surat_keluar/detail/${dataSuratMasukRef.current[rowIdx].id}`} className="btn btn-primary">
                  <EyeFill />
                </Link>
                <Link to={`/admin_surat_keluar/edit/${dataSuratMasukRef.current[rowIdx].id}`} className="btn btn-warning">
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
          <Link to={"/admin_surat_keluar/tambah"} className="btn btn-tambah-surat mt-4"> <Plus />  Tambah Surat Keluar</Link>
          <Table columns={columns} dataSurat={dataSuratMasuk}>
          </Table>
        </Navbar>

        }
      </div>
    )
}

export default SuratKeluarPage;