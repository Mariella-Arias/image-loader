// React Imports
import { useState } from 'react';

// External Dependencies
import {
  Paper,
  Box,
  Grid,
  Autocomplete,
  TextField,
  Button,
  Modal,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Types
import type { ImageGridProps, Image } from '../types/image.types';

/**
 * Image Loader component
 */
const ImageLoader = ({ onSubmit, onDelete, photos }: ImageGridProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [targetFile, setTargetFile] = useState<string | null>(null);

  // Modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  // Autocomplete
  const [value, setValue] = useState<string | null>('');
  const [inputValue, setInputValue] = useState('');

  // Filter photos when a single image is selected from dropdown
  const filteredList = value
    ? photos.filter((photo) => photo.label === value)
    : photos;

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        padding: '1.5rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        gap: '1.5rem',
        backgroundColor: 'gainsboro',
      }}
    >
      <Paper
        elevation={2}
        sx={{
          minHeight: '150px',
          display: 'flex',
          justifyContent: 'space-around',
          padding: '1rem',
          flexWrap: 'wrap',
          overflow: 'hidden',
        }}
      >
        <Autocomplete
          disablePortal
          options={photos}
          value={value}
          onChange={(event: any, newValue: Image) => {
            if (newValue) {
              setValue(newValue.label);
            } else {
              setValue(null);
            }
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          sx={{
            minWidth: '300px',
            padding: '1rem',
            maxHeight: '3.5rem',
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search images"
            />
          )}
        />
        <Box
          sx={{
            padding: '1rem',
            minWidth: '300px',
          }}
        >
          <form
            action="/api/images"
            method="post"
            encType="multipart/form-data"
            onSubmit={async (e) => {
              // trigger submit handler
              await onSubmit(e);

              // reset file state
              setFile(null);
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <label htmlFor="avatar">Select an image: &nbsp;</label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    // update file data
                    if (e.target.files) {
                      setFile(e.target.files[0]);
                    }
                  }}
                />
              </Box>

              <Button
                variant="contained"
                disabled={file === null}
                type="submit"
                sx={{ width: '100%' }}
              >
                Upload
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
      <Paper
        elevation={2}
        sx={{
          flex: 1,
          overflow: 'auto',
        }}
      >
        {filteredList.length > 0 ? (
          <Grid
            container
            spacing={3}
            direction="row"
            sx={{ padding: '1.5rem', overflow: 'auto' }}
          >
            {filteredList.map(({ path, label }) => (
              <Grid
                key={label}
                sx={{
                  borderRadius: '10px',
                  width: '250px',
                  height: '270px',
                  position: 'relative',
                }}
              >
                <Modal
                  open={modalOpen}
                  onClose={handleClose}
                  aria-labelledby="modal-confirm-title"
                  aria-describedby="modal-confirm-confirmation"
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 400,
                      bgcolor: 'background.paper',
                      borderRadius: '10px',
                      boxShadow: 24,
                      p: 4,
                    }}
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Delete Image
                    </Typography>
                    <Typography
                      id="modal-modal-description"
                      sx={{ mt: 2 }}
                    >
                      This action is irreversible. Are you sure you want to
                      delete this image?
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', gap: '1rem' }}>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ flex: 1 }}
                        onClick={() => {
                          // delete image
                          if (targetFile) {
                            onDelete(targetFile);
                          }

                          // hide modal
                          handleClose();
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ flex: 1 }}
                        onClick={() => handleClose()}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Modal>

                <Box
                  sx={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    overflow: 'hidden',
                  }}
                  onClick={() => setTargetFile(path)}
                >
                  <IconButton
                    onClick={handleOpen}
                    sx={{
                      position: 'absolute',
                      zIndex: '30',
                      right: 0,
                      transform: 'translate(-0.25rem, 0.25rem)',
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <img
                    src={`http://localhost:3000/${path}`}
                    alt="image-alt"
                    style={{
                      position: 'absolute',
                      height: 'auto',
                      width: '250px',
                      aspectRatio: 1,
                      borderRadius: '10px',
                    }}
                  />
                  <figcaption
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      paddingLeft: '0.5rem',
                      transform: 'translateY(0.25rem)',
                      fontStyle: 'italic',
                    }}
                  >
                    {label}
                  </figcaption>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="body1"
            sx={{
              padding: '1rem',
              width: 'fit-content',
              fontStyle: 'italic',
            }}
          >
            No images in store
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ImageLoader;
