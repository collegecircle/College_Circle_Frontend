const PDFViewer = ({ file }) => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full h-full max-w-4xl border border-gray-300 rounded-xl overflow-hidden shadow-lg">
        <iframe
          src={file}
          width="100%"
          height="100%"
          style={{ border: "none", backgroundColor: "transparent" }}
          title="PDF Viewer"
        ></iframe>
      </div>
    </div>
  );
};

export default PDFViewer;
