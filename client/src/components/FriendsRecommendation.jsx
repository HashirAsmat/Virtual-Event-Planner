import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules'; // Import Navigation module
import axios from 'axios';


const FriendsRecommendation = () => {
  const pageSize = 12; // Number of users to load at a time
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastId, setLastId] = useState(null); // Track last user's ID for pagination

  // Function to load users from the backend
  const loadMoreUsers = async () => {
    if (loading || !hasMore) return; // Prevent multiple requests at once
    
    setLoading(true);
    try {
      // Fetch users from the backend
     

  //  here the integration function ----> need to update this part 
     const  data  = await axios.get('/api/users', {
        params: {
          pageSize,
          lastId: lastId || '', // Send lastId to get the next set of users
        },
      });

      const newUsers = data.users;
      setDisplayedUsers((prev) => [...prev, ...newUsers]); // Append new users
      setHasMore(data.hasMore); // Check if more users are available
      setLastId(data.lastId); // Update lastId for the next batch
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load the first set of users when the component mounts
  useEffect(() => {
    loadMoreUsers();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="flex justify-center items-center p-5 bg-gray-100">
      <div className="max-w-5xl w-full">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          onReachEnd={() => {
            if (hasMore) {
              loadMoreUsers(); // Trigger loadMoreUsers when the end is reached
            }
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="w-full"
        >
          {displayedUsers.map((user) => (
            <SwiperSlide key={user.id}>
              <div
                className="bg-white border border-gray-200 rounded-sm shadow-md p-5 w-52 text-center transform transition-transform hover:-translate-y-1 cursor-pointer"
                onClick={() => console.log('cardClicked')}
              >
                <div className="flex justify-center items-center">
                  <img
                    src={user.profilePic}
                    alt={`${user.name} Profile`}
                    className="w-20 h-20 rounded-full mx-auto mb-3"
                  />
                  <h3 className="text-lg font-semibold mb-2">{user.name}</h3>
                </div>
                <p className="text-sm mb-4 text-green-600 font-semibold">
                  Friends: {user.friends}
                </p>
                <button className="bg-[#272727] text-white px-4 py-1 rounded-md hover:bg-[#0a0a0a]">
                  <span className="text-xl mr-1">+</span> Add Friend
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {loading && <p className="text-center mt-4">Loading...</p>}
        {!hasMore && <p className="text-center mt-4">No more users to load</p>}
      </div>
    </div>
  );
};

export default FriendsRecommendation;
