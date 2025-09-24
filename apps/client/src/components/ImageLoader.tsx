// React Imports
import { useState } from 'react';

// External Dependencies
import {
  Paper,
  Box,
  Autocomplete,
  TextField,
  Button,
  FormLabel,
} from '@mui/material';

// Components
import ImageGrid from './ImageGrid';

// Types
import type { ImageLoaderProps, Image } from '../types/image.types';

/**
 * Image Loader component
 */
const ImageLoader = ({ onSubmit, onDelete, photos }: ImageLoaderProps) => {
  const [file, setFile] = useState<File | null>(null);

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
                <FormLabel htmlFor="avatar">Select an image: &nbsp;</FormLabel>
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
                disabled={!file}
                type="submit"
                sx={{ width: '100%' }}
              >
                Upload
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
      <ImageGrid
        onDelete={onDelete}
        filteredList={filteredList}
      />
    </Box>
  );
};

export default ImageLoader;
