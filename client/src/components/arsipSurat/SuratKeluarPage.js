import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import ArsipSuratService from "../../services/arsipSurat.service";
import Navbar from './layout/Navbar';
import Table from "./dashboardAdmin/TabelDataSurat";

// Icon
import { EyeFill, Download } from 'react-bootstrap-icons';

// Css
import '../../css/arsipSurat/suratMasukdanKeluar.css';

const formatTanggal = (tanggal) => {
   const event = new Date(tanggal);
   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
   return event.toLocaleDateString('id-ID', options);
}

function SuratKeluarPagePublic() {

    const [dataSuratMasuk, setDataSuratMasuk] = useState([]);

    const dataSuratMasukRef = useRef();
    dataSuratMasukRef.current = dataSuratMasuk;

    useEffect(() => {

        ArsipSuratService.getDataSuratKeluarPublic()
          .then((response) => {
            setDataSuratMasuk(response.data);
          })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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
          Header: 'Action',
          accessor: 'action',
          disableGlobalFilter: true,
          Cell: (props) => {
            const rowIdx = props.row.id;
            return (
              <div>
                <Link to={`/arsip_surat/surat_keluar/detail/${dataSuratMasukRef.current[rowIdx].id}`} className="btn btn-primary">
                  <EyeFill />
                </Link>
                <a className="btn btn-success" href={ArsipSuratService.downloadFileSuratKeluar(dataSuratMasukRef.current[rowIdx].file_pdf)} target="_blank" rel="noreferrer">
                  <Download />
                </a>
              </div>
            )
          },
        },
      ], // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    )


    return (
      <div>
        <Navbar>
          <Table columns={columns} dataSurat={dataSuratMasuk}>
          </Table>
        </Navbar>
      </div>
    )
}

export default SuratKeluarPagePublic;