// React Imports
import { useEffect, useState } from 'react';

// External Dependencies
import axios from 'axios';

// Components
import ImageLoader from './components/ImageLoader';

// Types
import type { FormEvent } from 'react';
import type { Image } from './types/image.types';

function App() {
  const [photos, setPhotos] = useState<Image[]>([]);

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    if (formData.get('avatar')) {
      try {
        const res = await axios.post(
          'http://localhost:3000/api/images',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        console.log('Newly created file', res.data);
      } catch (error) {
        console.error(error);
      }

      // reset form
      form.reset();
    }
  };

  const updatePhotos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/images');
      setPhotos(res.data);
    } catch (err) {
      console.error('Error fetching photos', err);
    }
  };

  const deletePhoto = async (target: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/images/${target}`);

      console.log('Photo deleted successfully');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    updatePhotos();
  }, []);

  return (
    <ImageLoader
      onSubmit={async (e) => {
        await handleUpload(e);
        await updatePhotos();
      }}
      photos={photos}
      onDelete={async (targetName) => {
        await deletePhoto(targetName);
        await updatePhotos();
      }}
    />
  );
}

export default App;
