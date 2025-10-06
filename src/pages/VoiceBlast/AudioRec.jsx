import React, { useState, useEffect } from 'react';
import DynamicTable from '../../components/DynamicTable';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import {API_URL, GET_METHOD } from '../../utility/constants';
import { useNavigate } from 'react-router-dom';


function AudioRec() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isUploading, setIsUploading] = useState(false); 
  const navigate = useNavigate();


  const fetchData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/audio/?page=${page + 1}&limit=${pageSize}`,
        GET_METHOD
      );
      const result = await response.json();
      if (result.success) {
        setData(result.data);
        setTotalItems(result.totalRecords);
      } else {
        console.error('Error fetching audio files:', result.message);
      }
    } catch (error) {
      console.error('Error fetching audio files:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

 
  const MAX_FILE_SIZE = 10 * 1024 * 1024; 

  const handleAddAudio = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert('File is too large! Please upload a file smaller than 10MB.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('audioFile', file);

    try {
      const response = await fetch(`${API_URL}/api/v1/audio/upload-audio`, {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload audio: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.message === 'Audio uploaded successfully') {
        alert('Audio uploaded successfully!');
        fetchData(); 
      } else {
        throw new Error(`Upload failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Error uploading audio:', error);
      alert('Failed to upload audio. Please try again.');
    } finally {
      setIsUploading(false); 
    }
  };

 
  const handleDeleteAudio = async (audioId) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/audio/delete-audio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ audioId }),
      });

      const result = await response.json();
      if (result.message === 'Audio deleted successfully') {
        alert('Audio deleted successfully!');
        fetchData();
      } else {
        console.error('Error deleting audio:', result.message);
      }
    } catch (error) {
      console.error('Error deleting audio:', error);
    }
  };

  const columns = [
    {
      accessorKey: 'sno',
      header: 'S.No.',
      cell: (info) => {
        const rowIndex = info.row.index + 1;
        const pageIndex = info.table.getState().pagination.pageIndex;
        const pageSize = info.table.getState().pagination.pageSize;
        const globalIndex = pageIndex * pageSize + rowIndex;
        return globalIndex.toString().padStart(2, '0');
      },
    },
    { accessorKey: 'audioName', header: 'Audio Name' },
    {
      accessorKey: 'createdAt',
      header: 'Uploaded At',
      cell: ({ getValue }) => {
        const date = new Date(getValue());
        const formattedDate =
          date.toLocaleDateString('en-GB') +
          ' ' +
          date.toLocaleTimeString('en-GB', {
            hour12: true,
          });
        return formattedDate;
      },
    },
    {
      header: 'Actions',
      cell: (info) => {
        const audio = info.row.original;
        const [isPlaying, setIsPlaying] = useState(false);
        const [audioPlayer, setAudioPlayer] = useState(null);
        const [isLoading, setIsLoading] = useState(false);

        const handlePlayPause = () => {
          if (isLoading) return;

          if (!audioPlayer) {
            const newAudioPlayer = new Audio(audio.audioUrl);
            setAudioPlayer(newAudioPlayer);

            newAudioPlayer.oncanplaythrough = () => {
              setIsLoading(false);
            };

            newAudioPlayer.onerror = (error) => {
              console.error('Error playing audio:', error);
              alert('There was an error trying to play the audio.');
              setIsLoading(false);
            };

            setIsLoading(true);
            newAudioPlayer.play().then(() => {
              setIsPlaying(true);
              setIsLoading(false);
            }).catch((error) => {
              console.error('Error playing audio:', error);
              setIsLoading(false);
              alert('There was an issue playing the audio.');
            });
          } else {
            if (isPlaying) {
              audioPlayer.pause();
              setIsPlaying(false);
            } else {
              audioPlayer.play().then(() => {
                setIsPlaying(true);
              }).catch((error) => {
                console.error('Error playing audio:', error);
                alert('There was an issue playing the audio.');
              });
            }
          }
        };

        useEffect(() => {
          return () => {
            if (audioPlayer) {
              audioPlayer.pause();
              setIsPlaying(false);
              setAudioPlayer(null);
            }
          };
        }, [audioPlayer]);

        return (
          <div className="flex gap-2">
            <button
              className="text-red-500 hover:text-red-700 tooltip"
              onClick={() => handleDeleteAudio(audio._id)}
            >
              🗑️
              <span className="tooltip-text">Delete</span> 
            </button>
            <button
              className="text-blue-500 hover:text-blue-700 tooltip "
              onClick={handlePlayPause}
              disabled={isLoading} 
            >
              {isLoading ? '⏳' : isPlaying ? '⏸️' : '▶️'}
              <span className="tooltip-text">Play/Pause</span>
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Breadcrumb pageName="Audio Recordings" />
      <div className="mb-5 rounded-md bg-white dark:bg-zinc-800">
        <div className="p-5">
          <div className="grid grid-cols-12 lg:grid-cols-12 gap-3">
            <DynamicTable
              pagination={true}
              searchBar={true}
              data={data}
              columns={columns}
              page={page}
              pageSize={pageSize}
              totalItems={totalItems}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
              handleAddAudio={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'audio/*';
                input.onchange = (e) => handleAddAudio(e);
                input.click();
              }}
              isUploading={isUploading}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AudioRec;
