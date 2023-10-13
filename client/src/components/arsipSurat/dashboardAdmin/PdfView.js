import React, { useState } from "react";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

// Css
import '../../../css/arsipSurat/pdf.css';

export default function SinglePage(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const { pdf } = props;

  return (
    <>
    <div className="modal fade" id="pdfView" tabIndex="-1" aria-labelledby="pdfViewLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="pdfViewLabel">Lihat Pdf</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <Document
              file={pdf}
              options={{ workerSrc: "/pdf.worker.js" }}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </div>
          <div className="modal-footer">
            <div className="page-number-pdf">
              <p className="page-number-pdf">
                Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
              </p>
              <button className="button-pdf" type="button" disabled={pageNumber <= 1} onClick={previousPage}>
                Previous
              </button>
              <button
                className="button-pdf"
                type="button"
                disabled={pageNumber >= numPages}
                onClick={nextPage}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
