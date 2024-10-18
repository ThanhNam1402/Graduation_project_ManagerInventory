import { Grid, Box, Typography, Badge } from "@mui/material";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

function Previews({ onGetFile }) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 6,
    onDrop: (acceptedFiles, fileRejections) => {
      console.log(acceptedFiles);
      console.log(fileRejections);

      if (fileRejections.length > 0) {
        alert("error");
      } else {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      }
    },
  });

  const thumbs = files.map((file, index) => (
    <Grid xs={2} item key={file.name}>
      <Badge
        color="success"
        onClick={() => handleDel(index)}
        badgeContent={"x"}
      >
        <img
          style={{
            maxWidth: "115px",
            minHeight: "90px",
            display: "block",
            width: "100%",
          }}
          src={file?.preview}
          onLoad={() => {
            URL.revokeObjectURL(file?.preview);
          }}
        />
      </Badge>
    </Grid>
  ));

  useEffect(() => {
    onGetFile(files);
  }, [files, onGetFile]);
  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const handleDel = (id) => {
    let currentFiles = [...files];
    let newFiles = currentFiles.filter((item, index) => index !== id);
    setFiles(newFiles);
  };

  return (
    <Box
      sx={{
        p: 1,
        borderRadius: 3,
        border: "1px dashed #333",
      }}
    >
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography>Chọn Ảnh Hoặc Kéo Vào</Typography>(
          <span>tối đa 5 ảnh</span>)
        </Box>
      </div>
      <Grid
        sx={{
          mt: 2,
          minHeight: 90,
        }}
        container
        spacing={1}
      >
        {thumbs}
      </Grid>
    </Box>
  );
}

export default Previews;
